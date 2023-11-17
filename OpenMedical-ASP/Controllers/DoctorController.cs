﻿using Microsoft.AspNetCore.Mvc;
using OpenMedical_ASP.Repositories;
using OpenMedical_Structs;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using OpenMedical_ASP;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api/[controller]")]
public class DoctorsController : ControllerBase
{
    private readonly OpenMedicalDBContext _context;
    private readonly IDoctorRepository _doctorRepository; // Inject your repository interface 

    public DoctorsController(OpenMedicalDBContext context, IDoctorRepository DoctorRepository)
    {
        _context = context;
        _doctorRepository = DoctorRepository;
    }

    // Get all doctors
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Doctor>>> GetDoctors()
    {
        var Doctors = await _context.Doctors.ToListAsync();
        foreach (var Doctor in Doctors)
        {
            Doctor.Password = "Unauthorized";
        }
        return Ok(Doctors);
    }

    // Get doctors by ID
    [HttpGet("{id}")]
    public async Task<ActionResult<Doctor>> GetDoctorById(int id)
    {
        var Doctor = await _doctorRepository.GetDoctorByIdAsync(id);
        if (Doctor == null)
        {
            return NotFound();
        }
        Doctor.Password = "Unauthorized";
        return Ok(Doctor);
    }
    // Get patients of a doctor by their ID
    [HttpGet("getPatients/{id}/{role}")]
    public async Task<ActionResult<IEnumerable<Patient>>> GetPatients(int id, string role)
    {
        if (role != Roles.Doctor)
        {
            return Unauthorized();
        }
        var patients = await _context.patientOf.Where(p => p.DoctorID == id).ToListAsync();
        return Ok(patients);
    }

    // Create a doctor account.
    [HttpPost("createDoctor")]
    public ActionResult<Doctor> AddDoctor([FromBody] Doctor Doctor)
    {
        try
        {
            // Hash the password before saving it
            Doctor.Password = BCrypt.Net.BCrypt.HashPassword(Doctor.Password);
            // Remove ID from the request body
            // Add the Doctor to your database
            _context.Doctors.Add(Doctor);
            _context.SaveChanges();

            // Return the created Doctor
            return Ok(Doctor);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    // Create a prescription for a patient.
    [HttpPost("createPrescription")]
    public async Task<ActionResult<Prescription>> AddPrescription([FromBody] Prescription prescription)
    {
        try
        {
            // Add the prescription to your database
            _context.Prescriptions.Add(prescription);
            _context.SaveChanges();

            // In the future I'll implement a way to prevent prescribing a prescription to a patient that isn't yours.

            // Return the created prescription
            return Ok(prescription);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("updatePrescription")]
    public async Task<ActionResult<Prescription>> UpdatePrescription([FromBody] Prescription prescription)
    {
        try
        {
            // Update the prescription in your database
            _context.Prescriptions.Update(prescription);
            await _context.SaveChangesAsync();

            // Return the updated prescription
            return Ok(prescription);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

}
