import { useState } from 'react';
import PatientRecords from '../components/patientRecords';

function ViewAllRecords()  {
    const [] = useState(0);

    return(
        <div className='container'>
            <PatientRecords />
        </div>
    )
}

export default ViewAllRecords;