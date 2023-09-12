// Display Patient version of OpenPortal
import { useState } from 'react';
import AppointmentWidget from '../components/UpcomingAppointment.tsx'
import RecentAppWidget from '../components/RecentApp.tsx'
import RecordWidget from '../components/RecordWidget.tsx'
function PatientDash() {
  const [] = useState(0);

  return (
    <div className="container">
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
