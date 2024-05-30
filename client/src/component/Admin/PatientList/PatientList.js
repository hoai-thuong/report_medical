import React, { useState, useEffect } from 'react';
import Sidebars from '../../Sidebar';
import axios from 'axios';
import './styles.css'; // Import CSS file
import Modal from 'react-bootstrap/Modal';
import Header from './Header';

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
    if (patient && patient.ORU_R01 && patient.ORU_R01['ORU_R01.PATIENT_RESULT']) {
      const patientResult = patient.ORU_R01['ORU_R01.PATIENT_RESULT'];
      const patientData = patientResult.find(pr => pr['ORU_R01.PATIENT'] !== undefined);

      if (patientData) {
        const pid = patientData['ORU_R01.PATIENT'].PID;
        return {
          id: pid['PID.1'] || '',
          internalId: pid['PID.2'] ? pid['PID.2']['CX.1'] : '',
          name: `${pid['PID.5']['XPN.1']['FN.1']} ${pid['PID.5']['XPN.2']} ${pid['PID.5']['XPN.3']}` || '',
          dob: pid['PID.7'] ? pid['PID.7']['TS.1'] : '',
          sex: pid['PID.8'] || ''
        };
      }
    }
    return {};
  }

  const formatDateString = (dateString) => {
    if (/^\d{8}$/.test(dateString)) {
      const year = dateString.substring(0, 4);
      const month = dateString.substring(4, 6);
      const day = dateString.substring(6, 8);
      return `${year}-${month}-${day}`;
    } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
      const [day, month, year] = dateString.split('/');
      return `${year}-${month}-${day}`;
    } else {
      return dateString;
    }
  };

  const viewPatientDetails = async (patientId) => {
    try {
      const response = await axios.get(`/api/patient/${patientId}`);
      const patientResult = response.data.ORU_R01['ORU_R01.PATIENT_RESULT'];
      const observationData = patientResult.find(pr => pr['ORU_R01.ORDER_OBSERVATION']);
      const observations = observationData ? observationData['ORU_R01.ORDER_OBSERVATION']['ORU_R01.OBSERVATION'] : [];
      setTestResults(observations.map(obs => obs.OBX));
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
      <div>
        <Sidebars />
      </div>
      <div style={{ flex: 1 }}>
        <Header />
        <div style={{ height: '100vh', overflow: 'scroll', width: '70%', marginTop: "40px", marginLeft: "60px" }}>
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
                      <td>{result['OBX.3']['CE.2']}</td>
                      <td>{result['OBX.5']}</td>
                      <td>{result['OBX.6']['CE.1']}</td>
                      <td>{result['OBX.7']}</td>
                      <td>{result['OBX.9']}</td>
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
