import React, { useEffect, useState } from "react";
import "./AdminOrders.css";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import {Link} from 'react-router-dom'
import { MdLogout } from "react-icons/md";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  // const downloadPDF = () => {
  //   const doc = new jsPDF();
  //   doc.text("Filtered Orders Report", 14, 15);
  
  //   const tableColumn = ["Order ID", "Email", "Date", "Items", "Amount", "Status"];
  //   const tableRows = [];
  
  //   (filteredOrders.length > 0 ? filteredOrders : orders).forEach(order => {
  //     const orderData = [
  //       order.order_id,
  //       order.email,
  //       new Date(order.order_date).toISOString().split("T")[0],
  //       order.order_items,
  //       `₹${order.total_amount}`,
  //       order.status
  //     ];
  //     tableRows.push(orderData);
  //   });
  
  //   doc.autoTable({
  //     head: [tableColumn],
  //     body: tableRows,
  //     startY: 20,
  //   });
  
  //   doc.save("filtered_orders.pdf");
  // };
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Filtered Orders Report", 14, 15);
  
    const tableColumn = ["Order ID", "Email", "Date", "Items", "Amount", "Status"];
    const tableRows = [];
  
    (filteredOrders.length > 0 ? filteredOrders : orders).forEach(order => {
      const orderData = [
        order.order_id,
        order.email,
        new Date(order.order_date).toISOString().split("T")[0],
        order.order_items,
        `₹${order.total_amount}`,
        order.status
      ];
      tableRows.push(orderData);
    });
  
    // Correct way to call autoTable
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
  
    doc.save("filtered_orders.pdf");
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    fetch("http://localhost:8081/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => {
        console.error("Error fetching all orders:", err);
        setError("Failed to load orders");
      })
      .finally(() => setLoading(false));
  };

  const updateStatus = (order_id, newStatus) => {
    fetch(`http://localhost:8081/orders/${order_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        fetchOrders(); // refresh the list
      })
      .catch((err) => {
        console.error("Status update error:", err);
        alert("Failed to update status");
      });
  };

  const statusOptions = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  const applyFilters = () => {
    let filtered = orders;
  
    if (fromDate) {
      filtered = filtered.filter(order => new Date(order.order_date) >= new Date(fromDate));
    }
    if (toDate) {
      filtered = filtered.filter(order => new Date(order.order_date) <= new Date(toDate));
    }
    if (statusFilter) {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    if (emailFilter) {
      filtered = filtered.filter(order => order.email.includes(emailFilter));
    }
  
    setFilteredOrders(filtered);
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
            <Link to ='/Adminorders' className='nav-item nav-link'>Manage Orders</Link>
            <Link to ='/Products' className='nav-item nav-link'>Manage Products</Link>
        </div>
        <Link to ='/' class="nav-item nav-link"><MdLogout className='ommm'/></Link>
    </div>
</nav>

<div className="admin-container">
      <h2 className="admin-title">All Orders</h2>

      {loading && <p>Loading orders...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && (
        <table className="admin-order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User Email</th>
              <th>Order Date</th>
              <th>Total Items</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {/* {orders.map((order) => ( */}
            {(filteredOrders.length > 0 ? filteredOrders : orders).map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.email}</td>
                <td>{new Date(order.order_date).toISOString().split('T')[0]}</td>
                {/* <td>{JSON.parse(order.order_items).length}</td> */}
                <td>{order.order_items}</td>
                <td>₹{order.total_amount}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.order_id, e.target.value)}
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button onClick={() => fetchOrders()} className="refresh-button">
                    Refresh
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    {/* <div className="filters">
      <label>From: <input type="date" onChange={(e) => setFromDate(e.target.value)} /></label>
      <label>To: <input type="date" onChange={(e) => setToDate(e.target.value)} /></label>
      <label>Status: 
        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All</option>
          {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>
      <label>Email: <input type="text" onChange={(e) => setEmailFilter(e.target.value)} /></label>
      <button onClick={applyFilters}>Generate Report</button>
    </div> */}
    <div className="filters container mt-4 p-4 border rounded bg-white shadow-sm">
      <div className="row g-3">
        <div className="col-md-3">
          <label className="form-label">From</label>
          <input type="date" className="form-control" onChange={(e) => setFromDate(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label className="form-label">To</label>
          <input type="date" className="form-control" onChange={(e) => setToDate(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Status</label>
          <select className="form-select" onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Email</label>
          <input type="text" className="form-control" placeholder="Search by email" onChange={(e) => setEmailFilter(e.target.value)} />
        </div>
        <div className="col-12 text-end mt-3">
          <button className="btn btn-primary me-2" onClick={applyFilters}>Generate Report</button>
          <button className="btn btn-success" onClick={downloadPDF}>Download PDF</button>
        </div>
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
                    <center><p class="mb-md-0">&copy; <p class="text-white" href="#">Paw Protectors . All Rights Reserved.</p></p></center>
                </div>
             
            </div>
        </div>
    </div>  
     

    </div>


    // <div className="admin-container">
    //   <h2 className="admin-title">Admin Panel - All Orders</h2>

    //   {loading && <p>Loading orders...</p>}
    //   {error && <p className="error">{error}</p>}

    //   {!loading && (
    //     <table className="admin-order-table">
    //       <thead>
    //         <tr>
    //           <th>Order ID</th>
    //           <th>User Email</th>
    //           <th>Order Date</th>
    //           <th>Total Items</th>
    //           <th>Total Amount</th>
    //           <th>Status</th>
    //           <th>Update</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {orders.map((order) => (
    //           <tr key={order.order_id}>
    //             <td>{order.order_id}</td>
    //             <td>{order.email}</td>
    //             <td>{new Date(order.order_date).toLocaleString()}</td>
    //             <td>{JSON.parse(order.order_items).length}</td>
    //             <td>₹{order.total_amount}</td>
    //             <td>
    //               <select
    //                 value={order.status}
    //                 onChange={(e) => updateStatus(order.order_id, e.target.value)}
    //               >
    //                 {statusOptions.map((opt) => (
    //                   <option key={opt} value={opt}>
    //                     {opt}
    //                   </option>
    //                 ))}
    //               </select>
    //             </td>
    //             <td>
    //               <button onClick={() => fetchOrders()} className="refresh-button">
    //                 Refresh
    //               </button>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   )}
    // </div>
  );
}
