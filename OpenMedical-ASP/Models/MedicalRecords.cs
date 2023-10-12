using System;
using System.ComponentModel.DataAnnotations;

public class MedicalRecord
{
    public int RecordID { get; set; }

    public int PatientID { get; set; }
    public int DoctorID { get; set; }

    public DateTime RecordDate { get; set; }

    [StringLength(255)]
    public string Diagnosis { get; set; }

    public string Treatment { get; set; }
    public string Notes { get; set; }

    // Navigation properties
    public Patient Patient { get; set; }
    public Doctor Doctor { get; set; }
    public object MedicalRecordsId { get; internal set; }
}
