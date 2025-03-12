import React, {useEffect,useState}from 'react'
import './Styles.css';
import './template.css';
import { MdLogout } from "react-icons/md";
import {Link} from 'react-router-dom';
import Constant from '../../Constant';
import axios from 'axios';

const Adoption = () => {
    const [mydata, setMyData] = useState([]);
    useEffect(()=>{
        axios.get(Constant.URLs.ApiUrl + '/Adoptionpost').then((res)=>{
            console.log(res.data);
            setMyData(res.data);
        })
    },[]);

    const rowStyle = {
        borderBottom: '5px solid #ddd',
      };

      const [users, setUsers] = useState([]);

      const handleDelete = (animal_id) => {
        axios.delete(Constant.URLs.ApiUrl +`/deletepost/${animal_id}`)
          .then(response => {
            console.log(response.data);
            setUsers(users.filter(user => user.animal_id !== animal_id));
          })
          .catch(error => console.error('Error deleting user:', error));
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


<nav class="navbar navbar-expand-lg bg-white navbar-light shadow-sm py-3 py-lg-0 px-3 px-lg-0">
        <a href="/user" class="navbar-brand ms-lg-5">
        <h1 class="m-0 text-uppercase text-dark"><i class="bi bi-shop fs-1 text-primary me-3"></i></h1>
         </a>

   
    <div class="collapse navbar-collapse" id="navbarCollapse">
        <div class="navbar-nav ms-auto py-0">
        <Link to ='/Record' class="nav-item nav-link ">Record of users</Link>
            <Link to ='/Emergencyrecord' class="nav-item nav-link ">Record of emergency</Link>
            <Link to ='/User' class="nav-item nav-link ">Manage User</Link>
            <Link to ='/Shelter' className='nav-item nav-link '>Manage Shelter</Link>
            <Link to ='/Adoption' class="nav-item nav-link">Manage Adoption</Link>
            <Link to ='/Ratings' class="nav-item nav-link">Manage Ratings</Link>
        </div>
        <Link to ='/' class="nav-item nav-link"><MdLogout className='ommm'/></Link>
    </div>
</nav>

<div className='emerr'>
    <center>
        <table style={{color:"black"}} border={'3px'} width={'80%'}>
        <tr style={rowStyle}>
         <th className='emerr'>Animal ID</th>
            <th className='emerr'> Unique_ID</th>
            <th className='emerr'>Animal Name</th>
            <th className='emerr'>Species</th>
            <th className='emerr'>Age</th>
            <th className='emerr'>Description</th>
            <th className='emerr'>Image</th>
            <th className='emerr'>Mobile No</th>
            <th className='emerr'>Email</th>
            <th className='emerr'>Manage</th>
        </tr>
        {
        mydata.map(user=>{
            return (
                <tr>
                    <td className='emerr'>
                    {user.animal_id} 
                    </td>
                    <td className='emerr'>
                     {user.unique_id}
                    </td>
                    <td className='emerr'>
                     {user.animal_name}
                    </td>
                    <td className='emerr'>
                     {user.species}
                    </td>
                    <td className='emerr'>
                     {user.age}
                    </td>
                    <td className='emerr'>
                     {user.description}
                    </td>
                    <td className='emerr'>
                    <img width={100} src={Constant.URLs.ApiUrl + "/"+ user.image_url} alt='' />
                    </td>
                    <td className='emerr'>
                    {user.mobile_no}
                    </td>
                    <td className='emerr'>
                     {user.email}
                    </td>
                    <td key = {user.animal_id}>
                                <button onClick={() => handleDelete(user.animal_id)} className = "btn btn-outline-danger" >Delete</button>    
                            </td>
                </tr>
                
            )
            
        })
    }

</table>
</center>
</div>
    <div class="container-fluid bg-light mt-5 py-5">
        <div class="container pt-5">
            <div class="row g-5">
               
                <div class="col-lg-3 col-md-6">
                    <h5 class="text-uppercase border-start border-5 border-primary ps-3 mb-4">Quick Links</h5>
                    <div class="d-flex flex-column justify-content-start">
                        <p class="text-body mb-2" ><i class="bi bi-arrow-right text-primary me-2"></i>Home</p>
                        <p class="text-body mb-2" ><i class="bi bi-arrow-right text-primary me-2"></i>About Us</p>
                        <p class="text-body mb-2"><i class="bi bi-arrow-right text-primary me-2"></i>Our Services</p>
                        <p class="text-body" ><i class="bi bi-arrow-right text-primary me-2"></i>Contact Us</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h5 class="text-uppercase border-start border-5 border-primary ps-3 mb-4">Popular Links</h5>
                    <div class="d-flex flex-column justify-content-start">
                        <p class="text-body mb-2" ><i class="bi bi-arrow-right text-primary me-2"></i>Home</p>
                        <p class="text-body mb-2"><i class="bi bi-arrow-right text-primary me-2"></i>About Us</p>
                        <p class="text-body mb-2"><i class="bi bi-arrow-right text-primary me-2"></i>Our Services</p>
                      
                        <p class="text-body" ><i class="bi bi-arrow-right text-primary me-2"></i>Contact Us</p>
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
                    <center><p class="mb-md-0">&copy; <p class="text-white" href="#">Animal ResQ . All Rights Reserved.</p></p></center>
                </div>
             
            </div>
        </div>
    </div>  
     

    </div>
  )
}

export default Adoption
