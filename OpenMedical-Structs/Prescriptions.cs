using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OpenMedical_Structs
{
    public class Prescription
    {
        [Key]
        public int PrescriptionID { get; set; }
        public int PatientID { get; set; }
        public int DoctorID { get; set; }

        public DateTime PrescriptionDate { get; set; }

        [StringLength(255)]
        public string Medication { get; set; }

        [StringLength(255)]
        public string Dosage { get; set; }

        public string Notes { get; set; }

        [StringLength(100)]
        public string PatientFName { get; set; }

        [StringLength(100)]
        public string DoctorFName { get; set; }
    }
}