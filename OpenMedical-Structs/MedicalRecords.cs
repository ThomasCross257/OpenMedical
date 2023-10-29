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
        public int PatientID { get; private set; }
        public int DoctorID { get; private set; }
        public DateTime RecordDate { get; set; }

        [StringLength(255)]
        public string Diagnosis { get; set; }

        public string Treatment { get; set; }
        public string Notes { get; set; }

        [StringLength(100)]
        public string PatientFullName { get; set; }

        [StringLength(100)]
        public string DoctorFullName { get; set; }
    }

}