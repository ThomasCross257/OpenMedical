using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenMedical_Structs;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using OpenMedical_ASP;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    protected readonly OpenMedicalDBContext _context;

    public AuthController(OpenMedicalDBContext context)
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

                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, patientFromDb.FullName),
                    new Claim(ClaimTypes.Role, Roles.Patient),
                    new Claim(ClaimTypes.NameIdentifier,patientFromDb.PatientID.ToString())

                };
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(GenerateRandomSecretKey(16)));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
                var token = new JwtSecurityToken(

                    issuer: "https://localhost:7160",
                    audience: "https://localhost:7160",
                    claims: claims,
                    expires: DateTime.Now.AddHours(1),
                    signingCredentials: credentials
                );

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
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, doctorFromDb.FullName),
                    new Claim(ClaimTypes.Role, Roles.Doctor),
                    new Claim(ClaimTypes.NameIdentifier, doctorFromDb.DoctorID.ToString())
                };
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(GenerateRandomSecretKey(16)));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
                var token = new JwtSecurityToken(

                    issuer: "https://localhost:7160",
                    audience: "https://localhost:7160",
                    claims: claims,
                    expires: DateTime.Now.AddHours(1),
                    signingCredentials: credentials
                );
                return Ok(new { Token = token });
            }
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}