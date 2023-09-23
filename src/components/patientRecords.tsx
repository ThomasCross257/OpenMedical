import { useState } from 'react';

function PatientRecords() {
    const [] = useState(0);

    return(
        <div>
            <div className="d-flex justify-content-between">
                <h1>Patient Name Records</h1>
                <img src="https://via.placeholder.com/150" alt="Patient Name" />
            </div>
            <p>Last Visited: 2023-08-05</p>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Document Name</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Document 1</td>
                        <td>2023-08-05</td>
                        <td>Checkup</td>
                        <td>Checkup</td>
                        <td>
                            <button className="btn btn-primary btn-sm">View</button> 
                            <button className="btn btn-secondary btn-sm">Download</button>
                            <button className="btn btn-success btn-sm">Update</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Document 2</td>
                        <td>2023-08-05</td>
                        <td>Checkup</td>
                        <td>Checkup</td>
                        <td>
                            <button className="btn btn-primary btn-sm">View</button>
                            <button className="btn btn-secondary btn-sm">Download</button>
                            <button className="btn btn-success btn-sm">Update</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Document 3</td>
                        <td>2023-08-05</td>
                        <td>Checkup</td>
                        <td>Checkup</td>
                        <td>
                            <button className="btn btn-primary btn-sm">View</button>
                            <button className="btn btn-secondary btn-sm">Download</button>
                            <button className="btn btn-success btn-sm">Update</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default PatientRecords;