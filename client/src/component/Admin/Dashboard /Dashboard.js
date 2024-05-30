import React from 'react';
import Header from '../PatientList/Header';
import Sidebars from '../../Sidebar';

function Dashboard() {
  return (
    <div style={{ display: 'flex', overflowY: 'auto', width: '100%' }}>
      <div >
        <Sidebars />
      </div>
      <div style={{ flex: 1 }}>
        <Header />
        {/* code here */}
      </div>
    </div>
  );
}

export default Dashboard;
