import { useState, useEffect } from 'react';
import PatientNotes from './PatientNotes';
import EditNotes from './editNotes';
import { getUserInfoFromToken } from '../assets/func/userFunc';
import AddPrescription from './AddPrescription';

const Token = getUserInfoFromToken();
const userId = Token?.ID;
const role = Token?.role;

function PrescriptionTable() {
    const [isPatientNotesModalOpen, setIsPatientNotesModalOpen] = useState(false);
    const [isEditNotesModalOpen, setIsEditNotesModalOpen] = useState(false);
    const [isNewPrescriptionOpen, setIsNewPrescriptionOpen] = useState(false);
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patientData, setPatientData] = useState([]);
    const emptyEvent = { title: '', start: new Date(), end: new Date(), reason: '' };

    useEffect(() => {
        const fetchPatients = async () => {
            const response = await fetch(`https://localhost:7160/api/Doctors/getPatients/${userId}/${role}`);
            console.log(response);
            const data = await response.json();
            setPatients(data);
            console.log(data);
        };
        fetchPatients();
    }, [userId, role]);



    useEffect(() => {
        const fetchPatientDetails = async () => {
            if (selectedPatient || role === 'Patient') {
                try {
                    const response = await fetch(`https://localhost:7160/api/Medical/getPrescriptions/${userId}/${role}`);
                    const data = await response.json();
                    setPatientData(data);
                    console.log(data);
                } catch (error) {
                    console.error('Error fetching patient details:', error);
                }
            }
        };

        fetchPatientDetails();
    }, [selectedPatient, userId, role]);


    const openPatientNotesModal = () => {
        setIsPatientNotesModalOpen(true);
    };

    const openEditNotesModal = () => {
        setIsEditNotesModalOpen(true);
    };

    const openNewPrescriptionModal = () => {
        setIsNewPrescriptionOpen(true);
    };

    const closeModal = () => {
        setIsEditNotesModalOpen(false);
        setIsPatientNotesModalOpen(false);
        setIsNewPrescriptionOpen(false);
    };
    console.log(selectedPatient);
    return (
        <div className="container">
            <div className="dropstart">
                {role === 'Doctor' ?
                    <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Select Patient
                    </button>
                    : ''}
                {role === 'Doctor' ?
                    <ul className="dropdown-menu">
                        {patients.map((patient: any) => (
                            <li key={patient.patientID}>
                                <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => setSelectedPatient(patient)}
                                >
                                    {patient.patientFName}
                                </a>
                            </li>
                        ))}
                    </ul>
                    : ''}
            </div>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">
                        {role === 'Doctor' ? (selectedPatient ? selectedPatient.patientFName : 'No patient selected') : Token?.name}
                    </h4>
                    {selectedPatient ? <button type="button" className="btn btn-primary" onClick={openNewPrescriptionModal}>Add Prescription</button> : ''}
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Prescription</th>
                                <th scope="col">Dosage</th>
                                <th scope="col">Date</th>
                                <th scope="col">Doctor</th>
                                <th scope="col">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patientData && patientData.map((prescription: any, index: number) => (
                                <tr key={index}>
                                    <td>{prescription.medication}</td>
                                    <td>{prescription.dosage}</td>
                                    <td>{prescription.prescriptionDate}</td>
                                    <td>{prescription.doctorFName}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary" onClick={openPatientNotesModal}>View Notes</button>
                                        {role === 'Doctor' ? <button type="button" className="btn btn-primary" onClick={openEditNotesModal}>Edit Notes</button> : ''}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {patientData && patientData.map((prescription: any, index: number) => (
                <div key={index}>
                    <PatientNotes isOpen={isPatientNotesModalOpen} onRequestClose={closeModal} notes={prescription.notes} />
                    <EditNotes isOpen={isEditNotesModalOpen} onRequestClose={closeModal} oldPrescription={prescription} />
                </div>
            ))}
            <AddPrescription isOpen={isNewPrescriptionOpen} onRequestClose={closeModal}
                userId={userId}
                patientId={selectedPatient?.patientID}
                pname={selectedPatient?.patientFName}
                dname={Token?.name} />

        </div>
    );
}

export default PrescriptionTable;
