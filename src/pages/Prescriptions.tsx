import PrescriptionTable from '../components/prescriptionTable.tsx';
import { getUserInfoFromToken } from '../assets/func/userFunc.ts';


function PrescriptionPage() {
    const info = getUserInfoFromToken();
    const role = info?.role;
    return (
        <div className="container">
            <PrescriptionTable />
        </div>
    );
}

export default PrescriptionPage;