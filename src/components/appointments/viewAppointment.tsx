import ReactModal from 'react-modal';
import axios from 'axios';
import { getUserInfoFromToken } from '../../assets/func/userFunc';
import { useState, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  event: any;
}


const Token = getUserInfoFromToken();
const userRole = Token?.role;

const ViewAppointmentModal: React.FC<ModalProps> = ({ isOpen, onRequestClose, event }) => {
  if (!event) {
    return null;
  }

  useEffect(() => {
    // console.log('userRole:', userRole);
    // console.log('event.status:', event.status);
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

  const alterAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mappedAppointment.status === 'Pending') {
      alert('Please select a valid status.');
      return;
    }
    else if (mappedAppointment.status === 'Cancelled') {
      const confirmCancel = window.confirm('Are you sure you want to cancel this appointment?');
      if (confirmCancel === true) {
        const res = await axios.post(`https://localhost:7160/api/Appointment/deleteAppointment/${event.appointmentID}`);
        if (res.data != null) {
          // console.log(res.data);
          onRequestClose();
          window.location.reload();
        }
      }
    } else {
      const res = await axios.post(`https://localhost:7160/api/Appointment/updateAppointment/${event.appointmentID}`, mappedAppointment);
      if (res.data != null) {
        // console.log(res.data);
        onRequestClose();
        window.location.reload();
      }
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
              {event.status !== 'Cancelled' && event.status !== 'Completed' ? (
                <div>
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
                    {event.status === 'Pending' ? <option value="Pending">Pending</option> : null}
                    {event.status === 'Approved' ? <option value="Approved">Approved</option> : null}
                    <option value="Cancelled">Cancelled</option>
                    {userRole === 'Doctor' ? <option value="Approved">Approved</option> : null}
                    {userRole === 'Doctor' ? <option value="Completed">Completed</option> : null}
                  </select>
                  <p>Doctor Name: {event.doctorName}</p>
                  {event.status != 'Approved' || event.status != 'Completed' ? (
                    <button className="btn btn-secondary" onClick={alterAppointment}>
                      Change Status
                    </button>
                  ) : null
                  }
                </div>
              ) : (
                <p>{event.status}</p>
              )}
              <br />
              <br />
              <button className="btn btn-primary" onClick={onRequestClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default ViewAppointmentModal;
