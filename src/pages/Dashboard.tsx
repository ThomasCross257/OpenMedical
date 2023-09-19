// Display Patient version of OpenPortal
import { useState } from 'react';
import AppointmentWidget from '../components/UpcomingAppointment.tsx'
import RecentAppWidget from '../components/appointments/RecentApp.tsx'
import RecordWidget from '../components/dashboard/RecordWidget.tsx'
function PatientDash() {
  const [isDoctor , setIsDoctor] = useState(false);

  return (
    <div className="container">
        <h1>Welcome {isDoctor ? 'Doctor' : 'Patient'}</h1>
        <br/>
        <button type="button" className="btn btn-primary" onClick={() => setIsDoctor(!isDoctor)}> Change to {isDoctor ? 'Patient' : 'Doctor'}</button>
        <div className="row">
            <div className="col md-6">
                <AppointmentWidget/>
            </div>
            <div className="col md-6">
                <RecentAppWidget/>
                <RecordWidget/>
            </div>
        </div>
    </div>
  );
}

export default PatientDash;
