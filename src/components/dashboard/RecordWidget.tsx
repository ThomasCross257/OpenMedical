// Display Patient version of OpenPortal
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RecordWidget() {
    const navigate = useNavigate();

    const navigateToDocumentPortal = () => {
        navigate('/DocumentPortal');
    }
  const [] = useState(0);
  return (
    <div className="card mt-5">
            <div className="card-header">
                <h5>Patient Records</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="card-title">Back Scan</h5>
                            <p className="card-text">Date: 10/9/2021</p>
                            <p className="card-text">Time: 11:30 AM</p>
                            <p className="card-text">Doctor: Dr. Challus Mercer</p>
                        </div>
                        <button className="btn btn-info">Results</button>
                    </div>
                </li>
            </ul>
            <div className="card-footer text-center">
                <button className="btn btn-primary" onClick={navigateToDocumentPortal}>View All</button>
            </div>
        </div>
  );
}

export default RecordWidget;
