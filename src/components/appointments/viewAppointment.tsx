// Modal.tsx
import ReactModal from 'react-modal';
import axios from 'axios';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  event: any // Replace 'Appointment' with your event type
}


const ViewAppointmentModal: React.FC<ModalProps> = ({ isOpen, onRequestClose, event }) => {
  if (!event) {
    return null;
  }
  const cancelAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post(`https://localhost:7160/api/Medical/cancelAppointment/${event.appointmentID}`);
    if (res.data != null) {
      console.log(res.data);
      onRequestClose();
      window.location.reload();
    }
  }
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
              <p>Status: {event.status}</p>
              <p>Doctor Name: {event.doctorName}</p>
              <button className="btn btn-primary" onClick={onRequestClose}>Close</button>
              <br />
              <br />
              <form onSubmit={cancelAppointment}>
                <button className="btn btn-danger" type="submit">Cancel Appointment</button>
              </form>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default ViewAppointmentModal;
