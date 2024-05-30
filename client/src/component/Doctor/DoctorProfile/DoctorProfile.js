import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardText, MDBTypography, MDBIcon } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Admin/PatientList/Header';
import Sidebars from '../Sidebar';

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const username = localStorage.getItem('username'); // Retrieve username from local storage
        const response = await axios.get(`/api/doctors/${username}`);
        setDoctor(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error retrieving doctor information');
        setLoading(false);
      }
    };

    fetchDoctor();
  }, []);

  return (
    <div style={{ display: 'flex', overflowY: 'auto', width: '100%' }}>
      <Sidebars />
      <div style={{ flex: 1 }}>
        <Header />
        <ToastContainer position="bottom-right" autoClose={2000} />
        <MDBContainer className="py-5">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <MDBRow className="justify-content-center align-items-center">
              {doctor && (
                <MDBCol lg="4" className="mb-4 mb-lg-0">
                  <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                    <MDBCardBody className="p-4">
                      <MDBTypography style={{ fontWeight: 'bold' }} tag="h4">
                        {doctor.fullName}
                      </MDBTypography>
                      <hr style={{ borderTop: '2px solid black' }} className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="12" className="mb-3">
                          <MDBTypography tag="h6" style={{ fontWeight: 'bold' }}>
                            Email
                          </MDBTypography>
                          <MDBCardText className="text-muted">{doctor.email}</MDBCardText>
                        </MDBCol>
                        <MDBCol size="12" className="mb-3">
                          <MDBTypography tag="h6" style={{ fontWeight: 'bold' }}>
                            Phone Number
                          </MDBTypography>
                          <MDBCardText className="text-muted">{doctor.phoneNumber}</MDBCardText>
                        </MDBCol>
                        <MDBCol size="12" className="mb-3">
                          <MDBTypography tag="h6" style={{ fontWeight: 'bold' }}>
                            Department
                          </MDBTypography>
                          <MDBCardText className="text-muted">{doctor.department}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <div className="d-flex justify-content-start">
                        <MDBIcon far icon="edit mb-5" />
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              )}
            </MDBRow>
          )}
        </MDBContainer>
      </div>
    </div>
  );
};

export default DoctorProfile;
