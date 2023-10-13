using Microsoft.EntityFrameworkCore;

namespace OpenMedical_ASP.Models
{
    public class OpenMedicalDBContext : DbContext
    {
        public OpenMedicalDBContext(DbContextOptions<OpenMedicalDBContext> options)
            : base(options)
        {
        }

        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<MedicalRecord> MedicalRecords { get; set; }
        public DbSet<Prescription> Prescriptions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Doctor>().ToTable("Doctors");
            modelBuilder.Entity<patientOf>()
                .HasKey(pd => new { pd.PatientID, pd.DoctorID });

            modelBuilder.Entity<patientOf>()
                .HasOne(pd => pd.Patient)
                .WithMany(p => p.patientOf)
                .HasForeignKey(pd => pd.PatientID);

            modelBuilder.Entity<patientOf>()
                .HasOne(pd => pd.Doctor)
                .WithMany(d => d.patientOf)
                .HasForeignKey(pd => pd.DoctorID);
        }
    }
}
