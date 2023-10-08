using OpenMedical_ASP.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class Patient
{
    public int PatientID { get; set; }

    [Required]
    [StringLength(50)]
    public string FirstName { get; set; }

    [Required]
    [StringLength(50)]
    public string LastName { get; set; }

    public DateTime? DateOfBirth { get; set; }

    [StringLength(1)]
    public string Gender { get; set; }

    [StringLength(20)]
    public string ContactNumber { get; set; }

    [Required]
    [StringLength(100)]
    public string Email { get; set; }

    [StringLength(255)]
    public string Address { get; set; }

    [Required]
    [StringLength(30)]
    public string Password { get; set; }

    // Navigation properties
    public List<Appointment> Appointments { get; set; }
    public List<MedicalRecord> MedicalRecords { get; set; }
    public List<Prescription> Prescriptions { get; set; }
}
