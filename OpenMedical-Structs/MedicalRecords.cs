using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OpenMedical_Structs
{
    public class MedicalRecord
    {
        [Key]
        public int RecordID { get; set; }
        [Required]
        public int PatientID { get; set; }
        [Required]
        public int DoctorID { get; set; }
        public DateTime RecordDate { get; set; }

        [StringLength(50)]
        public string Title { get; set; }

        [StringLength(100)]
        public string PatientFName { get; set; }

        [StringLength(100)]
        public string DoctorFName { get; set; }

        [StringLength(255)]
        public string RecordLink { get; set; }
    }

}