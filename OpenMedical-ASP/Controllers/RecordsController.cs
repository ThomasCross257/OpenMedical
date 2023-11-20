using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenMedical_Structs;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Runtime.InteropServices;
using OpenMedical_ASP;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

[Route("api/[controller]")]
[ApiController]
public class RecordsController : ControllerBase
{
    protected readonly OpenMedicalDBContext _context;

    public RecordsController(OpenMedicalDBContext context)
    {
        _context = context;
    }

    [HttpGet("getRecords/{id}/{role}")]
    public async Task<ActionResult<IEnumerable<MedicalRecord>>> GetMedicalRecordsById(int id, string role)
    {
        try
        {
            IQueryable<MedicalRecord> query;

            if (role == Roles.Patient)
            {
                query = _context.MedicalRecords.Where(record => record.PatientID == id);
            }
            else if (role == Roles.Doctor)
            {
                query = _context.MedicalRecords.Where(record => record.DoctorID == id);
            }
            else
            {
                return Unauthorized();
            }

            var medicalRecords = await query.ToListAsync();

            if (medicalRecords == null || medicalRecords.Count == 0)
            {
                return NotFound("No medical records found for the specified role and ID");
            }

            return Ok(medicalRecords);
        }
        catch (Exception ex)
        {
            return BadRequest($"Error retrieving medical records: {ex.Message}");
        }
    }



    [HttpPost("uploadRecord")]
    public async Task<IActionResult> UploadRecord([FromForm] IFormFile file)
    {
        try
        {
            // Check if the file is not null
            if (file == null || file.Length == 0)
            {
                return BadRequest("File is missing.");
            }

            // Get a unique filename
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

            // Specify the folder to save the file
            var assemblyLocation = System.Reflection.Assembly.GetExecutingAssembly().Location;
            var assemblyDirectory = Path.GetDirectoryName(assemblyLocation);
            var projectRootDirectory = Path.Combine(assemblyDirectory, "../../");
            var uploadFolder = Path.Combine(projectRootDirectory, "../uploads");

            // If the folder doesn't exist, create it
            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            // Combine the folder path and filename to get the full path
            var filePath = Path.Combine(uploadFolder, fileName);

            // Save the file to the server
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // return the file path

            return Ok(fileName);
        }
        catch (Exception ex)
        {
            return BadRequest($"Error uploading file: {ex.Message}");
        }
    }



    [HttpPost("storeRecord")]
    public async Task<ActionResult<MedicalRecord>> AddMedicalRecord([FromBody] MedicalRecord medicalRecord)
    {
        try
        {
            // Add the medicalRecord to your database
            _context.MedicalRecords.Add(medicalRecord);

            // Save the changes
            await _context.SaveChangesAsync();

            // Return the created medicalRecord
            return Ok(medicalRecord);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}