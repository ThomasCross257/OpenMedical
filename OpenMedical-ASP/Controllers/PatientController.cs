using Microsoft.AspNetCore.Mvc;
using OpenMedical_ASP.Repositories;
using OpenMedical_Structs;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class PatientsController : ControllerBase
{
    private readonly OpenMedicalDBContext _context;
    private readonly IPatientRepository _patientRepository; // Inject your repository interface here
    public PatientsController(OpenMedicalDBContext context, IPatientRepository patientRepository)
    {
        _context = context;
        _patientRepository = patientRepository;
    }

    // GET: api/Patients
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Patient>>> GetPatients()
    {
        var patients = await _context.Patients.ToListAsync();
        // Loop through the list and remove the password from each patient
        foreach (var patient in patients)  // This is a really stupid implementation, but Entity Framework Core for some reason wants to acknowledge the doctors and not this one,
        {
            patient.Password = "Unauthorized"; // For now, this is the only way I can think of to remove the password from the response
        }
        return Ok(patients);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Patient>> GetPatientById(int id)
    {
        var patient = await _context.Patients.FindAsync(id);
        if (patient == null)
        {
            return NotFound();
        }
        patient.Password = "Unauthorized";
        return Ok(patient);
    }

    [HttpPost("createPatient")]
    public ActionResult<Patient> AddPatient([FromBody] Patient patientRegister)
    {
        try
        {
            // Hash the password before saving it
            patientRegister.Password = BCrypt.Net.BCrypt.HashPassword(patientRegister.Password);

            // Add the patient to your database
            _context.Patients.Add(patientRegister);
            _context.SaveChanges();

            // Return the created patient
            return Ok("Created Patient " + patientRegister.FirstName + " " + patientRegister.LastName);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("getPrimaryDoctor/{patientID}")]
    public async Task<ActionResult<IEnumerable<Patient>>> GetPrimaryDoctor(int id)
    {
        var patients = await _context.patientOf.Where(p => p.PatientID == id).ToListAsync();
        return Ok(patients);
    }


}