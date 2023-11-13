interface PatientFormData {
    FullName: string;
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
    FullName: string;
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