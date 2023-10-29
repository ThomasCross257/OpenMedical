-- Create the Patients table
CREATE TABLE Patients (
  PatientID INT PRIMARY KEY IDENTITY(1,1),
  UserID VARCHAR(50),
  FirstName VARCHAR(50) NOT NULL,
  LastName VARCHAR(50) NOT NULL,
  DateOfBirth DATE,
  Gender CHAR(1),
  ContactNumber VARCHAR(20),
  Email VARCHAR(100),
  Address VARCHAR(255),
  ZipCode VARCHAR(10),
  State VARCHAR(50),
  City VARCHAR(50),
  Password VARCHAR(30)
);

-- Create the Doctors table
CREATE TABLE Doctors (
  DoctorID INT PRIMARY KEY IDENTITY(1,1),
  UserID VARCHAR(50),
  FirstName VARCHAR(50) NOT NULL,
  LastName VARCHAR(50) NOT NULL,
  Specialty VARCHAR(100),
  ContactNumber VARCHAR(20),
  Email VARCHAR(100),
  Password VARCHAR(30)
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
  Notes TEXT
);

CREATE TABLE Prescriptions(
  PrescriptionID INT PRIMARY KEY IDENTITY(1,1),
  PatientID INT REFERENCES Patients(PatientID),
  DoctorID INT REFERENCES Doctors(DoctorID),
  PrescriptionDate DATE,
  Medication VARCHAR(255),
  Dosage VARCHAR(255),
  Notes TEXT
);

CREATE TABLE patientOf(
  PatientID INT REFERENCES Patients(PatientID),
  DoctorID INT REFERENCES Doctors(DoctorID),
  PRIMARY KEY (PatientID, DoctorID)
);

-- Insert 5 doctors
INSERT INTO Doctors (FirstName, LastName, Specialty, ContactNumber, Email, Password)
VALUES
  ('Dr. John', 'Smith', 'Cardiologist', '123-456-7890', 'dr.john@example.com', 'openABCDEF'),
  ('Dr. Sarah', 'Johnson', 'Pediatrician', '987-654-3210', 'dr.sarah@example.com', 'openABCDEF'),
  ('Dr. Michael', 'Williams', 'Dermatologist', '555-555-5555', 'dr.michael@example.com', 'openABCDEF'),
  ('Dr. Lisa', 'Davis', 'Oncologist', '777-777-7777', 'dr.lisa@example.com', 'openABCDEF'),
  ('Dr. Robert', 'Wilson', 'Orthopedic Surgeon', '888-888-8888', 'dr.robert@example.com', 'openABCDEF');

-- Insert 10 patients
INSERT INTO Patients (FirstName, LastName, DateOfBirth, Gender, ContactNumber, Email, Address, Password, ZipCode, State, City)
VALUES
  ('John', 'Doe', '1990-03-15', 'M', '111-222-3333', 'john.doe@example.com', '123 Main St', 'openABCDEF', '12345', 'California', 'Los Angeles'),
  ('Jane', 'Smith', '1985-07-20', 'F', '444-555-6666', 'jane.smith@example.com', '456 Elm St', 'openABCDEF', '67890', 'New York', 'New York'),
  ('David', 'Johnson', '2000-01-10', 'M', '777-888-9999', 'david.johnson@example.com', '789 Oak St', 'openABCDEF', '12345', 'Florida', 'Miami'),
  ('Emily', 'Brown', '1995-11-25', 'F', '222-333-4444', 'emily.brown@example.com', '101 Pine St', 'openABCDEF', '67890', 'California', 'San Francisco'),
  ('Michael', 'Lee', '1980-09-03', 'M', '999-888-7777', 'michael.lee@example.com', '555 Maple St', 'openABCDEF', '12345', 'Florida', 'Orlando'),
  ('Sarah', 'Garcia', '1992-04-30', 'F', '666-555-4444', 'sarah.garcia@example.com', '222 Birch St', 'openABCDEF', '67890', 'Texas', 'Houston'),
  ('William', 'Harris', '1987-08-12', 'M', '333-222-1111', 'william.harris@example.com', '789 Cedar St', 'openABCDEF', '12345', 'California', 'San Diego'),
  ('Olivia', 'Anderson', '2002-02-18', 'F', '111-999-8888', 'olivia.anderson@example.com', '303 Walnut St', 'openABCDEF', '67890', 'Texas', 'Austin'),
  ('James', 'Martinez', '1975-06-05', 'M', '444-666-8888', 'james.martinez@example.com', '888 Redwood St', 'openABCDEF', '12345', 'Florida', 'Tampa'),
  ('Sophia', 'Wilson', '1998-12-20', 'F', '555-444-3333', 'sophia.wilson@example.com', '404 Oakwood St', 'openABCDEF', '67890', 'New York', 'Buffalo');

