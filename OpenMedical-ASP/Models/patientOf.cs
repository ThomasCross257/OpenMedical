using OpenMedical_ASP.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OpenMedical_ASP.Models
{
    public class patientOf
    {
        public int PatientID { get; set; }
        public Patient Patient { get; set; }

        public int DoctorID { get; set; }
        public Doctor Doctor { get; set; }
    }

}
