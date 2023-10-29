using System.ComponentModel.DataAnnotations;

namespace OpenMedical_Structs
{
    public class AuthenticationModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }

}
