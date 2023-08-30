namespace OpenMedical_ASP.Models
{
    public class Doctor
    {
        public int Id { get; set; }
        public string Fname { get; set; }
        public string Lname { get; set; }
        private string Password { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }
}
