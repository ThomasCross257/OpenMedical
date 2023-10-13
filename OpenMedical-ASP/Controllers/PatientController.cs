using Microsoft.AspNetCore.Mvc;
using OpenMedical_ASP.Models;
using OpenMedical_ASP.Repositories;

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
        var patients = await _patientRepository.GetAllPatientsAsync();
        return Ok(patients);
    }

    // Other CRUD methods can be implemented similarly
}

