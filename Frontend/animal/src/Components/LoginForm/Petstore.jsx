import { React, useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import "./Petstore.css";

const Card = ({ children }) => <div className="card">{children}</div>;
const CardContent = ({ children }) => <div className="card-content">{children}</div>;
const Button = ({ children, onClick }) => (
  <button onClick={onClick} className="button">
    {children}
  </button>
);

export default function PetStore() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8081/products")
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
        const uniqueCategories = ["All", ...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
      })
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.product_id === product.product_id);
      
      if (existingProduct) {
        return prevCart.map((item) =>
          item.product_id === product.product_id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, qty: 1 }];
      }
    });
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="container">
      <div className="navbar">
        <h1 className="title">Pet Products</h1>
        <div className="navbar-right">
          <select className="category-dropdown" value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          <div className="cart-container">
            <div className="cart-icon" onClick={toggleCart}>
              <ShoppingCart className="icon" />
              {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </div>
            {showCart && (
              <div className="cart-dropdown">
                <h2 className="cart-title">Cart</h2>
                {cart.length === 0 ? (
                  <p className="empty-cart">Your cart is empty.</p>
                ) : (
                  <>
                  <ul className="cart-list">
                  {cart.map((item, index) => (
                    <li key={index} className="cart-item">
                      {item.name} - ₹{item.price} - Qty: {item.qty}
                    </li>
                  ))}
                </ul>
                <Button className="checkout-btn" onClick={() => navigate("/Orderpage", { state: { cart } })}>
                  Proceed to Checkout
                </Button>
                </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="product-list">
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <CardContent>
              <h2 className="product-name">{product.name}</h2>
              <p className="product-price">₹{product.price}</p>
              <p className="product-category">Category - {product.category}</p>
              <p className="product-description">{product.description}</p>
              <Button onClick={() => addToCart(product)}>
                Add to Cart <ShoppingCart className="button-icon" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
