using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenMedical_Structs;
using OpenMedical_ASP;

[Route("api/[controller]")]
[ApiController]
public class RecordsController : ControllerBase
{
    protected readonly OpenMedicalDBContext _context;

    public RecordsController(OpenMedicalDBContext context)
    {
        _context = context;
    }

    private string AssemblePath(string fileName)
    {
        var assemblyLocation = System.Reflection.Assembly.GetExecutingAssembly().Location;
        var assemblyDirectory = Path.GetDirectoryName(assemblyLocation);
        var projectRootDirectory = Path.Combine(assemblyDirectory, "../../");
        var uploadFolder = Path.Combine(projectRootDirectory, "../uploads");
        var filePath = Path.Combine(uploadFolder, fileName);
        return filePath;
    }

    private async Task<string> ProcessFile(IFormFile file)
    {
        // Check if the file is not null
        if (file == null || file.Length == 0)
        {
            throw new ArgumentException("File is missing.");
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

        // Return the file path
        return fileName;
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

            string fileName = await ProcessFile(file);
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
            if (medicalRecord.Title == null)
            {
                medicalRecord.Title = "New Document";
            }
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

    [HttpPost("updateRecord")]
    public async Task<ActionResult<MedicalRecord>> UpdateMedicalRecord([FromBody] MedicalRecord medicalRecord)
    {
        try
        {
            // Find old record
            var oldRecord = await _context.MedicalRecords.FindAsync(medicalRecord.RecordID);
            if (oldRecord == null)
            {
                return NotFound();
            }

            // Update all properties from the incoming medicalRecord
            oldRecord.Title = medicalRecord.Title;
            oldRecord.RecordDate = medicalRecord.RecordDate;
            oldRecord.RecordLink = medicalRecord.RecordLink;
            oldRecord.PatientFName = medicalRecord.PatientFName;
            oldRecord.DoctorFName = medicalRecord.DoctorFName;
            oldRecord.PatientID = medicalRecord.PatientID;
            oldRecord.DoctorID = medicalRecord.DoctorID;

            _context.MedicalRecords.Update(oldRecord);
            await _context.SaveChangesAsync();

            // Return the updated medicalRecord
            return Ok(oldRecord);
        }
        catch (Exception e)
        {
            return BadRequest($"Error updating record: {e.Message}\nStackTrace: {e.StackTrace}");
        }
    }



    [HttpPost("deleteRecord/{id}")]
    public async Task<ActionResult<MedicalRecord>> DeleteMedicalRecord(int id)
    {
        try
        {
            var record = await _context.MedicalRecords.FindAsync(id);

            if (record == null)
            {
                return NotFound();
            }
            var FileName = record.RecordLink;
            if (System.IO.File.Exists(FileName))
            {
                System.IO.File.Delete(FileName);
            }
            _context.MedicalRecords.Remove(record);
            await _context.SaveChangesAsync();

            return Ok(record);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}