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
        return Ok(patient);
    }

    [HttpPost("createPatient")]
    public ActionResult<Patient> AddPatient([FromBody] PatientRegister patientRegister)
    {
        try
        {
            // Hash the password before saving it
            patientRegister.Password = BCrypt.Net.BCrypt.HashPassword(patientRegister.Password);

            // Add the patient to your database
            _context.Patients.Add(patientRegister);
            _context.SaveChanges();

            // Return the created patient
            return Ok(patientRegister);
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