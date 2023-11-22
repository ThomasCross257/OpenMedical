using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace OpenMedical_Structs
{
    public class Appointment
    {
        [Key]
        public int AppointmentID { get; set; }
        public int PatientID { get; set; }
        public int DoctorID { get; set; }
        public DateTime AppointmentStart { get; set; }

        public DateTime AppointmentEnd { get; set; }

        [StringLength(20)]
        public string AppointmentType { get; set; }

        [StringLength(20)]
        public string Status { get; set; }

        [StringLength(100)]
        public string PatientFName { get; set; }
        [StringLength(100)]
        public string DoctorFName { get; set; }

    }
}