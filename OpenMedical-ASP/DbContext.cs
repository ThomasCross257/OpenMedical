namespace OpenMedical_ASP
{
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;

    public class OpenMedicalDBContext : DbContext
    {
        public OpenMedicalDBContext(DbContextOptions<OpenMedicalDBContext> options) : base(options)
        {
        }

        public DbSet<Patient> Patients { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<MedicalRecord> MedicalRecords { get; set; }
        public DbSet<Prescription> Prescriptions { get; set; }
    }

}
