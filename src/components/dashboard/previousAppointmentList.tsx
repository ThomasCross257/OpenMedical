import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

interface Appointment {
  id: number;
  date: string;
  results: string[];
}

interface PreviousAppointmentListProps {
  appointments: Appointment[];
}

function PreviousAppointmentList({ appointments }: PreviousAppointmentListProps) {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  function handleAppointmentSelect(appointment: Appointment) {
    setSelectedAppointment(appointment);
  }

  return (
    <div>
      <h2>Previous Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            <button type="button" onClick={() => handleAppointmentSelect(appointment)}>
              {appointment.date}
            </button>
          </li>
        ))}
      </ul>
      {selectedAppointment && (
        <div>
          <h3>Results for {selectedAppointment.date}</h3>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Select a result
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {selectedAppointment.results.map((result, index) => (
                <Dropdown.Item key={index}>{result}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </div>
  );
}

export default PreviousAppointmentList;