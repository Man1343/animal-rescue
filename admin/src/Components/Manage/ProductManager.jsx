import { React, useEffect, useState } from "react";
import "./ProductManager.css"; 
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8081/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleEditChange = (productId, field, value) => {
    setEditData((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value
      }
    }));
  };

  const handleUpdate = (productId) => {
    const updates = editData[productId];
    if (!updates || (!updates.price && !updates.qty)) return;

    fetch(`http://localhost:8081/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updates)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then((updatedProduct) => {
        alert("Product updated successfully!");
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.product_id === productId ? { ...p, ...updates } : p
          )
        );
        setEditData((prev) => {
          const { [productId]: removed, ...rest } = prev;
          return rest;
        });
      })
      .catch((err) => console.error("Error updating product:", err));
  };

  const handleDelete = (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
  
    fetch(`http://localhost:8081/products/${productId}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        return res.json();
      })
      .then(() => {
        alert("Product deleted successfully!");
        setProducts((prevProducts) =>
          prevProducts.filter((p) => p.product_id !== productId)
        );
      })
      .catch((err) => console.error("Error deleting product:", err));
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
                    <Link to='/Products' className='nav-item nav-link'>Manage Products</Link>
                </div>
                <Link to ='/' class="nav-item nav-link"><MdLogout className='ommm'/></Link>
            </div>
        </nav>

        <div className="product-manager">
        <h1>All Products</h1>
        <button onClick={() => navigate("/AddProduct")} className="add-btn">
          Add New Product
        </button>

        <table className="product-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Description</th>
                {/* <th>Image</th> */}
                <th>Price (₹)</th>
                <th>Quantity</th>
                <th>Update</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {products.map((product) => {
                const changes = editData[product.product_id] || {};
                return (
                <tr key={product.product_id}>
                    <td>{product.product_id}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.description}</td>
                    {/* <td>
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    />
                    </td> */}
                    <td>
                    <input
                        type="number"
                        placeholder={product.price}
                        value={changes.price || ""}
                        onChange={(e) =>
                        handleEditChange(product.product_id, "price", parseFloat(e.target.value))
                        }
                    />
                    </td>
                    <td>
                    <input
                        type="number"
                        placeholder={product.qty}
                        value={changes.qty || ""}
                        onChange={(e) =>
                        handleEditChange(product.product_id, "qty", parseInt(e.target.value))
                        }
                    />
                    </td>
                    <td>
                    <button
                        className="update-btn"
                        onClick={() => handleUpdate(product.product_id)}>
                        Update
                    </button>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(product.product_id)}>
                        Delete
                      </button>
                    </td>
                </tr>
                );
            })}
            </tbody>
        </table>
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
  );
}
