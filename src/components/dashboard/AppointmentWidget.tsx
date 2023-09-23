// Display Patient version of OpenPortal
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AppointmentWidget() {
  const [] = useState(0);
  const navigate = useNavigate();
    const toAppointments = () => {
        navigate('/Appointments');
    }
  return (
    <div className="card mt-5">
            <div className="card-header">
                <h3>Appointments</h3>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="card-title">Dr. John Doe</h5>
                            <p className="card-text">Date: 10/10/2021</p>
                            <p className="card-text">Time: 10:00 AM</p>
                            <p className="card-text">Reason: Checkup</p>
                        </div>
                        <button className="btn btn-danger">Cancel</button>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="card-title">Dr. Jane Doe</h5>
                            <p className="card-text">Date: 10/10/2021</p>
                            <p className="card-text">Time: 2:00 PM</p>
                            <p className="card-text">Reason: Checkup</p>
                        </div>
                        <button className="btn btn-danger">Cancel</button>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="card-title">Dr. John Doe</h5>
                            <p className="card-text">Date: 10/10/2021</p>
                            <p className="card-text">Time: 7:00 PM</p>
                            <p className="card-text">Reason: Checkup</p>
                        </div>
                        <button className="btn btn-danger">Cancel</button>
                    </div>
                </li>
            </ul>
            <div className="card-footer text-center">
                <button className="btn btn-primary" onClick={toAppointments}>View All</button>
            </div>
        </div>

  );
}

export default AppointmentWidget;
