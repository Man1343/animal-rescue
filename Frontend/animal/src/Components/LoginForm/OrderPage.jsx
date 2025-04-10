import { React, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./OrderPage.css";
import { MdLogout } from "react-icons/md";

export default function OrderPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [values,setValues] = useState({});
  // const [paymentMethod, setPaymentMethod] = useState("cash");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  // const userEmail = localStorage.getItem("userEmail");
  
  const [cart, setCart] = useState(location.state?.cart || []);
  const [orderDetails, setOrderDetails] = useState({
    email: "",
    address: "",
    cardNumber: "",
    expiryDate: "",
  });

  const updateQuantity = (productId, change) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.product_id === productId
            ? { ...item, qty: Math.max(1, item.qty + change) }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product_id !== productId));
  };

  const isExpiryDateValid = (date) => {
    const currentDate = new Date();
    const selectedDate = new Date(date);
    return selectedDate > currentDate;
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleOrder = async () => {
    if (!isValidEmail(orderDetails.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // if (paymentMethod !== "cash") {
    if(paymentMethod !== "Cash on Delivery"){
      if (!/^\d{12}$/.test(orderDetails.cardNumber)) {
        alert("Card number must be exactly 12 digits.");
        return;
      }
    
      if (!/^\d{3}$/.test(orderDetails.cvv)) {
        alert("CVV must be exactly 3 digits.");
        return;
      }
    
      if (!isExpiryDateValid(orderDetails.expiryDate)) {
        alert("Card expiry date must be a future date.");
        return;
      }
    }
    

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const isCardPayment = paymentMethod !== "Cash on Delivery";
    
    const orderData = {
      email: orderDetails.email,
      address: orderDetails.address,
      payment_mode: paymentMethod,
      // card_number: paymentMethod === "Cash on Delivery" ? "" : orderDetails.cardNumber,
      // expiry_date: paymentMethod === "Cash on Delivery" ? "" : orderDetails.expiryDate,
      // cvv: paymentMethod === "Cash on Delivery" ? "" : orderDetails.cvv,
      card_number: isCardPayment ? orderDetails.cardNumber : "",
      expiry_date: isCardPayment ? orderDetails.expiryDate : "",
      cvv: isCardPayment ? orderDetails.cvv : "",
      total_price: totalAmount,
      products: cart,
    };
    
    
    try {
      const response = await fetch("http://localhost:8081/place-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      
      if (response.ok) {
        alert("Order placed successfully!");
        setCart([]); 
        // navigate(`/orders/${orderDetails.email}`);  // Redirect after placing order
        // navigate(`/orders/${userEmail}`);
        navigate(`/Userorders`);
        // navigate(`/Petstore`);
      } else {
        alert("Failed to place order. Try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

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

      {/* main order page content */}
      <div className="order-container">
        <h1>Order Summary</h1>
        <ul>
          {cart.map((item) => (
            <li key={item.product_id} className="order-item">
              {item.name} - ₹{item.price} x {item.qty}
              <button onClick={() => updateQuantity(item.product_id, 1)}>+</button>
              <button onClick={() => updateQuantity(item.product_id, -1)}>-</button>
              <button onClick={() => removeItem(item.product_id)}>Remove</button>
            </li>
          ))}
        </ul>
        <h2>Total: ₹{cart.reduce((sum, item) => sum + item.price * item.qty, 0)}</h2>

        <label>Enter your registered email:</label>
        <input
          type="email"
          placeholder="Registered Email"
          value={orderDetails.email}
          onChange={(e) => setOrderDetails({ ...orderDetails, email: e.target.value })}
        />
        
        <label>Address for delivery:</label>
        <input
          type="text"
          placeholder="Address"
          value={orderDetails.address}
          onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })}
        />

        <label>Select Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          {/* <option value="cash">Cash on Delivery</option> */}
          <option value="Cash on Delivery">Cash on Delivery</option>
          <option value="credit">Credit Card</option>
          <option value="debit">Debit Card</option>
        </select>

        {/* {paymentMethod !== "cash" && ( */}
        {paymentMethod !== "Cash on Delivery" && (
          <>
            <label>Enter valid card number:</label>
            <input
              type="text"
              placeholder="Card Number (12 digits)"
              value={orderDetails.cardNumber}
              onChange={(e) => setOrderDetails({ ...orderDetails, cardNumber: e.target.value })}
              maxLength="12"
            />

            <label>Enter CVV (3 digits):</label>
            <input
              type="text"
              placeholder="CVV"
              value={orderDetails.cvv || ""}
              onChange={(e) => setOrderDetails({ ...orderDetails, cvv: e.target.value })}
              maxLength="3"
            />

            <label>Enter card expiry date:</label>
            <input
              type="date"
              placeholder="Expiry Date"
              value={orderDetails.expiryDate}
              onChange={(e) => setOrderDetails({ ...orderDetails, expiryDate: e.target.value })}
            />
          </>
        )}


        <button className="place-order-btn" onClick={handleOrder}>Place Order</button>
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
