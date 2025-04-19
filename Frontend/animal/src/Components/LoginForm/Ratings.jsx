import React, {useState, useEffect} from 'react'
import ReactStars from "react-rating-stars-component";
// import { FaStar } from 'react-icons/fa'
import { Link,useNavigate } from 'react-router-dom'
import { MdLogout } from "react-icons/md";
import Constant from '../../Constant';
import axios from 'axios';

const Ratings = () => {
    // const [values, setValues] = useState({
    //     email: '',
    //     feedback: ''
        
    // })
   
    const [values, setValues] = useState({
        email: '',
        adoption: 0,
        emergency: 0,
        petstore: 0,
        shelter: 0,
      });
      
    //   const handleStarChange = (event) => {
    //     const { name, value } = event.target;
    //     setValues(prev => ({ ...prev, [name]: parseInt(value) }));
    //   };
      
  
    const navigate = useNavigate();

    useEffect(() => {
        const storedEmail = localStorage.getItem("userEmail");
        if (storedEmail) {
          setValues((prev) => ({ ...prev, email: storedEmail }));
        }
      }, []);

    // const handleInput = (event) => {
    //     setValues (prev => ({...prev,[event.target.name]: event.target.value}))
    // }

    const handleChange = (event) => {
        const selectedOption = event.target.value;
        // Redirect based on the selected option
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
            navigate('/Userprofile');
            break;
          default:
            break;
        }
      }
      const handleSubmit = (event) => {
        event.preventDefault();
       
            axios.post(Constant.URLs.ApiUrl + '/ratings', values)
            .then (res => {
                if(res.err === "submit successfully")
                {
                   alert ("error")
                }
                else{
                    alert ("Submitted")
                    navigate('/Navbar')
                }
            })
            .catch (errors => console.log(errors));
        

       
    }

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
         <nav class="navbar navbar-expand-lg bg-white navbar-light shadow-sm py-3 py-lg-0 px-3 px-lg-0">
            <a href="/Navbar" class="navbar-brand ms-lg-5">
            <h1 class="m-0 text-uppercase text-dark"><i class="bi bi-shop fs-1 text-primary me-3"></i>Paw Protectors</h1>
             </a>

       
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav ms-auto py-0">
                <Link to ='/Navbar' class="nav-item nav-link ">Home</Link>
                <Link to ='/about' className='nav-item nav-link '>about</Link>
                <Link to ='/Contact' class="nav-item nav-link">Contact</Link>
                <select onChange={handleChange} className='nav-item nav-link' style={{border: "none"}}>
                        <option value="option1" className='nav-item nav-link'>Select Your Option</option>
                        <option value="option2" className='nav-item nav-link'>Report Emergency</option>
                        {/* <option value="option3" className='nav-item nav-link'>Adotion Post</option> */}
                        <option value="option4" className='nav-item nav-link'>Adoption View</option>
                        <option value="option5" className='nav-item nav-link'>Petstore</option>
                        <option value="option6" className='nav-item nav-link'>Orders</option>
                        {/* <option value="option5" className='nav-item nav-link'>Ratings</option> */}
                        <option value="option7" className='nav-item nav-link'>User Profile</option>
                    </select>
        </div>
            <Link to ='/' class="nav-item nav-link"><MdLogout className='ommm'/></Link>
        </div>
    </nav>
       <div className='bgg'>
           <div class="emergency">
            <p class="title">Ratings</p>
            <form class="form" onSubmit={handleSubmit}>
                <div class="input-groupp">
                    {/* <input type="email" placeholder="Email" name='email' onChange={handleInput} required />    */}
                    <input type="email" placeholder="Email" name='email' value={values.email} readOnly />
                </div>

                {/* Adoption */}
                <div className="input-groupp">
                <label>Adoption Rating:</label><br />
                <ReactStars
                    count={5}
                    value={Number(values.adoption)}
                    onChange={(newValue) =>
                    setValues(prev => ({ ...prev, adoption: newValue }))
                    }
                    size={30}
                    activeColor="#ffd700"
                />
                </div>

                {/* Emergency */}
                <div className="input-groupp">
                <label>Emergency Rating:</label><br />
                <ReactStars
                    count={5}
                    value={Number(values.emergency)}
                    onChange={(newValue) =>
                    setValues(prev => ({ ...prev, emergency: newValue }))
                    }
                    size={30}
                    activeColor="#ffd700"
                />
                </div>

                {/* Petstore */}
                <div className="input-groupp">
                <label>Petstore Rating:</label><br />
                <ReactStars
                    count={5}
                    value={Number(values.petstore)}
                    onChange={(newValue) =>
                    setValues(prev => ({ ...prev, petstore: newValue }))
                    }
                    size={30}
                    activeColor="#ffd700"
                />
                </div>

                {/* Shelter */}
                <div className="input-groupp">
                <label>Shelter Rating:</label><br />
                <ReactStars
                    count={5}
                    value={Number(values.shelter)}
                    onChange={(newValue) =>
                    setValues(prev => ({ ...prev, shelter: newValue }))
                    }
                    size={30}
                    activeColor="#ffd700"
                />
                </div>

                <button type='submit' class="signn">Submit</button>
                </form>

        </div>
    </div>
        <div>
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
                        <p class="btn btn-outline-primary btn-square me-2" ><i class="bi bi-twitter"></i></p>
                        <p class="btn btn-outline-primary btn-square me-2" ><i class="bi bi-facebook"></i></p>
                        <p class="btn btn-outline-primary btn-square me-2" ><i class="bi bi-linkedin"></i></p>
                        <p class="btn btn-outline-primary btn-square" ><i class="bi bi-instagram"></i></p>
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
        </div>
 
  )
}

export default Ratings
