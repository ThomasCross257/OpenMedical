// Modal.tsx
import ReactModal from 'react-modal';
import axios from 'axios';
import { getUserInfoFromToken } from '../../assets/func/userFunc';
import { useState, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  event: any // Replace 'Appointment' with your event type
}


const Token = getUserInfoFromToken();
const userRole = Token?.role;

const ViewAppointmentModal: React.FC<ModalProps> = ({ isOpen, onRequestClose, event }) => {
  if (!event) {
    return null;
  }

  useEffect(() => {
    console.log('userRole:', userRole);
    console.log('event.status:', event.status);
  }, [userRole, event.status]);

  let initialAppointment = {
    appointmentID: event.appointmentID,
    patientID: event.patientID,
    doctorID: event.doctorID,
    appointmentStart: event.realStart,
    appointmentEnd: event.realEnd,
    appointmentType: event.type,
    status: event.status,
    patientFName: event.patientName,
    doctorFName: event.doctorName,
  };
  const [mappedAppointment, setMappedAppointment] = useState(initialAppointment);
  const cancelAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post(`https://localhost:7160/api/Medical/cancelAppointment/${event.appointmentID}`);
    if (res.data != null) {
      console.log(res.data);
      onRequestClose();
      window.location.reload();
    }
  };

  const alterAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post(`https://localhost:7160/api/Medical/updateAppointment/${event.appointmentID}`, mappedAppointment);

    if (res.data != null) {
      console.log(res.data);
      onRequestClose();
      window.location.reload();
    }
  };

  return (
    <div className="container">
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Event Modal"
        style={{ overlay: { zIndex: 1000 }, content: { zIndex: 1001 } }}
      >
        <div className="modal-dialog modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{event.title}</h5>
            </div>
            <div className="modal-body">
              <p>Start: {new Date(event.start).toLocaleString()} to {new Date(event.end).toLocaleString()} </p>
              <p>Status:</p>
              {userRole === 'Doctor' && (event.status !== 'Cancelled' && event.status !== 'Completed') ? (

                <select
                  className="form-select"
                  value={mappedAppointment.status}
                  onChange={(e) => {
                    setMappedAppointment(prevState => ({
                      ...prevState,
                      status: e.target.value
                    }));
                  }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              ) : (
                <p>{event.status}</p>
              )}
              <p>Doctor Name: {event.doctorName}</p>
              <button className="btn btn-primary" onClick={onRequestClose}>
                Close
              </button>
              <br />
              <br />
              {userRole === 'Doctor' && (
                <button className="btn btn-secondary" onClick={alterAppointment}>
                  Change Status
                </button>
              )}
              <form onSubmit={cancelAppointment}>
                <br />
                <button className="btn btn-danger" type="submit">
                  Cancel Appointment
                </button>
              </form>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default ViewAppointmentModal;
