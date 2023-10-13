using Microsoft.EntityFrameworkCore;
using OpenMedical_ASP.Models;

namespace OpenMedical_ASP.Repositories
{
    public interface IDoctorRepository
    {
        Task<IEnumerable<Doctor>> GetAllDoctorsAsync();
        Task<Doctor> GetByIdAsync(int id);
        Task AddDoctorAsync(Doctor Doctor);
        Task UpdateDoctorAsync(Doctor Doctor);
        Task DeleteDoctorAsync(Doctor Doctor);
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
        public async Task AddDoctorAsync(Doctor Doctor)
        {
            await _context.Doctors.AddAsync(Doctor);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateDoctorAsync(Doctor Doctor)
        {
            _context.Doctors.Update(Doctor);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteDoctorAsync(Doctor Doctor)
        {
            _context.Doctors.Remove(Doctor);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteDoctorAsync(int id)
        {
            var Doctor = await GetByIdAsync(id);
            await DeleteDoctorAsync(Doctor);
        }
    }
}
