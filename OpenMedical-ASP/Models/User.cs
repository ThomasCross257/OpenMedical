namespace OpenMedical_ASP.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        private string Password { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string patientOf { get; set; }
    }
}
