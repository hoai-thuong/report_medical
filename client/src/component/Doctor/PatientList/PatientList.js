import React, { useState, useEffect } from 'react';
import Sidebars from '../../Doctor/Sidebar';
import axios from 'axios';
// import './styles.css'; // Import CSS file
import Modal from 'react-bootstrap/Modal';
import Header from "../../Admin/PatientList/Header";


function PatientList() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [testResults, setTestResults] = useState(null);
  console.log("testResults", testResults);
  useEffect(() => {
    axios.get('/api/hl7_messages')
      .then(response => {
        setPatients(response.data);
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
      });
  }, []);

  function getPatientInfo(patient) {
    if (patient && patient.PID && patient.PID[0]) {
      const pid = patient.PID[0];
      return {
        id: pid[Object.keys(pid).find(key => key.startsWith('PID_1'))] || '',
        internalId: pid[Object.keys(pid).find(key => key.startsWith('PID_3'))] || '',
        name: pid[Object.keys(pid).find(key => key.startsWith('PID_5'))] || '',
        dob: pid[Object.keys(pid).find(key => key.startsWith('PID_7'))] || '',
        sex: pid[Object.keys(pid).find(key => key.startsWith('PID_8'))] || ''
      };
    } else if (patient && patient.ORU_R01_PATIENT && patient.ORU_R01_PATIENT[0]) {
      const oruPatient = patient.ORU_R01_PATIENT[0];
      return {
        id: oruPatient[Object.keys(oruPatient).find(key => key.startsWith('PID_2'))] || '',
        name: oruPatient[Object.keys(oruPatient).find(key => key.startsWith('PID_5'))] || '',
        dob: oruPatient[Object.keys(oruPatient).find(key => key.startsWith('PID_7'))] || '',
        sex: oruPatient[Object.keys(oruPatient).find(key => key.startsWith('PID_8'))] || ''
      };
    } else {
      return {};
    }
  }
  


  const formatDateString = (dateString) => {
    if (/^\d{8}$/.test(dateString)) {
      const year = dateString.substring(0, 4);
      const month = dateString.substring(4, 6);
      const day = dateString.substring(6, 8);
      return `${year}-${month}-${day}`;
    } else {
      return dateString;
    }
  };
  
  
  const viewPatientDetails = async (patientId) => {
    try {
      const response = await axios.get(`/api/patient/${patientId}`);
      setTestResults(response.data.ORU_R01_OBSERVATION);
    } catch (error) {
      console.error('Error fetching test results:', error);
    }
  };

  const closeModal = () => {
    setTestResults(null);
  };

  const filteredPatients = patients.filter(patient =>
    Object.values(getPatientInfo(patient)).some(value =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (

    <div style={{ display: 'flex', overflowY: 'auto', width: '100%' }}>
      <div >
        <Sidebars />
      </div>
      <div style={{ flex: 1 }}>
        <Header />
        <div style={{ height: '100vh', overflow: 'scroll initiali', width: '70%', marginTop: "40px", marginLeft: "60px"}}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ marginBottom: '10px', padding: '8px', width: '100%', boxSizing: 'border-box' }}
        />
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Ngày sinh</th>
              <th>Giới tính</th>
              <th>Chi tiết </th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map(patient => (
              <tr key={patient._id} className="table-row">
                <td>{getPatientInfo(patient).id}</td>
                <td>{getPatientInfo(patient).name}</td>
                <td>{formatDateString(getPatientInfo(patient).dob)}</td>
                <td>{getPatientInfo(patient).sex}</td>
                <td>
                  <button onClick={() => viewPatientDetails(patient._id)}>Kết quả xét nghiệm</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {testResults && (
        <Modal show={true} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Kết quả xét nghiệm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table>
              <thead>
                <tr>
                  <th>Loại xét nghiệm</th>
                  <th>Giá trị</th>
                  <th>Đơn vị</th>
                  <th>Giới hạn tham chiếu</th>
                  <th>Xác suất</th>
                </tr>
              </thead>
              <tbody>
                {testResults.map((result, index) => (
                  <tr key={index}>
                    <td>{result['OBX_3 - OBSERVATION_IDENTIFIER']}</td>
                    <td>{result['OBX_5 - OBSERVATION_VALUE']}</td>
                    <td>{result['OBX_6 - UNITS']}</td>
                    <td>{result['OBX_7 - REFERENCES_RANGE']}</td>
                    <td>{result['OBX_9 - PROBABILITY']}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Modal.Body>
        </Modal>
      )}
      </div>
    </div>

  );


}

export default PatientList;
