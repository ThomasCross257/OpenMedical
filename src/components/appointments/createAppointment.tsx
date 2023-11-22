import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';
import { getUserInfoFromToken } from '../../assets/func/userFunc';
import { DateTime } from 'luxon';

interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    event: any;
}

const CreateAppointmentModal: React.FC<ModalProps> = ({ isOpen, onRequestClose, event }) => {
    const [datetime, setDatetime] = useState('');
    const [type, setType] = useState('');
    const UserInfo = getUserInfoFromToken();
    const patientID = UserInfo?.ID;

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const startDate = DateTime.fromISO(datetime, { zone: 'local' });
        if (startDate < DateTime.now()) {
            alert('Please select a valid date and time.');
            return;
        }
        const endDate = startDate.plus({ hours: 1 });

        const doctorResponse = await axios.get(`https://localhost:7160/api/Patients/getPrimaryDoctor/${patientID}/${UserInfo?.role}`);
        const data = doctorResponse.data[0]
        const doctorID = data.doctorID;

        const appointment = {
            appointmentID: 0,
            patientID: patientID,
            doctorID: doctorID,
            appointmentStart: startDate.toISO(),
            appointmentEnd: endDate.toISO(),
            appointmentType: type,
            patientFName: data.patientFName,
            doctorFName: data.doctorFName,
            status: 'Pending',
        };

        console.log(appointment);

        const res = await axios.post('https://localhost:7160/api/Appointment/createAppointment', appointment);

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
                    <div className="modal-content container">
                        <div className="modal-header">
                            <h5 className="modal-title">New Appointment</h5>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleFormSubmit}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="datetime" className="form-label">Appointment Date and Time:</label>
                                        <input type="datetime-local" className="form-control" id="datetime" name="datetime" value={datetime} onChange={e => setDatetime(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="type" className="form-label">Appointment Type:</label>
                                        <input type="text" className="form-control" id="type" name="type" value={type} onChange={e => setType(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                        <button type="button" className="btn btn-secondary" onClick={onRequestClose}>Close</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </ReactModal>
        </div>
    );
};

export default CreateAppointmentModal;
