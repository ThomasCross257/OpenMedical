namespace OpenMedical_ASP.Models
{
    public class Appointment
    {
        private int Id { get; set; }
        public string Patient { get; set; }
        public string Doctor { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public string Reason { get; set; }
        public string Status { get; set; }
    }
}
