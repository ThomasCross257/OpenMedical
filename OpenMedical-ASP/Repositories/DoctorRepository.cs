using Microsoft.EntityFrameworkCore;

namespace OpenMedical_ASP.Repositories
{
        public interface IDoctorRepository
        {
            Task<IEnumerable<Doctor>> GetAllDoctorsAsync();
            Task<Doctor> GetByIdAsync(int id);
            Task AddDoctorAsync(Doctor doctor);
            Task UpdateDoctorAsync(Doctor doctor);
            Task DeleteDoctorAsync(Doctor doctor);
            Task DeleteDoctorAsync(int id);
        }
        public class DoctorRepository : IDoctorRepository
        {
            private readonly OpenMedicalDBContext _context;
            public DoctorRepository(OpenMedicalDBContext context)
            {
                _context = context;
            }
            public async Task<IEnumerable<Doctor>> GetAllDoctorsAsync()
            {
                return await _context.Doctors.ToListAsync();
            }
            public async Task<Doctor> GetByIdAsync(int id)
            {
                return await _context.Doctors.FindAsync(id);
            }
            public async Task AddDoctorAsync(Doctor doctor)
            {
                await _context.Doctors.AddAsync(doctor);
                await _context.SaveChangesAsync();
            }
            public async Task UpdateDoctorAsync(Doctor doctor)
            {
                _context.Doctors.Update(doctor);
                await _context.SaveChangesAsync();
            }
            public async Task DeleteDoctorAsync(Doctor doctor)
            {
                _context.Doctors.Remove(doctor);
                await _context.SaveChangesAsync();
            }
            public async Task DeleteDoctorAsync(int id)
            {
                var doctor = await GetByIdAsync(id);
                await DeleteDoctorAsync(doctor);
            }
        }
    }
