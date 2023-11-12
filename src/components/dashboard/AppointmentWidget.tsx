import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getUserInfoFromToken } from '../../assets/func/userFunc';

function AppointmentWidget() {
    const [appointments, setAppointments] = useState([]);
    const info = getUserInfoFromToken();
    const role = info?.role;
    const id = info?.ID;

    useEffect(() => {
        axios.get(`https://localhost:7160/api/Medical/getAppointments/${id}/${role}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                UserRole: info?.role
            }
        })
            .then((response) => {
                setAppointments(response.data);
            })
            .catch((error) => {
                console.error('Error fetching appointments:', error);
            });
    }, [id, role]);

    const navigate = useNavigate();
    const toAppointments = () => {
        navigate('/Appointments');
    };

    return (
        <div className="card mt-5">
            <div className="card-header">
                <h3>Appointments</h3>
            </div>
            <ul className="list-group list-group-flush">
                {appointments.slice(-3).map((appointment: any) => (
                    <li key={appointment.appointmentID} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="card-title">{appointment.doctorFullName}</h5>
                                <p className="card-text">Date: {appointment.appointmentDateTime}</p>
                                <p className="card-text">Reason: {appointment.appointmentType}</p>
                                <p className="card-text">Status: {appointment.status}</p>
                            </div>
                            <button className="btn btn-info">View</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="card-footer text-center">
                <button className="btn btn-primary" onClick={toAppointments}>View All</button>
            </div>
        </div>
    );
}

export default AppointmentWidget;
