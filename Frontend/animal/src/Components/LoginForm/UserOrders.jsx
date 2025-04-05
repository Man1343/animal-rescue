// import { React, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./UserOrders.css"; 

// export default function UserOrders({ userEmail }) {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("User email is:", userEmail);
//     if (!userEmail) {
//       console.error("User email is null, cannot fetch orders.");
//       setLoading(false);
//       return;
//     }

//     fetch(`http://localhost:8081/orders/${userEmail}`)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Orders fetched:", data);
//         setOrders(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching orders:", error);
//         setError("Failed to fetch orders");
//       })
//       .finally(() => setLoading(false));
//   }, [userEmail]);
  
//   if (loading) return <p>Loading orders...</p>;
//   if (!orders.length) return <p>No orders found.</p>;
  
//   return (
//     <div className="container">
//       <h2 className="title">My Orders</h2>

//       {loading && <p>Loading orders...</p>}
//       {error && <p className="error">{error}</p>}

//       {!loading && orders.length === 0 && <p>No orders found.</p>}

//       {!loading && orders.length > 0 && (
//         <table className="order-table">
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Order Date</th>
//               <th>Total Items</th>
//               <th>Total Amount</th>
//               <th>Status</th>
//               <th>Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order.order_id}>
//                 <td>{order.order_id}</td>
//                 <td>{new Date(order.order_date).toLocaleString()}</td>
//                 <td>{JSON.parse(order.order_items).length}</td>
//                 <td>₹{order.total_amount}</td>
//                 <td>{order.status}</td>
//                 <td>
//                   <button
//                     className="view-button"
//                     onClick={() => navigate(`/order/${order.order_id}`, { state: { order } })}
//                   >
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }







import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserOrders.css";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");

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

  return (
    <div className="container">
      <h2 className="title">My Orders</h2>
      {error && <p className="error">{error}</p>}
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Total Items</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{new Date(order.order_date).toLocaleString()}</td>
              {/* <td>{JSON.parse(order.order_items).length}</td> */}
              <td>{order.order_items}</td>
              <td>₹{order.total_amount}</td>
              <td>{order.status}</td>
              <td>
                <button
                  className="view-button"
                  onClick={() =>
                    navigate(`/order/${order.order_id}`, { state: { order } })
                  }
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
