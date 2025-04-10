import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Constant from '../../Constant';
import { MdLogout } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

const ShelterProfile = () => {
  const email = localStorage.getItem('shelterEmail');
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [values, setValues] = useState({});

  useEffect(() => {
    axios.get(`${Constant.URLs.ApiUrl}/shelter-details/${email}`)
      .then(res => setUserData(res.data))
      .catch(err => console.log(err));
  }, [email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleChanged = (event) => {
    setValues({ ...values, [event.target.name]: [event.target.value] });

    const selectedOption = event.target.value;
    switch (selectedOption) {
      case 'option2':
        navigate('/Viewemergency');
        break;
      case 'option3':
        navigate('/Adoptionpost');
        break;
      case 'option4':
        navigate('/Viewratings');
        break;
      case 'option5':
        navigate('/Shelterprofile');
        break;
      default:
        break;
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!userData.name || !userData.phone || userData.name.trim() === '' || userData.phone.trim() === '' || userData.address.trim() === '') {
      alert('Name, mobile number and address cannot be empty.');
      return;
    }
    axios.put(`${Constant.URLs.ApiUrl}/update-shelter/${email}`, userData)
      .then(() => alert('Your details have been updated successfully.'))
      .catch(err => {
        console.log(err);
        alert('Failed to update. Please try again.');
      });
  };

  return (
    <div>
      <link href="img/favicon.ico" rel="icon" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins&family=Roboto:wght@700&display=swap" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet" />
      <link href="lib/flaticon/font/flaticon.css" rel="stylesheet" />
      <link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet" />
      <link href="css/bootstrap.min.css" rel="stylesheet" />
      <link href="css/template.css" rel="stylesheet" />

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow-sm py-3 py-lg-0 px-3 px-lg-0">
        <a href="/Navbar" className="navbar-brand ms-lg-5">
          <h1 className="m-0 text-uppercase text-dark"><i className="bi bi-shop fs-1 text-primary me-3"></i>Paw Protectors</h1>
        </a>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0">
            <Link to='/Navbar' className="nav-item nav-link">Home</Link>
            <Link to='/about' className='nav-item nav-link'>About</Link>
            <Link to='/Contact' className="nav-item nav-link">Contact</Link>
            <select onChange={handleChanged} className='nav-item nav-link' style={{ border: "none" }}>
              <option value="option1">Select Your Option</option>
              <option value="option2">View Emergency</option>
              <option value="option3">Adoption Post</option>
              <option value="option4">View Ratings</option>
              {/* <option value="option5">Shelter Profile</option> */}
            </select>
          </div>
          <Link to='/' className="nav-item nav-link"><MdLogout className='ommm' /></Link>
        </div>
      </nav>

      {/* Shelter Profile Form */}
      <div className="container mt-5">
        <h2>Shelter Profile</h2>
        {userData ? (
          <form onSubmit={handleUpdate}>
            <div className="form-group mb-3">
              <label>Email:</label>
              <input type="email" className="form-control" value={email} disabled />
            </div>
            <div className="form-group mb-3">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={userData.name || ''}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group mb-3">
              <label>Mobile Number:</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={userData.phone || ''}
                onChange={handleChange}
                placeholder="Enter your mobile number"
              />
            </div>
            <div className="form-group mb-3">
            <label>Address:</label>
            <input
                type="text"
                className="form-control"
                name="address"
                value={userData.address || ''}
                onChange={handleChange}
                placeholder="Enter your address"
            />
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
          </form>
        ) : (
          <p>Loading your profile...</p>
        )}
      </div>

      {/* Footer */}
      <div className="container-fluid bg-light mt-5 py-5">
        <div className="container pt-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <h5 className="text-uppercase border-start border-5 border-primary ps-3 mb-4">Quick Links</h5>
              <div className="d-flex flex-column justify-content-start">
                <Link to='/Navbar' className="text-body mb-2"><i className="bi bi-arrow-right text-primary me-2"></i>Home</Link>
                <Link to='/About' className="text-body mb-2"><i className="bi bi-arrow-right text-primary me-2"></i>About Us</Link>
                <p className="text-body mb-2"><i className="bi bi-arrow-right text-primary me-2"></i>Our Services</p>
                <Link to='/Contact' className="text-body"><i className="bi bi-arrow-right text-primary me-2"></i>Contact Us</Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="text-uppercase border-start border-5 border-primary ps-3 mb-4">Popular Links</h5>
              <div className="d-flex flex-column justify-content-start">
                <Link to='/Navbar' className="text-body mb-2"><i className="bi bi-arrow-right text-primary me-2"></i>Home</Link>
                <Link to='/About' className="text-body mb-2"><i className="bi bi-arrow-right text-primary me-2"></i>About Us</Link>
                <p className="text-body mb-2"><i className="bi bi-arrow-right text-primary me-2"></i>Our Services</p>
                <Link to='/Contact' className="text-body"><i className="bi bi-arrow-right text-primary me-2"></i>Contact Us</Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h6 className="text-uppercase mt-4 mb-3">Follow Us</h6>
              <div className="d-flex">
                <a href='https://twitter.com/' className="btn btn-outline-primary btn-square me-2"><i className="bi bi-twitter"></i></a>
                <a href='https://www.facebook.com/' className="btn btn-outline-primary btn-square me-2"><i className="bi bi-facebook"></i></a>
                <a href='https://in.linkedin.com/' className="btn btn-outline-primary btn-square me-2"><i className="bi bi-linkedin"></i></a>
                <a href='https://www.instagram.com/' className="btn btn-outline-primary btn-square"><i className="bi bi-instagram"></i></a>
              </div>
            </div>
            <div className="col-12 text-center text-body">
              <p className="text-body">Terms & Conditions | Privacy Policy | Customer Support | Help | FAQs</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-dark text-white-50 py-4">
        <div className="container">
          <div className="row g-5">
            <div className="col-md-6 text-center text-md-start">
              <center>
                <p className="mb-md-0 text-white">&copy; Paw Protectors. All Rights Reserved.</p>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelterProfile;
