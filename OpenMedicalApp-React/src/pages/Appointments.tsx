import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AppointmentEvent from '../events/viewAppointment';

const localizer = momentLocalizer(moment);

interface Appointment {
  title: string;
  start: Date;
  end: Date;
  reason: string;
  status: string;
}

const appointments: Appointment[] = [
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


const AppointmentCalendar: React.FC = () => {
  return (
    <div className="appointment-calendar">
      <h1>Upcoming Appointments</h1>
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
