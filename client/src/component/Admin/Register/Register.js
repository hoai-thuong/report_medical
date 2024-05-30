import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../PatientList/Header';
import Sidebars from '../../Sidebar';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    role: '',
    department: ''
  });
  const [message, setMessage] = useState('');
  const [isDoctorRole, setIsDoctorRole] = useState(false); // State to track if the role is "Doctor"
  const [departments, setDepartments] = useState([]); // State to hold department list

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('/api/departments');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Handle checkbox
    if (type === 'checkbox') {
      if (value === 'admin' && checked) {
        setFormData(prevState => ({
          ...prevState,
          role: 'admin',
          department: 'null' // Clear department when admin is selected
        }));
        setIsDoctorRole(false); // Set isDoctorRole to false when admin is selected
      } else {
        setFormData(prevState => ({
          ...prevState,
          role: checked ? value : '',
          department: checked && value === 'bác sĩ' ? '' : formData.department
        }));
        setIsDoctorRole(value === 'bác sĩ' && checked); // Set isDoctorRole to true when "Bác sĩ" is selected
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflowY: 'auto', width: '100%' }}>
      <div>
        <Sidebars />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div className="register-container">
          <div className="register-card">
            <h2 className="register-title">Đăng ký tài khoản</h2>
            <form onSubmit={handleSubmit} className="register-form">
              <div className="left-group">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" name="username" id="username" placeholder="Enter your username" value={formData.username} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input type="text" name="fullName" id="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input type="text" name="phoneNumber" id="phoneNumber" placeholder="Enter your phone number" value={formData.phoneNumber} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="right-group">
                <div className="form-group">
                  <label>Role</label>
                  <div>
                    <label>
                      <input type="checkbox" name="role" value="admin" checked={formData.role === 'admin'} onChange={handleChange} /> Admin
                    </label>
                    <label>
                      <input type="checkbox" name="role" value="bác sĩ" checked={formData.role === 'bác sĩ'} onChange={handleChange} /> Bác sĩ
                    </label>
                  </div>
                </div>
                {isDoctorRole && (
                  <div className="form-group">
                    <label htmlFor="department">Department</label>
                    <select
                      name="department"
                      id="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept._id} value={dept.name}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <button type="submit" className="register-button">Register</button>
              </div>
            </form>
            {message && <p className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
