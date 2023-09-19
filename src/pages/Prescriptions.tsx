// Display Patient prescriptions.

// Display Patient version of OpenPortal
import { useState } from 'react';
import PatientPrescriptions from '../components/patientPrescriptions.tsx';

function PrescriptionPage() {
    const [] = useState(0);
    
    return (
        <PatientPrescriptions/>
    );
    }

export default PrescriptionPage;