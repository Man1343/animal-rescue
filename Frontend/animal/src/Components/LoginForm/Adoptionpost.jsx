import React, {useState} from 'react'
import './template.css'
import { Link,useNavigate } from 'react-router-dom'
import { MdLogout } from "react-icons/md";
import axios from 'axios';
import Constant from '../../Constant';
import Validation from './PostValidation';


const Adoptionpost = () => {
    const [values, setValues] = useState({
		animal_name: '',
		species: '',
		age: '',
        description: '',
        image_url: '',
        mobile_no: '',
        email:''
	  })

      const navigate = useNavigate();
    const [file, setFile] = useState({})
    const [errors, setErrors] = useState({});

    const handleFile = (e) => {
		setFile(e.target.files[0])
	}


	  const handleChange = (event) => {
		setValues({ ...values, [event.target.name]:[event.target.value] });
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

            default:
              break;
          }
	  }

      const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        const formdata = new FormData();
     formdata.append('image', file);
     formdata.append('animal_name', values.animal_name);
     formdata.append('species', values.species);
     formdata.append('age', values.age);
     formdata.append('description', values.description);
     formdata.append('mobile_no', values.mobile_no);
     formdata.append('email', values.email);

     axios.post(Constant.URLs.ApiUrl + '/Adoptionpost',formdata)
     .then(res => {
      console.log("post successfully");
      window.alert("Post Done");
      window.location.reload();
    })
    .catch(err => {
      console.error(err);
      
    });
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
            <h1 class="m-0 text-uppercase text-dark"><i class="bi bi-shop fs-1 text-primary me-3"></i>Animal ResQ</h1>
             </a>

        <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav ms-auto py-0">
                <Link to ='/Navbar' class="nav-item nav-link ">Home</Link>
                <Link to ='/about' className='nav-item nav-link '>about</Link>
                <Link to ='/Contact' class="nav-item nav-link">Contact</Link>
                <select onChange={handleChange} className='nav-item nav-link' style={{border: "none"}}>
                        <option value="option1" className='nav-item nav-link'>Select Your Option</option>
                        <option value="option2" className='nav-item nav-link'>Report Emergency</option>
                        <option value="option3" className='nav-item nav-link'>Adotion Post</option>
                        <option value="option4" className='nav-item nav-link'>Adoption View</option>
                    </select>
        </div>
            <Link to ='/' class="nav-item nav-link"><MdLogout className='ommm'/></Link>
        </div>
    </nav>
           <div className='bgg'>
           <div class="emergency">

	            <p class="title">Post for Adoption</p>

	              <form class="form" onSubmit={handleSubmit}>

		        <div class="input-groupp">
			      <input type="text"   placeholder="Name of Animal" name='animal_name' onChange={handleChange}/>
            {errors.animal_name && <span className="text-danger">{errors.animal_name}</span>}   
            </div>
		
            <div class="input-groupp">
			      <input type="text" placeholder="Species" name='species' onChange={handleChange}/> 
            {errors.species && <span className="text-danger">{errors.species}</span>}     
			      </div>

            <div class="input-groupp">
			      <input type="number" placeholder="Age of Animal" name='age' onChange={handleChange}/>
            {errors.age && <span className="text-danger">{errors.age}</span>}      
			      </div>

            <div class="input-groupp">
			      <input type="text" placeholder="Description Of Animal" name='description' onChange={handleChange}/>
            {errors.description && <span className="text-danger">{errors.description}</span>}      
			      </div>
            
            <div class="input" >
             <input type="file" placeholder="Attach a Photo" name='image_url' onChange={handleFile}/>   
			      </div>

                  <div class="input-groupp" >
             <input type="text" placeholder="Contact" name='mobile_no' onChange={handleChange}/> 
             {errors.mobile_no && <span className="text-danger">{errors.mobile_no}</span>}     
			      </div>

                  <div class="input-groupp" >
             <input type="email" placeholder="Email" name='email' onChange={handleChange}/>
             {errors.email && <span className="text-danger">{errors.email}</span>}      
			      </div>

            
           

        <button type='submit' class="signn" >Submit</button>
	    </form>
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
                    <center><p class="mb-md-0" style={{color: "white"}}>&copy;Animal ResQ . All Rights Reserved.</p></center>
                </div>
             
            </div>
        </div>
    </div>  
  </div>
  )
}


export default Adoptionpost
