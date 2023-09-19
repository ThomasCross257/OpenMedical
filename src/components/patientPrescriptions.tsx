import { useState } from 'react';


function PatientPrescriptions() {
    const [] = useState(0);
    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">PatientName</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Prescription</th>
                                <th scope="col">Date</th>
                                <th scope="col">Doctor</th>
                                <th scope="col">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Medicine</td>
                                <td>01/01/1969</td>
                                <td>Dr. John Smith</td>
                                <td><button type="button" className="btn btn-primary">View</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default PatientPrescriptions;