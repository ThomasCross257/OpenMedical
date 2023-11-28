//@ts-nocheck
import React, { useState, useEffect } from 'react';
import { getUserInfoFromToken } from '../assets/func/userFunc';
import { Spinner } from 'react-bootstrap';
import PatientNotes from './PatientNotes';
import EditNotes from './editNotes';
import AddPrescription from './AddPrescription';

const PrescriptionTable = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isViewNotesModalOpen, setViewNotesModalOpen] = useState(false);
    const [isEditNotesModalOpen, setEditNotesModalOpen] = useState(false);
    const [isNewPrescriptionOpen, setNewPrescriptionModalOpen] = useState(false);

    const openViewNotesModal = () => setViewNotesModalOpen(true);
    const closeViewNotesModal = () => setViewNotesModalOpen(false);

    const openNewPrescriptionModal = () => setNewPrescriptionModalOpen(true);
    const closeNewPrescriptionModal = () => setNewPrescriptionModalOpen(false);

    const openEditNotesModal = () => setEditNotesModalOpen(true);
    const closeEditNotesModal = () => setEditNotesModalOpen(false);

    const Token = getUserInfoFromToken();
    const role = Token?.role;
    const id = Token?.ID;

    useEffect(() => {
        if (role === 'Doctor') {
            const fetchPatients = async () => {
                try {
                    const response = await fetch(`https://localhost:7160/api/Doctors/getPatients/${id}/${role}`);
                    const data = await response.json();
                    setPatients(data);
                } catch (error) {
                    console.error('Error fetching patients:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchPatients();
        }
    }, [role, Token?.ID]);

    useEffect(() => {
        setPrescriptions([]);
        setLoading(true);
        if (role === 'Doctor' && selectedPatient || role === 'Patient') {
            const fetchPrescriptions = async () => {
                try {
                    setPrescriptions([]);
                    if (role === 'Doctor') {
                        const response = await fetch(`https://localhost:7160/api/Prescription/getPrescriptions/${id}/${role}`);
                        const data = await response.json();
                        setPrescriptions(data);
                        console.log(data);
                    } else {
                        const response = await fetch(`https://localhost:7160/api/Prescription/getPrescriptions/${id}/${role}`);
                        const data = await response.json();
                        setPrescriptions(data);
                    }
                } catch (error) {
                    console.error('Error fetching prescriptions:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchPrescriptions();
        }
    }, [role, selectedPatient, Token?.ID]);

    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient);
    };
    console.log(patients)
    return (
        <div className="container">
            <h1 className="my-4">Prescriptions</h1>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100px' }}>
                    <Spinner animation="border" role="status" />
                </div>
            ) : (
                <>
                    {role === 'Doctor' ? (
                        <>
                            <div className="row mb-3">
                                <div className="col">
                                    <div className="dropdown">
                                        <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Select Patient
                                        </button>
                                        <ul className="dropdown-menu">
                                            {patients.map((patient) => (
                                                <li key={patient.patientID}>
                                                    <a
                                                        className="dropdown-item"
                                                        href="#"
                                                        onClick={() => handlePatientSelect(patient)}
                                                    >
                                                        {patient.patientFName}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {selectedPatient && (
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">{selectedPatient.patientFName}</h4>
                                        {role === 'Doctor' && (
                                            <button className="btn btn-success" onClick={() => openNewPrescriptionModal()}>
                                                Add Prescription
                                            </button>
                                        )}
                                        <table className="table table-striped mt-3">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Medication</th>
                                                    <th scope="col">Prescription Date</th>
                                                    <th scope="col">Dosage</th>
                                                    <th scope="col">Doctor</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {prescriptions.length > 0 ? (
                                                    prescriptions.map((prescription) => (
                                                        <tr key={prescription.prescriptionID}>
                                                            <td>{prescription.medication}</td>
                                                            <td>{new Date(prescription.prescriptionDate).toLocaleDateString()}</td>
                                                            <td>{prescription.dosage}</td>
                                                            <td>{prescription.doctorFName}</td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-success"
                                                                    onClick={() => {
                                                                        openViewNotesModal();
                                                                    }}
                                                                >
                                                                    View Notes
                                                                </button>
                                                            </td>
                                                            {role === 'Doctor' && (
                                                                <>
                                                                    <td>
                                                                        <button
                                                                            className="btn btn-warning"
                                                                            onClick={() => {
                                                                                openEditNotesModal();
                                                                            }}
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                    </td>
                                                                    <PatientNotes
                                                                        isOpen={isViewNotesModalOpen}
                                                                        onRequestClose={closeViewNotesModal}
                                                                        notes={prescription.notes}
                                                                    />
                                                                    <EditNotes
                                                                        isOpen={isEditNotesModalOpen}
                                                                        onRequestClose={closeEditNotesModal}
                                                                        oldPrescription={prescription}
                                                                    />

                                                                </>
                                                            )}
                                                        </tr>
                                                    ))

                                                ) : (
                                                    <tr>
                                                        <td colSpan={role === 'Doctor' ? 6 : 5}>No prescriptions found.</td>
                                                    </tr>
                                                )}
                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">{Token?.name}</h4>
                                <table className="table table-striped mt-3">
                                    <thead>
                                        <tr>
                                            <th scope="col">Prescription Date</th>
                                            <th scope="col">Medication</th>
                                            <th scope="col">Dosage</th>
                                            <th scope="col">Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {prescriptions.map((prescription) => (
                                            <tr key={prescription.prescriptionID}>
                                                <td>{new Date(prescription.prescriptionDate).toLocaleDateString()}</td>
                                                <td>{prescription.medication}</td>
                                                <td>{prescription.dosage}</td>
                                                <td>{prescription.notes}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </>
            )
            }
            <AddPrescription
                isOpen={isNewPrescriptionOpen}
                onRequestClose={closeNewPrescriptionModal}
                userId={id}
                patientId={selectedPatient?.patientID}
                pname={selectedPatient?.patientFName}
                dname={Token?.name}
            />
        </div >
    );
};

export default PrescriptionTable;
