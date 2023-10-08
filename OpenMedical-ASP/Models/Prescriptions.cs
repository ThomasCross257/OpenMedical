using System;
using System.ComponentModel.DataAnnotations;

public class Prescription
{
    public int PrescriptionID { get; set; }

    public int PatientID { get; set; }
    public int DoctorID { get; set; }

    public DateTime PrescriptionDate { get; set; }

    [StringLength(255)]
    public string Medication { get; set; }

    [StringLength(255)]
    public string Dosage { get; set; }

    public string Notes { get; set; }

    // Navigation properties
    public Patient Patient { get; set; }
    public Doctor Doctor { get; set; }
}
