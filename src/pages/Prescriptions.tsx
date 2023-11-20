import PrescriptionTable from '../components/prescriptionTable.tsx';
import { getUserInfoFromToken } from '../assets/func/userFunc.ts';


function PrescriptionPage() {
    const info = getUserInfoFromToken();
    const role = info?.role;

    if (role !== 'Doctor' && role !== 'Patient') {
        return <h1 style={{ textAlign: 'center' }}>Access Denied</h1>;
    }
    return (
        <div className="container">
            <PrescriptionTable />
        </div>
    );
}

export default PrescriptionPage;