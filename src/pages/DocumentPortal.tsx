// Display Patient version of OpenPortal
import { useState } from 'react';

import DoctorMedicalDocuments from '../components/doctorMedicalDash.tsx';
import PatientMedicalDocuments from '../components/dashboard/patientMedicalDash.tsx';

const DocumentPortal = () => {
    const [isDoctor, setIsDoctor] = useState(false);
    
    return (
        <div className="container">
        <h1 className="my-4">Medical Documents</h1>
        <div className="mb-4">
            <button
            className="btn btn-primary"
            onClick={() => setIsDoctor(false)}
            >
            View Patient Medical Documents
            </button>
            <button
            className="btn btn-primary ms-3"
            onClick={() => setIsDoctor(true)}
            >
            View Doctor Medical Documents
            </button>
        </div>
        {isDoctor ? <DoctorMedicalDocuments /> : <PatientMedicalDocuments />}
        </div>
    );
    }

export default DocumentPortal;