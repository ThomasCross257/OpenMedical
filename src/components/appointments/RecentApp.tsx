// Display Patient version of OpenPortal
import { useState } from 'react';

function RecentAppWidget() {
  const [] = useState(0);
  return (
    <div className="card RecentAppointmentWidget mt-5">
        <div className="card-header">
            <h5>Previous Appointment</h5>
        </div>
        <div className="card">
            <ul className='list-unstyled'>
                <li>
                    <div className="card-body">
                        <h5 className="card-title">Dr. John Doe</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Date: 10/9/2021</h6>
                        <p className="card-text">Time: 11:30 AM</p>
                        <p className="card-text">Reason: Checkup</p>
                        <button className="btn btn-info">Results</button>
                    </div>
                </li>
            </ul>
            <button className="btn btn-primary">View All</button>
        </div>
    </div>
  );
}

export default RecentAppWidget;
