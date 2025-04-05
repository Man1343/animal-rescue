import { React, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OrderPage.css";

export default function OrderPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
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

    if (!/^\d{12}$/.test(orderDetails.cardNumber)) {
      alert("Card number must be exactly 12 digits.");
      return;
    }

    if (!isExpiryDateValid(orderDetails.expiryDate)) {
      alert("Card expiry date must be a future date.");
      return;
    }

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    
    const orderData = {
      email: orderDetails.email,
      address: orderDetails.address,
      card_number: orderDetails.cardNumber,
      expiry_date: orderDetails.expiryDate,
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
        navigate(`/Petstore`);
      } else {
        alert("Failed to place order. Try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
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
      
      <label>Enter valid card number:</label>
      <input
        type="text"
        placeholder="Card Number (12 digits)"
        value={orderDetails.cardNumber}
        onChange={(e) => setOrderDetails({ ...orderDetails, cardNumber: e.target.value })}
        maxLength="12"
      />

      <label>Enter card expiry date:</label>
      <input
        type="date"
        placeholder="Expiry Date"
        value={orderDetails.expiryDate}
        onChange={(e) => setOrderDetails({ ...orderDetails, expiryDate: e.target.value })}
      />

      <button className="place-order-btn" onClick={handleOrder}>Place Order</button>
    </div>
  );
}
