import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getUserInfoFromToken } from '../../assets/func/userFunc';
import { Spinner } from 'react-bootstrap';

function RecentAppWidget() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true); // New state for loading
    const info = getUserInfoFromToken();
    const role = info?.role;
    const id = info?.ID;

    useEffect(() => {
        axios.get(`https://localhost:7160/api/Appointment/getAppointments/${id}/${role}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                UserRole: info?.role
            }
        })
            .then((response) => {
                setAppointments(response.data);
                setLoading(false); // Set loading to false once data is fetched
            })
            .catch((error) => {
                console.error('Error fetching appointments:', error);
                setLoading(false); // Set loading to false in case of an error
            });
    }, [id, role]);

    const navigate = useNavigate();
    const toPrevAppointments = () => {
        navigate('/previousAppointments');
    }

    return (
        <div className="card mt-5">
            <div className="card-header">
                <h5>Previous Appointments</h5>
            </div>
            {loading ? ( // Display spinner while loading
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100px' }}>
                    <Spinner animation="border" role="status" />
                </div>
            ) : (
                <>
                    <ul className="list-group list-group-flush">
                        {appointments.filter((appointment: any) => appointment.status === 'Completed').slice(-1).map((appointment: any) => (
                            <li key={appointment.appointmentID} className="list-group-item">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="card-title">{role === 'Doctor' ? appointment.patientFName : appointment.doctorFName}</h5>
                                        <p className="card-text">{new Date(appointment.appointmentStart).toLocaleString()}</p>
                                        <p className="card-text">Reason: {appointment.appointmentType}</p>
                                        <p className="card-text">Status: {appointment.status}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default RecentAppWidget;
