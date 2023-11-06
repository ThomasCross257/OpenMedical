using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenMedical_Structs;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Runtime.InteropServices;
using AutoMapper;

[Route("api/[controller]")]
[ApiController]
public class MedicalController : ControllerBase
{
    protected readonly OpenMedicalDBContext _context;

    public MedicalController(OpenMedicalDBContext context)
    {
        _context = context;
}

    private static string GenerateRandomSecretKey(int keyLengthInBytes)
    {
        using (var rng = new RNGCryptoServiceProvider())
        {
            byte[] randomBytes = new byte[keyLengthInBytes];
            rng.GetBytes(randomBytes);
            return Convert.ToBase64String(randomBytes);
        }
    }

    private bool AppointmentExists(int id)
    {

        return _context.Appointments.Any(a => a.AppointmentID == id);
    }

    private int GetCurrentUserId()
    {
        // Retrieve the user ID from the token
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        if (identity == null)
        {
            return -1;
        }

        var userIdClaim = identity.FindFirst(ClaimTypes.Name);
        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
        {
            return -1;
        }

        return userId;
    }


    [HttpGet("getAppointments/{id}")]
    public async Task<ActionResult<IEnumerable<Appointment>>>
        GetAppointments(int id, [FromHeader(Name = "UserRole")] string userRole)
    {
        if (userRole == "Patient")
        {
            var appointments = await _context.Appointments.Where(a => a.PatientID == id).ToListAsync();
            return Ok(appointments);
        }
        else if (userRole == "Doctor")
        {
            var appointments = await _context.Appointments.Where(a => a.DoctorID == id).ToListAsync();
            return Ok(appointments);
        }
        else
        {
            return Unauthorized();
        }
    }

    [HttpGet("getMedicalRecords/{id}")]
    public async Task<ActionResult<IEnumerable<MedicalRecord>>>
        GetMedicalRecords(int id, [FromHeader(Name = "UserRole")] string userRole)
    {
        var medicalRecords = await _context.MedicalRecords.Where(m => m.PatientID == id).ToListAsync();
        return Ok(medicalRecords);
    }

    [HttpGet("getPrescriptions/{id}")]
    public async Task<ActionResult<IEnumerable<Prescription>>> GetPrescriptions(int id, [FromHeader(Name = "UserRole")] string userRole)
    {
        if (userRole == "Doctor")
        {
            // Doctors can only retrieve prescriptions for their patients
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null)
            {
                return NotFound("Doctor not found");
            }

            var prescriptions = await _context.Prescriptions
                .Where(p => p.DoctorID == id)
                .ToListAsync();
            return Ok(prescriptions);
        }
        else if (userRole == "Patient" && id == GetCurrentUserId())
        {
            // Patients can retrieve their own prescriptions
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null)
            {
                return NotFound("Patient not found");
            }
            var prescriptions = await _context.Prescriptions
                .Where(p => p.PatientID == id)
                .ToListAsync();
            return Ok(prescriptions);
        }
        else
        {
            return Unauthorized("Invalid user role or access denied");
        }
    }


    [HttpGet("downloadRecord")]
    public async Task<ActionResult<MedicalRecord>>
        GetMedicalRecordById(int id, int patientID, [FromHeader(Name = "UserRole")] string userRole)
    {
        // Check if the medicalRecord is for a valid patient
        var medicalRecord = await _context.MedicalRecords.FindAsync(id);
        if (medicalRecord == null)
        {
            return NotFound("Medical record not found");
        }

        if (medicalRecord.PatientID != patientID)
        {
            return NotFound("Medical record doesn't belong to the specified patient");
        }

        return Ok(medicalRecord);
    }

    [HttpGet("viewPrescription")]
    public async Task<ActionResult<Prescription>> GetPrescriptionById(int id, int patientID)
    {
        // Check if the prescription is for a valid patient
        var prescription = await _context.Prescriptions.FindAsync(id);
        if (prescription == null)
        {
            return NotFound("Prescription not found");
        }

        if (prescription.PatientID != patientID)
        {
            return NotFound("Prescription doesn't belong to the specified patient");
        }

        return Ok(prescription);
    }

    [HttpPost("createAppointment")]
    public async Task<ActionResult<Appointment>> AddAppointment([FromBody] Appointment appointment)
    {
        try
        {
            // Add the appointment to your database
            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            // Return the created appointment
            return Ok(appointment);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("uploadMedicalRecord")]
    public async Task<ActionResult<MedicalRecord>> AddMedicalRecord([FromBody] MedicalRecord medicalRecord)
    {
        try
        {
            // Add the medicalRecord to your database
            _context.Entry(medicalRecord).State = EntityState.Added;

            // Return the created medicalRecord
            return Ok(medicalRecord);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("login")]
    public async Task<ActionResult<string>> Login([FromBody] AuthenticationModel authenticationModel)
    {
        try
        {
            // Retrieve the patient from your database based on the email
            var patientFromDb = await _context.Patients.FirstOrDefaultAsync(p => p.Email == authenticationModel.Email);
            // Check if the patient exists
            if (patientFromDb != null)
            {

                // Check if the password matches
                if (!BCrypt.Net.BCrypt.Verify(authenticationModel.Password, patientFromDb.Password))
                {
                    return Unauthorized("Invalid password");
                }

                // Get the patient's ID
                int patientID = _context.Patients.FirstOrDefault(p => p.Email == authenticationModel.Email).PatientID;

                // Generate a JWT token
                var token = GenerateJwtToken(patientID);

                // Return the JWT token
                return Ok(new { Token = token });
            }
            else
            {
                var doctorFromDb = await _context.Doctors.FirstOrDefaultAsync(d => d.Email == authenticationModel.Email);
                // Check if the doctor exists
                if (doctorFromDb == null)
                {
                    return NotFound("User not found");
                }
                if (!BCrypt.Net.BCrypt.Verify(authenticationModel.Password, doctorFromDb.Password))
                {
                    return Unauthorized("Invalid password");
                }
                int doctorID = _context.Doctors.FirstOrDefault(d => d.Email == authenticationModel.Email).DoctorID;
                var token = GenerateJwtToken(doctorID);
                return Ok(new { Token = token });
            }
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }


    private string GenerateJwtToken(int patientId)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(GenerateRandomSecretKey(16));
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
            new Claim(ClaimTypes.Name, patientId.ToString()), // Store the user ID in the token
                                                              // Add more claims as needed, e.g., user roles
            }),
            Expires = DateTime.UtcNow.AddHours(1), // Set token expiration time
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }



    [HttpPut("updateAppointment")]
    public async Task<ActionResult<Appointment>> UpdateAppointment(int id, [FromBody] Appointment appointment)
    {
        if (id != appointment.AppointmentID)
        {
            return BadRequest("Appointment ID mismatch");
        }

        _context.Entry(appointment).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
            return Ok(appointment);
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!AppointmentExists(id))
            {
                return NotFound("Appointment not found");
            }
            else
            {
                throw;
            }
        }
    }

    [HttpDelete("cancelAppointment")]
    public async Task<ActionResult<Appointment>> DeleteAppointment(int id)
    {
        var appointment = await _context.Appointments.FindAsync(id);
        if (appointment == null)
        {
            return NotFound("Appointment not found");
        }

        _context.Appointments.Remove(appointment);
        await _context.SaveChangesAsync();

        return Ok(appointment);
    }
}
