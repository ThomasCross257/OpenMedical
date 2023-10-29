using Microsoft.EntityFrameworkCore;
using OpenMedical_Structs;

namespace OpenMedical_ASP.Repositories
{
    public interface IPatientRepository
    {
        Task<IEnumerable<Patient>> GetAllPatientsAsync();
        Task<Patient> GetPatientById(int id);
        Task AddPatientAsync(Patient patient);
        Task UpdatePatientAsync(Patient patient);
        Task DeletePatientAsync(Patient patient);
        Task DeletePatientAsync(int id);
        Task<Patient> GetPatientByEmail(string email);
    }
    public class PatientRepository : IPatientRepository
    {
        private readonly OpenMedicalDBContext _context;
        public PatientRepository(OpenMedicalDBContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Patient>> GetAllPatientsAsync()
        {
            return await _context.Patients.ToListAsync();
        }
        public async Task<Patient> GetPatientById(int id)
        {
            return await _context.Patients.FindAsync(id);
        }
        public async Task AddPatientAsync(Patient patient)
        {
            await _context.Patients.AddAsync(patient);
            await _context.SaveChangesAsync();
        }
        public async Task UpdatePatientAsync(Patient patient)
        {
            _context.Patients.Update(patient);
            await _context.SaveChangesAsync();
        }
        public async Task DeletePatientAsync(Patient patient)
        {
            _context.Patients.Remove(patient);
            await _context.SaveChangesAsync();
        }
        public async Task DeletePatientAsync(int id)
        {
            var patient = await GetPatientById(id);
            await DeletePatientAsync(patient);
        }
        public async Task<Patient> GetPatientByEmail(string email)
        {
            return await _context.Patients.FindAsync(email);
        }
    }   
}
