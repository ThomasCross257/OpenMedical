import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AppointmentEvent from '../events/viewAppointment';
import axios from 'axios';
import ViewAppointmentModal from '../components/appointments/viewAppointment';
import CreateAppointmentModal from '../components/appointments/createAppointment';
import { getUserInfoFromToken } from '../assets/func/userFunc';
import { Spinner } from 'react-bootstrap';

const localizer = momentLocalizer(moment);

const UserInfo = getUserInfoFromToken();

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [showModal_view, setShowModal_view] = useState(false);
  const [showModal_create, setShowModal_create] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (UserInfo?.role === 'Patient' || UserInfo?.role === 'Doctor') {
      axios.get(`https://localhost:7160/api/Appointment/getAppointments/${UserInfo?.ID}/${UserInfo?.role}`)
        .then((res) => {

          if (res.data != null) {
            setAppointments(res.data.map((appointment: any) => {
              setLoading(false);
              return {
                appointmentID: appointment.appointmentID,
                patientID: appointment.patientID,
                doctorID: appointment.doctorID,
                // Two different kinds of start/end variables for display and for the API
                start: new Date(appointment.appointmentStart),
                realStart: appointment.appointmentStart,
                end: new Date(appointment.appointmentEnd),
                realEnd: appointment.appointmentEnd,
                title: appointment.appointmentType,
                patientName: appointment.patientFName,
                doctorName: appointment.doctorFName,
                type: appointment.appointmentType,
                status: appointment.status,
              };
            }));
          }
        })
        .catch((error) => {
          alert("Error: " + error.response.data);
          setLoading(false);
        });
    }
  }, []);

  const AppointmentCalendar = () => {
    if (loading) {
      return (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      );
    }
    return (
      <div className="appointment-calendar">
        <div className="d-flex justify-content-between">
          <h1>Upcoming Appointments</h1>
          <button className="btn btn-success" onClick={() => setShowModal_create(true)}>Create Appointment</button>
        </div>
        <br />
        <Calendar
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          components={{
            event: AppointmentEvent,
          }}
          style={{ height: 500 }}
        />
      </div>
    );
  };

  if (UserInfo?.role !== 'Patient' && UserInfo?.role !== 'Doctor') {
    return <h1 style={{ textAlign: 'center' }}>Access Denied</h1>;
  }

  return (
    <div>
      <ViewAppointmentModal
        isOpen={showModal_view}
        onRequestClose={() => setShowModal_view(false)}
        event={appointments[0]}
      />
      <CreateAppointmentModal
        isOpen={showModal_create}
        onRequestClose={() => setShowModal_create(false)}
        event={appointments[0]}
      />
      <AppointmentCalendar />
    </div>
  );
};

export default Appointments;
