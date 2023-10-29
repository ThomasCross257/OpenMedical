import { useState } from 'react';
import axios from 'axios';

interface RegisterFormData {
  FirstName: string;
  LastName: string;
  DateOfBirth: string;
  Gender: string;
  ContactNumber: string;
  Email: string;
  Address: string;
  ZipCode: string;
  City: string;
  State: string;
  Password: string;
  Appointments: [];
  MedicalRecords: [];
  Prescriptions: [];
  PatientOf: [];
}

function Register() {
  const [formData, setFormData] = useState<RegisterFormData>({
    FirstName: '',
    LastName: '',
    DateOfBirth: '',
    Gender: '',
    ContactNumber: '',
    Email: '',
    Address: '',
    ZipCode: '',
    City: '',
    State: '',
    Password: '',
    Appointments: [],
    MedicalRecords: [],
    Prescriptions: [],
    PatientOf: []
  });

  async function registerPatient(patient: RegisterFormData): Promise<void> {
    try {
      const response = await axios.post('https://localhost:7160/api/Patients/createPatient', patient);
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
    console.log(formData); // Log the form data to check if it is being updated correctly
  }

  function generateUserID(fname: string, lname: string): string {
    const randomNumbers = Math.floor(Math.random() * 900000000) + 100000000;
    const userID = `${fname.slice(0, 3)}${lname.slice(0, 3)}${randomNumbers}`;
    return userID;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    console.log("Form submitted");
    event.preventDefault();
    // Generate the UserID
    const generatedUserID = generateUserID(formData.FirstName, formData.LastName);

    // Update the form data with the generated UserID
    setFormData((prevFormData) => ({
      ...prevFormData,
      UserID: generatedUserID,
    }));

    // Now, you can send the updated formData to your API
    registerPatient(formData);
    console.log(formData); // Log the form data to check if it is being sent correctly
  }

  return (
    <div className="container">
      <h1>Register</h1>
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
        <div className="mb-3">
          <label htmlFor="ContactNumber" className="form-label">Phone Number</label>
          <input type="text" className="form-control" id="ContactNumber" onChange={handleInputChange} />
        </div>

        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  );
}

export default Register;