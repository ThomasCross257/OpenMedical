using Microsoft.EntityFrameworkCore;
using OpenMedical_Structs;


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
        public DbSet<patientOf> patientOf { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Doctor>().ToTable("Doctors");
            modelBuilder.Entity<Patient>().ToTable("Patients");
            modelBuilder.Entity<patientOf>()
                .HasKey(pd => new { pd.PatientID, pd.DoctorID }); // Configure the relations between Patient and 
        }
    }