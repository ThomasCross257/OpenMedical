// Display Patient prescriptions.

// Display Patient version of OpenPortal
import { useState } from 'react';
import PrescriptionTable from '../components/prescriptionTable.tsx';

function PrescriptionPage() {
    const [isDoctor, setIsDoctor] = useState(false);
    
    return (
        <div className="container">
            <button 
                className="btn btn-primary" 
                onClick={() => setIsDoctor(!isDoctor)}>
                <h6>View</h6> {isDoctor ? <h6>Patient</h6> : <h6>Doctor</h6>} <h6>Prescription page</h6>
            </button>
            <PrescriptionTable isDoctorView={isDoctor}/>
        </div>
    );
    }

export default PrescriptionPage;