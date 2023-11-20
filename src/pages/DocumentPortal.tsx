// Display Patient version of OpenPortal
import { useState } from 'react';

import DoctorMedicalDocuments from '../components/dashboard/doctorDocPortal.tsx';
import PatientMedicalDocuments from '../components/dashboard/patientDocPortal.tsx';
import { getUserInfoFromToken } from '../assets/func/userFunc.ts';

const DocumentPortal = () => {
    const info = getUserInfoFromToken();
    const role = info?.role;

    if (role !== 'Doctor' && role !== 'Patient') {
        return <h1 style={{ textAlign: 'center' }}>Access Denied</h1>;
    }

    return (
        <div className="container">
            {role === 'Patient' ? (
                <PatientMedicalDocuments />
            ) : (
                <DoctorMedicalDocuments />
            )}
        </div>
    );
}

export default DocumentPortal;