import { useState, useEffect } from 'react';
import AppointmentWidget from '../components/dashboard/AppointmentWidget.tsx';
import RecentAppWidget from '../components/dashboard/RecentAppWidget.tsx';
import { getUserInfoFromToken } from '../assets/func/userFunc.ts';

function PatientDash() {
  const [userID, setUserID] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  const info = getUserInfoFromToken();
  const ID = info?.ID;
  const role = info?.role;
  const userName = info?.name;
  // console.log(info);
  useEffect(() => {

    setUserID(ID ?? null);
    setUserRole(role ?? null);
    setName(userName ?? null);
  }, []); // Mimics component mount

  if (role !== 'Doctor' && role !== 'Patient') {
    return <h1 style={{ textAlign: 'center' }}>Access Denied</h1>;
  }


  return (
    <div className="container">
      <br />
      <h1>Welcome {name}</h1>
      <div className="row">
        <div className="col md-6">
          <AppointmentWidget />
        </div>
        <div className="col md-6">
          <RecentAppWidget />
        </div>
      </div>
    </div>
  );
}

export default PatientDash;