-- Create relationships between patients and doctors (each doctor with 2 patients)
-- Doctor 1
INSERT INTO patientOf (PatientID, DoctorID)
VALUES (1, 1), (2, 1);

-- Doctor 2
INSERT INTO patientOf (PatientID, DoctorID)
VALUES (3, 2), (4, 2);

-- Doctor 3
INSERT INTO patientOf (PatientID, DoctorID)
VALUES (5, 3), (6, 3);

-- Doctor 4
INSERT INTO patientOf (PatientID, DoctorID)
VALUES (7, 4), (8, 4);

-- Doctor 5
INSERT INTO patientOf (PatientID, DoctorID)
VALUES (9, 5), (10, 5);

-- Insert appointments for patients with random dates and times in 2023 (after October 2nd)
-- You can adjust the date range as needed.
INSERT INTO Appointments (PatientID, DoctorID, AppointmentDateTime, AppointmentType, Status)
SELECT
  PatientID,
  DoctorID,
  DATEADD(DAY, ABS(CHECKSUM(NEWID())) % 60, '2023-10-03') + CAST(ABS(CHECKSUM(NEWID())) % 1440 AS DATETIME),
  CASE WHEN ABS(CHECKSUM(NEWID())) % 2 = 0 THEN 'In-Person' ELSE 'Telemedicine' END,
  CASE WHEN ABS(CHECKSUM(NEWID())) % 2 = 0 THEN 'Scheduled' ELSE 'Completed' END
FROM patientOf;

-- Insert medical records with a random number between 2 and 12 for each patient
INSERT INTO MedicalRecords (PatientID, DoctorID, RecordDate, Diagnosis, Treatment, Notes)
SELECT
  p.PatientID,
  po.DoctorID,
  DATEADD(day, ABS(CHECKSUM(NEWID())) % 90, '2023-10-02'),
  'Condition ' + CAST(ABS(CHECKSUM(NEWID())) % 5 + 1 AS VARCHAR(255)),
  'Treatment for Condition ' + CAST(ABS(CHECKSUM(NEWID())) % 5 + 1 AS VARCHAR(255)),
  'Notes for Condition ' + CAST(ABS(CHECKSUM(NEWID())) % 5 + 1 AS VARCHAR(255))
FROM Patients p
JOIN patientOf po ON p.PatientID = po.PatientID;

-- Insert prescriptions for some patients (up to your discretion)
-- You can adjust the number of prescriptions and medications as needed.
INSERT INTO Prescriptions (PatientID, DoctorID, PrescriptionDate, Medication, Dosage, Notes)
SELECT TOP 3
  p.PatientID,
  po.DoctorID,
  DATEADD(day, ABS(CHECKSUM(NEWID())) % 30, '2023-10-02'),
  CASE
    WHEN ABS(CHECKSUM(NEWID())) % 2 = 0 THEN 'Medication A'
    ELSE 'Medication B'
  END,
  'Dosage instructions',
  'Prescription notes'
FROM Patients p
JOIN patientOf po ON p.PatientID = po.PatientID
ORDER BY NEWID();