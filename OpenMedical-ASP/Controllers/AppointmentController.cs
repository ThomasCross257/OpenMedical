using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenMedical_Structs;
[Route("api/[controller]")]
[ApiController]
public class AppointmentController : ControllerBase
{
    protected readonly OpenMedicalDBContext _context;

    public AppointmentController(OpenMedicalDBContext context)
    {
        _context = context;
    }
    private bool AppointmentExists(int id)
    {

        return _context.Appointments.Any(a => a.AppointmentID == id);
    }
    [HttpGet("getAppointments/{id}/{role}")]
    public async Task<ActionResult<IEnumerable<Appointment>>>
        GetAppointments(int id, string role)
    {
        if (role == "Patient")
        {
            var appointments = await _context.Appointments.Where(a => a.PatientID == id).ToListAsync();
            return Ok(appointments);
        }
        else if (role == "Doctor")
        {
            var appointments = await _context.Appointments.Where(a => a.DoctorID == id).ToListAsync();
            return Ok(appointments);
        }
        else
        {
            return Unauthorized();
        }
    }

    [HttpPost("createAppointment")]
    public async Task<ActionResult<Appointment>> AddAppointment([FromBody] Appointment appointment)
    {
        try
        {
            // Map properties to the actual Appointment 
            DateTime dateTime = new DateTime();

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
    [HttpPost("updateAppointment/{id}")]
    public async Task<ActionResult<Appointment>> UpdateAppointment(int id, Appointment appointment)
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
    [HttpPost ("deleteAppointment/{id}")]
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