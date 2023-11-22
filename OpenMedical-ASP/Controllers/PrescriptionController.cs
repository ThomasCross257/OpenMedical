using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenMedical_Structs;

[Route("api/[controller]")]
[ApiController]
public class PrescriptionController : ControllerBase
{
    protected readonly OpenMedicalDBContext _context;

    public PrescriptionController(OpenMedicalDBContext context)
    {
        _context = context;
    }

    [HttpGet("getPrescriptions/{id}/{role}")]
    public async Task<ActionResult<IEnumerable<Prescription>>> GetPrescriptions(int id, string role)
    {
        if (role == "Doctor")
        {
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
        else if (role == "Patient")
        {
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
}