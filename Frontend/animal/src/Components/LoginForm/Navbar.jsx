import React, { useState } from 'react';
import './template.css'
import { Link,useNavigate } from 'react-router-dom'
import { MdLogout } from "react-icons/md";
import Constant from '../../Constant';
import axios from 'axios';
import Modal from './ModalSignup';
import Chatbot from './Chatbot';
// import Petstore from './Petstore';



const Navbar = () => {
    const [values, setValues] = useState({
		email: '',
		message: '',
	  })
      const navigate = useNavigate();
	  const handleChange = (event) => {
		setValues({ ...values, [event.target.name]:[event.target.value] });
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
            navigate('/Ratings');
            break;
          case 'option8':
            navigate('/Userprofile');
            break;
          // Add more cases for additional options
          default:
            break;
        }
	  }
      const [modalOpen, setModalOpen] = useState(false);
	  const handleSubmit = (event) => {
        event.preventDefault();
       

		 axios.post(Constant.URLs.ApiUrl + '/Navbar',values)
		.then(res => console.log("submited successfully"))
		.catch(err => console.log(err));
      }
      const handleLogout = () => {
        localStorage.removeItem("userEmail");
        // localStorage.clear();
        navigate("/");
      };
      
  return (
    <div>  
         {modalOpen && <Modal setOpenModal={setModalOpen} />}
    <link href="img/favicon.ico" rel="icon"/>
    <link rel="preconnect" href="https://fonts.gstatic.com"/>
    <link href="https://fonts.googleapis.com/css2?family=Poppins&family=Roboto:wght@700&display=swap" rel="stylesheet"/>  
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet"/>
    <link href="lib/flaticon/font/flaticon.css" rel="stylesheet"/>
    <link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet"/>
    <link href="css/bootstrap.min.css" rel="stylesheet"/>
    <link href="css/template.css" rel="stylesheet"/>

<body>
   <nav class="navbar navbar-expand-lg bg-white navbar-light shadow-sm py-3 py-lg-0 px-3 px-lg-0">
        <a href="/Navbar" class="navbar-brand ms-lg-5">
            {/* <h1 class="m-0 text-uppercase text-dark"><i class="bi bi-shop fs-1 text-primary me-3"></i>Animal ResQ</h1> */}
            <h1 class="m-0 text-uppercase text-dark"><i class="bi bi-shop fs-1 text-primary me-3"></i>Paw Protectors</h1>
        </a>

        <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav ms-auto py-0">
                <Link to ='/Navbar' class="nav-item nav-link ">Home</Link>
                <Link to ='/about' className='nav-item nav-link '>about</Link>
                <Link to ='/Contact' class="nav-item nav-link">Contact</Link>
    
                <select onChange={handleChange} className='nav-item nav-link' style={{border: "none"}}>
                    <option value="option1">Select Your Option</option>
                    <option value="option2">Report Emergency</option>
                    {/* <option value="option3">Adotion Post</option> */}
                    <option value="option4">Adoption View</option>
                    <option value="option5">Petstore</option>
                    <option value="option6">Orders</option>
                    <option value="option7">Ratings</option>
                    <option value="option8">User Profile</option>
                </select>
        
            
            </div>
            <div class="nav-item nav-link" onClick={handleLogout}><MdLogout className='ommm'/></div>
            {/* <button onClick={handleLogout} className="logout-button">Logout</button> */}
            {/* <Link to ='/' class="nav-item nav-link"><MdLogout className='ommm'/></Link> */}
        </div>
    </nav>
    
    <div class="container-fluid bg-primary py-5 mb-5 hero-header">
        <div class="container py-5">
            <div class="row justify-content-start">
                <div class="col-lg-8 text-center text-lg-start">
                    <h1 class="display-3 text-uppercase text-light mb-lg-4">Street Animal Rescue</h1>
                    
                    <p class="fs-4 text-white mb-lg-4">For animals in critical condition,they are treated at our<br></br> clinic and heal at our recovery center.Car accidents,<br></br>Wire traps,and skin diseases are the main issues<br></br> we see daily</p>
                    <p class="fs-4 text-white mb-lg-4"></p>
                    <div class="d-flex align-items-center justify-content-center justify-content-lg-start pt-5">
                        <a href='https://www.ehs.pitt.edu/illness-or-injury/animal-associated-injury' class="btn btn-outline-light border-2 py-md-3 px-md-5 me-5">Read More</a>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  
    <div class="container-fluid py-5">
        <div class="container">
            <div class="row gx-5">
                <div class="col-lg-5 mb-5 mb-lg-0" style={{minheight: "500px;"}}>
                    <div class="position-relative h-100">
                       
                        <img class="position-absolute w-100 h-100 rounded"  style={{objectfit: "cover;"}} alt=''/>
                       
                    </div>
                </div>
                <div class="col-lg-7">
                    <div class="border-start border-5 border-primary ps-5 mb-5">
                        <h6 class="text-primary text-uppercase">About Us</h6>
                        <h1 class="display-5 text-uppercase mb-0">We Keep Animals Happy All Time</h1>
                    </div>
                    <h4 class="text-body mb-4">Human Education</h4>
                    <div class="bg-light p-4">
                        
                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-1" role="tabpanel" aria-labelledby="pills-1-tab">
                                <p class="mb-0">We visit schools and villages to educate people about rabies and compassion toward animals. The goal is to have the community as our partner in caring for the street animals of Ahmedabad.Know your rights! We need local street animal feeders to help eliminate the human/street dog conflict and allow for easier catching and monitoring of animal health.Our mission is to end the human/street dog conflict by creating a humane and sustainable environment for animals with direct benefits to the people of Dharamsala, India.
We provide several key programs to achieve our goals: spay/neuter, rabies vaccination, rescue and adoption, and community education for rabies safety and compassion</p>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
   
    <div class="container-fluid pt-5">
        <div class="container">
            <div class="border-start border-5 border-primary ps-5 mb-5" style={{maxwidth: "600px;"}}>
                <h6 class="text-primary text-uppercase">Contact Us</h6>
                <h1 class="display-5 text-uppercase mb-0">Give Your Valuable Feedback</h1>
            </div>
            <div class="row g-5">
                <div class="col-lg-7">
                    <form onSubmit={handleSubmit}>
                        <div class="row g-3">
                           
                            <div class="col-12">
                                <input type="email" class="form-control bg-light border-0 px-4" placeholder="Your Email" name='email' style={{height: "55px"}} onChange={handleChange}/>
                        
                            </div>
                           
                            <div class="col-12">
                                <textarea class="form-control bg-light border-0 px-4 py-3" rows="8" placeholder="Message" name='message' onChange={handleChange}></textarea>
                               
                            </div>
                            <div class="col-12">
                                <button class="btn btn-primary w-100 py-3" type="submit" onClick={() => {
          setModalOpen(true);
        }}>Send Message</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-lg-5">
                    <div class="bg-light mb-5 p-5">
                        <div class="d-flex align-items-center mb-2">
                            <i class="bi bi-geo-alt fs-1 text-primary me-3"></i>
                            <div class="text-start">
                                <h6 class="text-uppercase mb-1">Our Office</h6>
                                <span>Panjrapol,Panchvati,Ahmedabad</span>
                            </div>
                        </div>
                        <div class="d-flex align-items-center mb-2">
                            <i class="bi bi-envelope-open fs-1 text-primary me-3"></i>
                            <div class="text-start">
                                <h6 class="text-uppercase mb-1">Email Us</h6>
                                <span>admin123@gmail.com</span>
                            </div>
                        </div>
                        <div class="d-flex align-items-center mb-4">
                            <i class="bi bi-phone-vibrate fs-1 text-primary me-3"></i>
                            <div class="text-start">
                                <h6 class="text-uppercase mb-1">Call Us</h6>
                                <span>+91 9157992385</span>
                            </div>
                        </div>
                        <div>
                            <iframe class="position-relative w-100" title='Animal_ResQ'
                               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115944.48903128616!2d72.46032221989292!3d23.022505894644874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848c53612d0b%3A0x6f8df389e7b25abf!2sAhmedabad%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sin!4v1644918995002!5m2!1sen!2sin"
                                frameborder="0"  allowfullscreen="" aria-hidden="false"
                                tabindex="0"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    
    <div class="container-fluid bg-offer my-5 py-5">
        <div class="container py-5">
            <div class="row gx-5 justify-content-start">
                <div class="col-lg-7">
                    <div class="border-start border-5 border-dark ps-5 mb-5">
                        <h1 class="text-light text-uppercase" > Local Adoption</h1>
                        <h1 class="display-5 text-uppercase text-white mb-0">We welcome local adoption</h1>
                    </div>
                    <p class="text-white mb-4">Abandoned pets and stray dogs do not ask for much. All they need is another chance.
DAR pets come vaccinated, neutered and ready to love FOR FREE. Why would you go anywhere else? Adopt today, gain a beautiful soul forever.Abused or neglected on Indian streets, Desi dogs are finding loving homes in the West!
These dogs are known to have a calm and gentle demeanor around them. They bond strongly with their people and make an excellent family pet that is very loving, loyal and intelligent.</p>
                  
                </div>
            </div>
        </div>
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
   

    <Chatbot />
    <p class="btn btn-primary py-3 fs-4 back-to-top"><i class="bi bi-arrow-up"></i></p>


   
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="lib/easing/easing.min.js"></script>
    <script src="lib/waypoints/waypoints.min.js"></script>
    <script src="lib/owlcarousel/owl.carousel.min.js"></script>

  
</body>

    </div>
  )
}

export default Navbar



