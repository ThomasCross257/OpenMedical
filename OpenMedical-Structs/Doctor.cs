using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OpenMedical_Structs
{
    public class Doctor
    {
        [Key]
        public int DoctorID { get; set; }

        [Required]
        [StringLength(50)]
        public string FullName { get; set; }

        [StringLength(100)]
        public string Specialty { get; set; }
        [StringLength(20)]
        public string ContactNumber { get; set; }

        [StringLength(100)]
        public string Email { get; set; }

        [BindNever]
        public string Password { get; set; }
    }
}
