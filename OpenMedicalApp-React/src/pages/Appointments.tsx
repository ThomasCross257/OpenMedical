import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AppointmentEvent from '../events/viewAppointment';

const localizer = momentLocalizer(moment);

// This should be reorganized into a component later : TODO - Thomas

interface Appointment {
  title: string;
  start: Date;
  end: Date;
  reason: string;
  status: string;
}

var appointments: Appointment[] = [ // Var will only be for testing purposes. This will be replaced with a call to the database.
  {
    title: 'Meeting 1',
    start: new Date(2023, 8, 25, 10, 0),
    end: new Date(2023, 8, 25, 11, 0),
    reason: 'Checkup',
    status: 'Pending',
  },
  {
    title: 'Meeting 2',
    start: new Date(2023, 7, 25, 14, 0),
    end: new Date(2023, 7, 25, 15, 0),
    reason: 'Checkup',
    status: 'Complete',
  },
];

const addAppointment = () => {
  const startTime = new Date(); // Current time
  const endTime = new Date(startTime);
  endTime.setHours(startTime.getHours() + 1); // Set end time 1 hour later

  const testAppointment = {
    title: 'Meeting 3',
    start: startTime,
    end: endTime,
    reason: 'Checkup',
    status: 'Pending',
  };

  appointments.push(testAppointment);
  console.log(appointments);
};


const AppointmentCalendar: React.FC = () => {
  return (
    
    <div className="appointment-calendar">
      <h1>Upcoming Appointments</h1>
      <button className="btn btn-success" onClick={addAppointment} >Add Appointment</button>
      <br/>
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

export default AppointmentCalendar;
