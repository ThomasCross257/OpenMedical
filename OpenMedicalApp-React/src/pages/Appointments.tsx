import React, {useState} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from '../components/appointmentModal';

const localizer = momentLocalizer(moment);

interface Appointment {
  title: string;
  start: Date;
  end: Date;
  reason: string;
}

// This will be filled by the backend in the future using an API call. - Thomas

const appointments: Appointment[] = [
  {
    title: 'Meeting 1',
    start: new Date(2023, 7, 25, 10, 0), // Pattern is Year, Month, Day, Hour, Minute
    end: new Date(2023, 7, 25, 11, 0),
    reason: 'Checkup',
  },
  {
    title: 'Meeting 2',
    start: new Date(2023, 7, 25, 14, 0),
    end: new Date(2023, 7, 25, 15, 0),
    reason: 'Checkup',
  },
];

const CustomEvent: React.FC<any> = ({ event }) => {
    const [showModal, setShowModal] = useState(false);
  
    const toggleModal = () => {
      setShowModal(!showModal);
    };
  
    return (
      <div className="custom-event">
        <a href="#" className="link-light" onClick={toggleModal}>
          {event.title}
        </a>
        {showModal && <Modal onClose={toggleModal} />}
      </div>
    );
  };

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
            event: CustomEvent,
        }}
        style={{ height: 500 }}
      />
    </div>
  
  );
};

export default AppointmentCalendar;
