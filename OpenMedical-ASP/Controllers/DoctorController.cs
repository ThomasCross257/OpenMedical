using Microsoft.AspNetCore.Mvc;
using OpenMedical_ASP.Models;
using OpenMedical_ASP.Repositories;

[ApiController]
[Route("api/[controller]")]
public class DoctorsController : ControllerBase
{
    private readonly OpenMedicalDBContext _context;
    private readonly IDoctorRepository _doctorRepository; // Inject your repository interface here

    public DoctorsController(OpenMedicalDBContext context, IDoctorRepository DoctorRepository)
    {
        _context = context;
        _doctorRepository = DoctorRepository;
    }

    // GET: api/Doctors
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Doctor>>> GetDoctors()
    {
        var Doctors = await _doctorRepository.GetAllDoctorsAsync();
        return Ok(Doctors);
    }

    // Other CRUD methods can be implemented similarly
}
