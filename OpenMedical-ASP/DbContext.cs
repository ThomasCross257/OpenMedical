namespace OpenMedical_ASP
{
    using Microsoft.EntityFrameworkCore;
    using OpenMedical_ASP.Models;
    using System.Collections.Generic;

    public class OpenMedicalDBContext : DbContext
    {
        public OpenMedicalDBContext(DbContextOptions<OpenMedicalDBContext> options) : base(options) {}
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<MedicalRecord> MedicalRecords { get; set; }
        public DbSet<Prescription> Prescriptions { get; set; }
        public DbSet<PatientDoctor> PatientsDoctors { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Patient>().ToTable("Patient");
            modelBuilder.Entity<Doctor>().ToTable("Doctor");
            modelBuilder.Entity<Appointment>().ToTable("Appointment");
            modelBuilder.Entity<MedicalRecord>().ToTable("MedicalRecord");
            modelBuilder.Entity<Prescription>().ToTable("Prescription");

            modelBuilder.Entity<PatientDoctor>()
                .HasKey(pd => new { pd.PatientID, pd.DoctorID });

            modelBuilder.Entity<PatientDoctor>()
                .HasOne(pd => pd.Patient)
                .WithMany(p => p.PatientDoctors)
                .HasForeignKey(pd => pd.PatientID);

            modelBuilder.Entity<PatientDoctor>()
                .HasOne(pd => pd.Doctor)
                .WithMany(d => d.PatientDoctors)
                .HasForeignKey(pd => pd.DoctorID);
        }
    }

}
