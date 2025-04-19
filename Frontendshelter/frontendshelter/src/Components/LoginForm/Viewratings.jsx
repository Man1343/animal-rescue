import React, { useState, useEffect } from 'react';
import './template.css';
import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import axios from 'axios';
import Constant from '../../Constant';
import ReactStars from 'react-rating-stars-component';  // Import ReactStars

const Viewratings = () => {
  const [values, setValues] = useState({});
  const [mydata, setMyData] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: [event.target.value] });

    const selectedOption = event.target.value;
    // Redirect based on the selected option
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

  useEffect(() => {
    axios.get(Constant.URLs.ApiUrl + '/Ratingss').then((res) => {
      console.log(res.data);
      setMyData(res.data);
    });
  }, []);

  return (
    <div>
      <link href="img/favicon.ico" rel="icon" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins&family=Roboto:wght@700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
        rel="stylesheet"
      />
      <link href="lib/flaticon/font/flaticon.css" rel="stylesheet" />
      <link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet" />
      <link href="css/bootstrap.min.css" rel="stylesheet" />
      <link href="css/template.css" rel="stylesheet" />

      <div>
        <nav class="navbar navbar-expand-lg bg-white navbar-light shadow-sm py-3 py-lg-0 px-3 px-lg-0">
          <a href="/Navbar" class="navbar-brand ms-lg-5">
            <h1 class="m-0 text-uppercase text-dark">
              <i class="bi bi-shop fs-1 text-primary me-3"></i>Paw Protectors
            </h1>
          </a>

          <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav ms-auto py-0">
              <Link to="/Navbar" class="nav-item nav-link ">
                Home
              </Link>
              <Link to="/about" className="nav-item nav-link ">
                about
              </Link>
              <Link to="/Contact" class="nav-item nav-link">
                Contact
              </Link>
              <select
                onChange={handleChange}
                className="nav-item nav-link"
                style={{ border: 'none' }}
              >
                <option value="option1">Select Your Option</option>
                <option value="option2">View Emergency</option>
                <option value="option3">Adotion Post</option>
                <option value="option5">Shelter Profile</option>
              </select>
            </div>
            <Link to="/" class="nav-item nav-link">
              <MdLogout className="ommm" />
            </Link>
          </div>
        </nav>
      </div>

      <div>
        <div className="em">
          <div className="emerr">
            <center>
              <table style={{ color: 'black' }} border={'3px'} width={'80%'}>
                <thead>
                  <tr>
                    <th className="emer">Email</th>
                    <th className="emer" colSpan={4}>Ratings</th>
                  </tr>
                </thead>
                <tbody>
                  {mydata.map((data, index) => (
                    <tr key={index}>
                      <td className="emer">{data.email}</td>
                      <td className="emer">
                        Adoption
                        <ReactStars
                          count={5}
                          value={Number(data.adoption_rating)}  
                          size={24}
                          activeColor="#ffd700"
                          edit={false}  
                        />
                      </td>
                      <td className="emer">
                        Emergency
                        <ReactStars
                          count={5}
                          value={Number(data.emergency_rating)}  
                          size={24}
                          activeColor="#ffd700"
                          edit={false}  
                        />
                      </td>
                      <td className="emer">
                        Petstore
                        <ReactStars
                          count={5}
                          value={Number(data.petstore_rating)}  
                          size={24}
                          activeColor="#ffd700"
                          edit={false}  
                        />
                      </td>
                      <td className="emer">
                        Shelter
                        <ReactStars
                          count={5}
                          value={Number(data.shelter_rating)}  
                          size={24}
                          activeColor="#ffd700"
                          edit={false}  
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </center>
          </div>
        </div>
      </div>

      {/* Rest of the footer and other code remains unchanged */}
    </div>
  );
};

export default Viewratings;
