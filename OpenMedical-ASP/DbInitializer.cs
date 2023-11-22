using OpenMedical_Structs;

namespace OpenMedical_ASP
{
    public static class DbInitializer
    {
        public static void Initialize(OpenMedicalDBContext context)
        {
            context.Database.EnsureCreated();
            var dummyDoctors = new List<Doctor>
                {
                    new Doctor
                    {
                        FullName = "John Doe",
                        Specialty = "General Medicine",
                        ContactNumber = "1234567890",
                        Email = "john.doe@example.com",
                        Password = BCrypt.Net.BCrypt.HashPassword("password123")
                    },
                    new Doctor
                    {
                        FullName = "Jane Doe",
                        Specialty = "General Medicine",
                        ContactNumber = "1234567890",
                        Email = "janedoe@mail.com",
                        Password = BCrypt.Net.BCrypt.HashPassword("password123442")
                    },
                    new Doctor
                    {
                        FullName = "John Smith",
                        Specialty = "General Medicine",
                        ContactNumber = "1234567890",
                        Email = "jsmith@yahoo.com",
                        Password = BCrypt.Net.BCrypt.HashPassword("openWon214")
                    }
                };

            foreach (var dummyDoctor in dummyDoctors)
            {
                // Check if a doctor with the same qualities exists
                if (!context.Doctors.Any(d =>
                        d.Specialty == dummyDoctor.Specialty &&
                        d.ContactNumber == dummyDoctor.ContactNumber &&
                        d.Email == dummyDoctor.Email))
                {
                    // Add the doctor only if not found
                    context.Doctors.Add(dummyDoctor);
                }
            }

            context.SaveChanges();
        }
    }
}
