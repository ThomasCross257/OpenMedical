// Display Patient version of OpenPortal
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RecentAppWidget() {
  const [] = useState(0);
        const navigate = useNavigate();
    const toPrevAppointments = () => {
        navigate('/previousAppointments');
    }
  return (
    <div className="card mt-5">
            <div className="card-header">
                <h5>Previous Appointments</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="card-title">Dr. John Doe</h5>
                            <p className="card-text">Date: 10/9/2021</p>
                            <p className="card-text">Time: 11:30 AM</p>
                            <p className="card-text">Reason: Checkup</p>
                        </div>
                        <button className="btn btn-info">Results</button>
                    </div>
                </li>
            </ul>
            <div className="card-footer text-center">
                <button className="btn btn-primary" onClick={toPrevAppointments}>View All</button>
            </div>
        </div>
  );
}

export default RecentAppWidget;
