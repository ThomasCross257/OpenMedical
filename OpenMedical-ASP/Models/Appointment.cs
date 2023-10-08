using System;
using System.ComponentModel.DataAnnotations;

public class Appointment
{
    public int AppointmentID { get; set; }

    public int PatientID { get; set; }
    public int DoctorID { get; set; }

    public DateTime AppointmentDateTime { get; set; }

    [StringLength(20)]
    public string AppointmentType { get; set; }

    [StringLength(20)]
    public string Status { get; set; }

    // Navigation properties
    public Patient Patient { get; set; }
    public Doctor Doctor { get; set; }
}
