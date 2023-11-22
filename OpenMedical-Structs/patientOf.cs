using System.ComponentModel.DataAnnotations;

namespace OpenMedical_Structs
{
    public class patientOf
    {
        public int PatientID { get; set; }
        public int DoctorID { get; set; }

        [StringLength(100)]
        public string PatientFName { get; set; }

        [StringLength(100)]
        public string DoctorFName { get; set; }
    }
}