import React, { useState, useEffect } from 'react';
import './styles.css'; // Import CSS file
import { Link, useNavigate } from "react-router-dom"; // Sử dụng useNavigate thay vì useHistory

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState('');

  const navigate = useNavigate(); // Sử dụng useNavigate thay vì useHistory

  useEffect(() => {
    // Lấy username từ localStorage khi component được tạo ra
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // Xóa username từ localStorage khi người dùng đăng xuất
    console.log('Logging out...');
    navigate('/login'); 
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ padding: '0', marginBottom: '0' }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/" style={{ padding: '30px' }} >
          </a>
          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <button
                  className="btn  dropdown-toggle" style = {{color:"fff"}}
                  type="button"
                  id="dropdownMenuButton"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {username} {/* Hiển thị tên người dùng từ localStorage */}
                </button>
                <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt"></i> Sign Out
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
