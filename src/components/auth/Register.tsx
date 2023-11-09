import { useState } from 'react';
import axios from 'axios';
import { PatientFormData, DoctorFormData } from './models/registrationModels';

function Register() {
  const [registrationType, setRegistrationType] = useState<'doctor' | 'patient'>('patient');

  const [formData, setFormData] = useState<DoctorFormData | PatientFormData>({
    FirstName: '',
    LastName: '',
    ContactNumber: '',
    Email: '',
    Password: '',
    Speciality: '', // Initialize fields specific to doctor registration
    DateOfBirth: '', // Initialize fields specific to patient registration
    Gender: '',
    Address: '',
    ZipCode: '',
    City: '',
    State: '',
  });

  async function registerUser(data: DoctorFormData | PatientFormData): Promise<void> {
    try {
      // Send the data to your API based on the registration type (doctor or patient)
      const endpoint = registrationType === 'doctor' ? 'createDoctor' : 'createPatient';
      const response = await axios.post(`https://localhost:7160/api/${endpoint}`, data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
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
          <label htmlFor="FirstName" className="form-label">First Name</label>
          <input type="text" className="form-control" id="FirstName" onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="LastName" className="form-label">Last Name</label>
          <input type="text" className="form-control" id="LastName" onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="Email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="Email" onChange={handleInputChange} />
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
            <div className="mb-3">
              <label htmlFor="Address" className="form-label">Address</label>
              <input type="text" className="form-control" id="Address" onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="ZipCode" className="form-label">Zip</label>
              <input type="text" className="form-control" id="ZipCode" onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="City" className="form-label">City</label>
              <input type="text" className="form-control" id="City" onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="State" className="form-label">State</label>
              <input type="text" className="form-control" id="State" onChange={handleInputChange} />
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  );
}

export default Register;