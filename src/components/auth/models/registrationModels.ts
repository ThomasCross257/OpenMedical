interface PatientFormData {
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
}

interface DoctorFormData {
    FirstName: string;
    LastName: string;
    Speciality: string;
    ContactNumber: string;
    Email: string;
    Password: string;
}

interface LoginFormData {
    Email: string;
    Password: string;
}

export type { DoctorFormData, PatientFormData, LoginFormData };