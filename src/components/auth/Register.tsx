import { useState } from 'react';
import axios from 'axios';
import { PatientFormData, DoctorFormData } from './models/registrationModels';

function Register() {
  const [registrationType, setRegistrationType] = useState<'doctor' | 'patient'>('patient');

  const [formData, setFormData] = useState<DoctorFormData | PatientFormData>({
    FullName: '',
    ContactNumber: '',
    Email: '',
    Password: '',
    Speciality: '', // Initialize fields specific to doctor registration
    DateOfBirth: '', // Initialize fields specific to patient registration
    Gender: '',
  });

  async function registerUser(data: DoctorFormData | PatientFormData): Promise<void> {
    try {
      // Create a new object that only includes the properties with non-empty values
      const filteredData = Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== ''));
      console.log(filteredData);
      // Create a new object with the properties in the correct  order
      let sortedData;
      if (registrationType === 'doctor') {
        sortedData = {
          doctorID: 0,
          fullName: filteredData.FullName,
          specialty: filteredData.Speciality,
          contactNumber: filteredData.ContactNumber,
          email: filteredData.Email,
          password: filteredData.Password,
        };
      } else {
        sortedData = {
          patientID: 0,
          fullName: filteredData.FullName,
          dateOfBirth: new Date(filteredData.DateOfBirth),
          gender: filteredData.Gender[0],
          contactNumber: filteredData.ContactNumber,
          email: filteredData.Email,
          password: filteredData.Password,
        };
      }

      // Send the sorted data to your API based on the registration type (doctor or patient)
      const endpoint = registrationType === 'doctor' ? 'createDoctor' : 'createPatient';

      const response = await axios.post(`https://localhost:7160/api/Auth/${endpoint}`, sortedData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert('Error registering user');
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Call registerUser with the formData
    registerUser(formData);
    alert('Registration successful!');
    window.location.reload();
  }

  return (
    <div className="container">
      <h1>Register</h1>
      <div>
        <button onClick={() => setRegistrationType('doctor')}>Doctor Registration</button>
        <button onClick={() => setRegistrationType('patient')}>Patient Registration</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="FullName" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="FullName" onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="Email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="Email" onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="ContactNumber" className="form-label">Contact Number</label>
          <input type="tel" className="form-control" id="ContactNumber" onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">Password</label>
          <input type="password" className="form-control" id="Password" onChange={handleInputChange} />
        </div>

        {/* Render doctor-specific fields if registrationType is 'doctor' */}
        {registrationType === 'doctor' && (
          <div>
            <div className="mb-3">
              <label htmlFor="Speciality" className="form-label">Speciality</label>
              <input type="text" className="form-control" id="Speciality" onChange={handleInputChange} />
            </div>
          </div>
        )}

        {/* Render patient-specific fields if registrationType is 'patient' */}
        {registrationType === 'patient' && (
          <div>
            <div className="mb-3">
              <label htmlFor="DateOfBirth" className="form-label">Date of Birth</label>
              <input type="date" className="form-control" id="DateOfBirth" onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="Gender" className="form-label">Gender</label>
              <select className="form-select" aria-label="Default select example" id="Gender" onChange={handleInputChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  );
}

export default Register;