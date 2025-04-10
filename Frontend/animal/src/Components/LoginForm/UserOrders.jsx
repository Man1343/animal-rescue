import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserOrders.css";
import { MdLogout } from "react-icons/md";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");

  const [values,setValues] = useState({});

  useEffect(() => {
    console.log("User email is:", userEmail);
    if (!userEmail) {
      console.error("User email is null, cannot fetch orders.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8081/orders/${userEmail}`)
      .then((response) => response.json())
      .then((data) => {
        if(data.message){
          alert(data.message);
        }
        else{
          setOrders(data);
          console.log("Orders fetched:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders");
      })
      .finally(() => setLoading(false));
  }, [userEmail]);

  if (loading) return <p>Loading orders...</p>;
  if (!orders.length) return <p>No orders found.</p>;

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
            <Link to ="/Navbar" class="navbar-brand ms-lg-5">
            <h1 class="m-0 text-uppercase text-dark"><i class="bi bi-shop fs-1 text-primary me-3"></i>Paw Protectors</h1>
             </Link>

       
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
                  {/* <option value="option6" className='nav-item nav-link'>Orders</option> */}
                  <option value="option7" className='nav-item nav-link'>Ratings</option>
                  <option value="option8" className='nav-item nav-link'>User Profile</option>
                </select>
      
           
        </div>
            <Link to ='/' class="nav-item nav-link"><MdLogout className='ommm'/></Link>
        </div>
    </nav>

      {/* user orders content */}
      <div className="container">
        <h2 className="title">My Orders</h2>
        {error && <p className="error">{error}</p>}
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Delivery Address</th>
              <th>Total Items</th>
              <th>Payment Mode</th>
              <th>Total Amount</th>
              <th>Status</th>
              {/* <th>Details</th> */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                {/* <td>{new Date(order.order_date).toLocaleString().split('T')[0]}</td> */}
                <td>{new Date(order.order_date).toISOString().split('T')[0]}</td>
                <td>{order.ship_address}</td>
                {/* <td>{JSON.parse(order.order_items).length}</td> */}
                <td>{order.order_items}</td>
                <td>{order.payment_mode}</td>
                <td>₹{order.total_amount}</td>
                <td>{order.status}</td>
                {/* <td>
                  <button
                    className="view-button"
                    onClick={() =>
                      navigate(`/order/${order.order_id}`, { state: { order } })
                    }
                  >
                    View
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
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
}
