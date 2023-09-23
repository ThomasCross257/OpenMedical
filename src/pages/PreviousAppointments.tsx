import PreviousAppointmentList from '../components/dashboard/previousAppointmentList';
import { useState } from 'react';


function PreviousAppointments() {
    const [] = useState(0);

    return (
        <div className="container">
            <PreviousAppointmentList appointments={[]}/>
        </div>
    );
}

export default PreviousAppointments;