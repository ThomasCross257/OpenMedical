// Display Patient version of OpenPortal
import { useState } from 'react';

function AppointmentWidget() {
  const [] = useState(0);
  return (
    <div className="card AppointmentWidget mt-5">
        <div className="card-header">
            <h3>Appointments</h3>
        </div>
        <div className="card">
            <ul className='list-unstyled'>
                <li>
                    <div className="card-body">
                        <h5 className="card-title">Dr. John Doe</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Date: 10/10/2021</h6>
                        <p className="card-text">Time: 10:00 AM</p>
                        <p className="card-text">Reason: Checkup</p>
                        <button className="btn btn-danger">Cancel</button>
                    </div>
                </li>
                <li>
                    <div className="card-body">
                        <h5 className="card-title">Dr. Jane Doe</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Date: 10/10/2021</h6>
                        <p className="card-text">Time: 2:00 PM</p>
                        <p className="card-text">Reason: Checkup</p>
                        <button className="btn btn-danger">Cancel</button>
                    </div>
                </li>
                <li>
                    <div className="card-body">
                        <h5 className="card-title">Dr. John Doe</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Date: 10/10/2021</h6>
                        <p className="card-text">Time: 7:00 PM</p>
                        <p className="card-text">Reason: Checkup</p>
                        <button className="btn btn-danger">Cancel</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  );
}

export default AppointmentWidget;
