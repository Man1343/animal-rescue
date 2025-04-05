import React, {useState,useEffect} from 'react'
import './template.css'
import './styles.css'
import { Link,useNavigate } from 'react-router-dom'
import { MdLogout } from "react-icons/md";
import axios from 'axios';
import Constant from '../../Constant';


const Viewratings = () => {
    const [values, setValues] = useState({})
    const [mydata, setMyData] = useState([]);
    const navigate = useNavigate();
    const handleChange = (event) => {
		setValues({ ...values, [event.target.name]:[event.target.value] });
        
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
          // Add more cases for additional options
          default:
            break;
        }
	  }
      
    useEffect(()=>{
        
        axios.get(Constant.URLs.ApiUrl + '/Ratings').then((res)=>{
            console.log(res.data);
            setMyData(res.data);
        })
    },[]);
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
                <select onChange={handleChange} className='nav-item nav-link' style={{border: "none"}}>
                        <option value="option1">Select Your Option</option>
                        <option value="option2">View Emergency</option>
                        <option value="option3">Adotion Post</option>
                        <option value="option4">View Ratings</option>
                    </select>

        </div>
            <Link to ='/' class="nav-item nav-link"><MdLogout className='ommm'/></Link>
        </div>
    </nav>
      </div>
      <div>
      <div className='em'>
<div className='emerr'>
    <center>
        <table style={{color:"black"}} border={'3px'} width={'80%'}>
        <tr>
            <th className='emer'>Email</th>
            <th className='emer'>Feedback</th>
        </tr>
        {
        mydata.map((data)=>{
            return (
                <tr>
                   
                    <td className='emer'>
                     {data.email}
                    </td>
                    <td className='emer'>
                    {data.feedback}
                    </td>
                    
                </tr>
                
            )
       })
    }
</table>
</center>
</div>
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
                    <center><p class="mb-md-0">&copy; <p class="text-white" >Paw Protectors . All Rights Reserved.</p></p></center>
                </div>
             
            </div>
        </div>
        </div>
    </div>
    </div>
  )
}

export default Viewratings
