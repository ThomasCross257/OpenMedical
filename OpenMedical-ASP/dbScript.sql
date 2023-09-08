-- Create the Patients table
CREATE TABLE Patients (
  PatientID INT PRIMARY KEY IDENTITY(1,1),
  FirstName VARCHAR(50) NOT NULL,
  LastName VARCHAR(50) NOT NULL,
  DateOfBirth DATE,
  Gender CHAR(1),
  ContactNumber VARCHAR(20),
  Email VARCHAR(100),
  Address VARCHAR(255)
);

-- Create the Doctors table
CREATE TABLE Doctors (
  DoctorID INT PRIMARY KEY IDENTITY(1,1),
  FirstName VARCHAR(50) NOT NULL,
  LastName VARCHAR(50) NOT NULL,
  Specialty VARCHAR(100),
  ContactNumber VARCHAR(20),
  Email VARCHAR(100)
);

-- Create the Appointments table
CREATE TABLE Appointments (
  AppointmentID INT PRIMARY KEY IDENTITY(1,1),
  PatientID INT REFERENCES Patients(PatientID),
  DoctorID INT REFERENCES Doctors(DoctorID),
  AppointmentDateTime DATETIME,
  AppointmentType VARCHAR(20), -- In-Person, Telemedicine, etc.
  Status VARCHAR(20) -- Scheduled, Completed, Canceled, etc.
);

-- Create the MedicalRecords table
CREATE TABLE MedicalRecords (
  RecordID INT PRIMARY KEY IDENTITY(1,1),
  PatientID INT REFERENCES Patients(PatientID),
  DoctorID INT REFERENCES Doctors(DoctorID),
  RecordDate DATE,
  Diagnosis VARCHAR(255),
  Treatment TEXT,
  Medications TEXT,
  Notes TEXT
);
