using Microsoft.AspNetCore.Mvc;
using OpenMedical_ASP.Repositories;
using OpenMedical_Structs;
using Microsoft.EntityFrameworkCore;
using OpenMedical_ASP;


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
        foreach (var patient in patients)  // This is a really stupid implementation, but Entity Framework Core for some reason doesn't allow me to remove the password from the response.
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


    [HttpGet("getPrimaryDoctor/{patientID}/{role}")]
    public async Task<ActionResult<IEnumerable<Patient>>> GetPrimaryDoctor(int patientID, string role)
    {
        if (role != Roles.Patient)
        {
            return Unauthorized();
        }
        var patients = await _context.patientOf.Where(p => p.PatientID == patientID).ToListAsync();
        return Ok(patients);
    }


}