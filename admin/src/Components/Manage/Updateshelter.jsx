import React, {useState} from 'react'
import axios from 'axios'
import Constant from '../../Constant';
import {Link} from 'react-router-dom'
import { MdLogout } from "react-icons/md";
import './Styles.css'
import Modal from './Modal';

function Updateshelter() {
  const [unique_id, setId] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const handleUpdate = () => {
      axios.put(Constant.URLs.ApiUrl+ '/updateshelter', { unique_id, newName, newEmail, newContact, newAddress })
        .then((response) => {
          console.log(response.data);
          // Handle success, update state or show a success message
        })
        .catch((error) => {
          console.error('Error updating data:', error);
          // Handle error, show an error message
        });
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


<nav class="navbar navbar-expand-lg bg-white navbar-light shadow-sm py-3 py-lg-0 px-3 px-lg-0">
        <a href="/User" class="navbar-brand ms-lg-5">
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
            <Link to ='/Adminorders' className='nav-item nav-link'>Manage Orders</Link>
        </div>
        <Link to ='/' class="nav-item nav-link"><MdLogout className='ommm'/></Link>
    </div>
</nav>
    <div className='bgg'>
        <div className='emergency'>
        <p class="title">Update For Shelter</p>
        <form className='form'>
            <div className='input-groupp'>
            <input type="text" value={unique_id} onChange={(e) => setId(e.target.value)} placeholder='Unique ID' />
             </div>

        <div className='input-groupp'>
      <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder='Enter New Name'/>
      </div>

      <div className='input-groupp'>
      <input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder='Enter New Email'/>
     </div>

     <div className='input-groupp'>
      <input type="text" value={newContact} onChange={(e) => setNewContact(e.target.value)} placeholder='Enter New Contact'/>
  </div>
  <div className='input-groupp'>
            <input type="text" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} placeholder='Enter New Address' />
             </div>
             <button
  className="btn btn-outline-success"
  onClick={() => {
    handleUpdate();
    setModalOpen(true);
  }}
>
  Update
</button>
    
      </form>
      
      </div>
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
                    <center><p class="mb-md-0">&copy; <p class="text-white" href="#">Animal ResQ . All Rights Reserved.</p></p></center>
                </div>
             
            </div>
        </div>
    </div>  
     
    </div>
  )
}

export default Updateshelter
