using IdentityServer4.Models;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Mvc;
using OpenMedical_ASP.Models;
using System.Security.Claims;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;

    public AuthController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegistrationModel model)
    {
        // Validate the registration model (e.g., required fields, format validation)
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Check if the user with the same email already exists
        if (await _userService.UserExists(model.Email))
        {
            return BadRequest("User with this email already exists.");
        }

        // Create a new user entity based on the registration model
        var user = new User
        {

            // Set other user properties as needed
        };

        // Register the user (e.g., create the user in the database)
        var result = await _userService.RegisterUser(user, model.Password);

        if (!result.Succeeded)
        {
            return BadRequest("Registration failed. Please check your input.");
        }

        // Optionally, generate and return an OAuth token to the client
        var token = GenerateOAuthToken(user);

        return Ok(new { Message = "Registration successful", AccessToken = token });
    }

    private string GenerateOAuthToken(User user)
    {
        var clientId = "your_client_id"; // Replace with your client ID
        var clientSecret = "your_client_secret"; // Replace with your client secret

        var client = new Client
        {
            ClientId = clientId,
            ClientSecrets = { new Secret(clientSecret.Sha256()) },
            AllowedGrantTypes = GrantTypes.ClientCredentials,
            AllowedScopes = { "your_api_scope" } // Replace with your API scope
        };

        var userClaims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, user.Email),
        // Add additional claims as needed
    };

        var identity = new ClaimsIdentity(userClaims, "custom");
        var principal = new ClaimsPrincipal(identity);

        var tokenRequest = new IdentityModel.Client.TokenRequest
        {
            GrantType = "client_credentials",
            ClientId = clientId,
            ClientSecret = clientSecret,
            Parameters = {
                { "scope", "your_api_scope" } // Replace with your API scope
        }
        };

        var tokenService = new TokenService(); // Replace with your TokenService instance
        var token = tokenService.CreateAccessTokenAsync(new TokenCreationRequest
        {
            Subject = principal,
            ValidatedRequest = new ValidatedRequest
            {
                Client = client,
                Raw = tokenRequest
            }
        }).Result;

        return token;
    }
}
