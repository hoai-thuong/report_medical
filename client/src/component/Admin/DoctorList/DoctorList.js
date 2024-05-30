import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../PatientList/Header';
import Sidebars from '../../Sidebar';
import styles from './DoctorList.module.css'; // Import CSS Module

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState({
    _id: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    department: ''
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('/api/doctors');
        setDoctors(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching doctors');
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleEditClick = (doctor) => {
    setCurrentDoctor(doctor);
    setEditModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentDoctor((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdateDoctor = async () => {
    try {
      await axios.put(`/api/doctor/${currentDoctor._id}`, currentDoctor);
      const updatedDoctors = doctors.map((doctor) =>
        doctor._id === currentDoctor._id ? currentDoctor : doctor
      );
      setDoctors(updatedDoctors);
      setEditModalOpen(false);
    } catch (err) {
      setError('Error updating doctor');
    }
  };

  const handleCloseModal = (e) => {
    if (e.target.className.includes(styles.modal)) {
      setEditModalOpen(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ display: 'flex', overflowY: 'auto', width: '100%' }}>
      <div>
        <Sidebars />
      </div>
      <div style={{ flex: 1 }}>
        <Header />
        <div style={{ padding: '20px' }}>
          <h2>Danh sách bác sĩ</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Khoa</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor._id}>
                  <td>{doctor.fullName}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.phoneNumber}</td>
                  <td>{doctor.department}</td>
                  <td>
                    <button onClick={() => handleEditClick(doctor)}>Sửa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {editModalOpen && (
        <div className={styles.modal} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>Sửa thông tin bác sĩ</h3>
            <div className={styles.formGroup}>
              <label htmlFor="fullName">Tên</label>
              <input
                type="text"
                name="fullName"
                value={currentDoctor.fullName}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={currentDoctor.email}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phoneNumber">Số điện thoại</label>
              <input
                type="text"
                name="phoneNumber"
                value={currentDoctor.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="department">Khoa</label>
              <input
                type="text"
                name="department"
                value={currentDoctor.department}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.buttonContainer}>
              <button onClick={handleUpdateDoctor}>Cập nhật</button>
              <button onClick={() => setEditModalOpen(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorList;
