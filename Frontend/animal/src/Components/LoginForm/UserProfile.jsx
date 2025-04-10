import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Constant from '../../Constant';
import { MdLogout } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const email = localStorage.getItem('userEmail');

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // Use null to track loading state

  useEffect(() => {
    axios.get(`${Constant.URLs.ApiUrl}/user-details/${email}`)
      .then(res => {
        setUserData(res.data);
      })
      .catch(err => console.log(err));
  }, [email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleChanged = (event) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
      case 'option2': 
        navigate('/Reportemergency'); 
        break;
      case 'option3': 
        navigate('/Adoptionpost'); 
        break;
      case 'option4': 
        navigate('/Adoptionview'); 
        break;
      case 'option5': 
        navigate('/Petstore'); 
        break;
      case 'option6': 
        navigate('/Userorders'); 
        break;
      case 'option7': 
        navigate('/Ratings'); 
        break;
      case 'option8': 
        navigate('/Userprofile'); 
        break;
      default: 
        break;
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!userData.name || !userData.phone || userData.name.trim() === '' || userData.phone.trim() === '') {
      alert('Name and mobile number cannot be empty.');
      return;
    }
    axios.put(`${Constant.URLs.ApiUrl}/update-user/${email}`, userData)
      .then(() => {
        alert('Your details have been updated successfully.');
      })
      .catch(err => {
        console.log(err);
        alert('Failed to update. Please try again.')
      });
  };

  return (
    <div>
      <link href="img/favicon.ico" rel="icon"/>
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Poppins&family=Roboto:wght@700&display=swap" rel="stylesheet"/>  
      <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet"/>
      <link href="lib/flaticon/font/flaticon.css" rel="stylesheet"/>
      <link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet"/>
      <link href="css/bootstrap.min.css" rel="stylesheet"/>
      <link href="css/template.css" rel="stylesheet"/>
    <div>
      
      <nav class="navbar navbar-expand-lg bg-white navbar-light shadow-sm py-3 py-lg-0 px-3 px-lg-0">
              <a href="/Navbar" class="navbar-brand ms-lg-5">
              <h1 class="m-0 text-uppercase text-dark"><i class="bi bi-shop fs-1 text-primary me-3"></i>Paw Protectors</h1>
                </a>
  
          
          <div class="collapse navbar-collapse" id="navbarCollapse">
              <div class="navbar-nav ms-auto py-0">
              <Link to ='/Navbar' class="nav-item nav-link ">Home</Link>
              <Link to ='/about' className='nav-item nav-link '>about</Link>
              <Link to ='/Contact' class="nav-item nav-link">Contact</Link>
              <select onChange={handleChanged} className='nav-item nav-link' style={{border: "none"}}>
                <option value="option1" className='nav-item nav-link'>Select Your Option</option>
                {/* <option value="option2" className='nav-item nav-link'>Report Emergency</option> */}
                {/* <option value="option3" className='nav-item nav-link'>Adotion Post</option> */}
                <option value="option4" className='nav-item nav-link'>Adoption View</option>
                <option value="option5" className='nav-item nav-link'>Petstore</option>
                <option value="option6" className='nav-item nav-link'>Orders</option>
                <option value="option7" className='nav-item nav-link'>Ratings</option>
                {/* <option value="option8" className='nav-item nav-link'>User Profile</option> */}
              </select>
          </div>
              <Link to ='/' class="nav-item nav-link"><MdLogout className='ommm'/></Link>
          </div>
      </nav>
      </div>

      <div className="container mt-5">
        <h2>User Profile</h2>
        {userData ? (
          <form onSubmit={handleUpdate}>
            <div className="form-group mb-3">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                disabled
              />
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
            <button type="submit" className="btn btn-primary">Update</button>
          </form>
        ) : (
          <p>Loading your profile...</p>
        )}
      </div>

    <div class="container-fluid bg-light mt-5 py-5">
            <div class="container pt-5">
                <div class="row g-5">
                   
                    <div class="col-lg-3 col-md-6">
                        <h5 class="text-uppercase border-start border-5 border-primary ps-3 mb-4">Quick Links</h5>
                        <div class="d-flex flex-column justify-content-start">
                            <Link to ='/Navbar' class="text-body mb-2" ><i class="bi bi-arrow-right text-primary me-2"></i>Home</Link>
                            <Link to ='/About' class="text-body mb-2" ><i class="bi bi-arrow-right text-primary me-2"></i>About Us</Link>
                            <p class="text-body mb-2"><i class="bi bi-arrow-right text-primary me-2"></i>Our Services</p>
                            <Link to = '/Contact' class="text-body" ><i class="bi bi-arrow-right text-primary me-2"></i>Contact Us</Link>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <h5 class="text-uppercase border-start border-5 border-primary ps-3 mb-4">Popular Links</h5>
                        <div class="d-flex flex-column justify-content-start">
                            <Link to = '/Navbar' class="text-body mb-2" ><i class="bi bi-arrow-right text-primary me-2"></i>Home</Link>
                            <Link to ='/About' class="text-body mb-2"><i class="bi bi-arrow-right text-primary me-2"></i>About Us</Link>
                            <p class="text-body mb-2"><i class="bi bi-arrow-right text-primary me-2"></i>Our Services</p>
                          
                            <Link to ='/Contact' class="text-body" ><i class="bi bi-arrow-right text-primary me-2"></i>Contact Us</Link>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        
                        <h6 class="text-uppercase mt-4 mb-3">Follow Us</h6>
                        <div class="d-flex">
                            <a href='https://twitter.com/' class="btn btn-outline-primary btn-square me-2" ><i class="bi bi-twitter"></i></a>
                            <a href='https://www.facebook.com/' class="btn btn-outline-primary btn-square me-2" ><i class="bi bi-facebook"></i></a>
                            <a href='https://in.linkedin.com/' class="btn btn-outline-primary btn-square me-2" ><i class="bi bi-linkedin"></i></a>
                            <a href='https://www.instagram.com/' class="btn btn-outline-primary btn-square" ><i class="bi bi-instagram"></i></a>
                        </div>
                    </div>
                    <div class="col-12 text-center text-body">
                        <p class="text-body" >Terms & Conditions | Privacy Policy | Customer Support | Help | FAQs</p>
                     
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid bg-dark text-white-50 py-4">
            <div class="container">
                <div class="row g-5">
                <div class="col-md-6 text-center text-md-start">
                        <center><p class="mb-md-0" style={{color: "white"}}>&copy;Paw Protectors . All Rights Reserved.</p></center>
                    </div>
                 
                </div>
            </div>
        </div>  
    </div>
  );
};

export default UserProfile;
