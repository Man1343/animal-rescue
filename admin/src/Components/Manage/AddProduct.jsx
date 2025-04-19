import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

export default function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // id: "",
    name: "",
    category: "",
    newCategory: "",
    description: "",
    price: "",
    qty: "",
    imageUrl: ""
  });

  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  // const setImageFile = useState(null);
  // const categoryOptions = ["Accessory", "Care", "Food", "Toy"];
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/products")
      .then((res) => res.json())
      .then((data) => {
        const uniqueCategories = [...new Set(data.map((product) => product.category))];
        setCategoryOptions(uniqueCategories);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setCategoryOptions([]);
      });
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/avif", "image/webp"];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!validTypes.includes(file.type)) {
      setError("Invalid file type. Only JPG, PNG, AVIF, and WEBP are allowed.");
      return;
    }

    if (file.size > maxSize) {
      setError("File size exceeds 2MB limit.");
      return;
    }

    setError("");
    setImageFile(file);
    setFormData((prev) => ({ ...prev, imageUrl: URL.createObjectURL(file) }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { id, name, category, newCategory, description, price, qty, imageUrl } = formData;

  //   const finalCategory = newCategory ? newCategory : category;

  //   if (!id || !name || !finalCategory || !description || !price || !qty || !imageUrl) {
  //     return setError("All fields are required.");
  //   }

  //   if (parseInt(id) <= 0) {
  //     return setError("Id cannot be zero or negative.");
  //   }

  //   if (parseFloat(price) <= 0) {
  //     return setError("Price must be greater than 0.");
  //   }

  //   if (parseInt(qty) < 0) {
  //     return setError("Quantity cannot be negative.");
  //   }

  //   fetch("http://localhost:8081/products", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       id,
  //       name,
  //       category: finalCategory,
  //       description,
  //       price: parseFloat(price),
  //       qty: parseInt(qty),
  //       imageUrl
  //     })
  //   })
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Failed to add product");
  //       return res.json();
  //     })
  //     .then((data) => {
  //       alert("Product added successfully!");
  //       navigate("/Products");
  //     })
  //     .catch((err) => {
  //       console.error("Error adding product:", err);
  //       setError("Something went wrong. Please try again.");
  //     });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const { id, name, category, newCategory, description, price, qty } = formData;
    const { name, category, newCategory, description, price, qty } = formData;
    const finalCategory = newCategory ? newCategory : category;
  
    // if (!id || !name || !finalCategory || !description || !price || !qty || !imageFile) {
    if (!name || !finalCategory || !description || !price || !qty || !imageFile) {
      return setError("All fields including image are required.");
    }
  
    // if (parseInt(id) <= 0) {
    //   return setError("Id cannot be zero or negative.");
    // }
  
    if (parseFloat(price) <= 0) {
      return setError("Price must be greater than 0.");
    }
  
    if (parseInt(qty) < 0) {
      return setError("Quantity cannot be negative.");
    }
  
    // Use FormData to handle file + text
    const formDataToSend = new FormData();
    // formDataToSend.append("id", id);
    formDataToSend.append("name", name);
    formDataToSend.append("category", finalCategory);
    formDataToSend.append("description", description);
    formDataToSend.append("price", price);
    formDataToSend.append("qty", qty);
    formDataToSend.append("image", imageFile); // Must match field name used in multer
  
    fetch("http://localhost:8081/addProduct", {
      method: "POST",
      body: formDataToSend
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add product");
        return res.json();
      })
      .then((data) => {
        alert("Product added successfully!");
        navigate("/Products");
      })
      .catch((err) => {
        console.error("Error adding product:", err);
        setError("Something went wrong. Please try again.");
      });
  };
  

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      {error && <p className="error">{error}</p>}
      <form className="add-product-form" onSubmit={handleSubmit}>
        {/* <div className="form-group">
          <label>Product ID:</label>
          <input type="number" name="id" placeholder="Product ID" onChange={handleChange} value={formData.id} required />
        </div> */}
        <div className="form-group">
          <label>Product Name:</label>
          <input type="text" name="name" placeholder="Product Name" onChange={handleChange} value={formData.name} required />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select name="category" onChange={handleChange} value={formData.category}>
            <option value="">--Select Category--</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input type="text" name="newCategory" placeholder="Or add new category" onChange={handleChange} value={formData.newCategory} />
        </div>
        <div className="form-group">
          <label>Product Description:</label>
          <textarea name="description" placeholder="Description" onChange={handleChange} value={formData.description} required />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input type="number" name="price" placeholder="Price (₹)" onChange={handleChange} value={formData.price} required min="0.01" step="0.01" />
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input type="number" name="qty" placeholder="Quantity" onChange={handleChange} value={formData.qty} required min="0" />
        </div>
        <div className="form-group">
          <label>Image of Product:</label>
          <input type="file" accept=".jpg,.jpeg,.png,.avif,.webp" onChange={handleImageChange} />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn">Add Product</button>
          <button type="button" className="reset-btn" onClick={() => {
            setFormData({
              // id: "",
              name: "",
              category: "",
              newCategory: "",
              description: "",
              price: "",
              qty: "",
              imageUrl: ""
            });
            setImageFile(null);
            setError("");
          }}>Reset</button>
        </div>
      </form>
    </div>
  );
}
