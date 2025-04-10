import Login from './Components/LoginForm/Login';
import Signup from './Components/LoginForm/Signup';
import Navbar from './Components/LoginForm/Navbar';
import Adoptionview from './Components/LoginForm/Adoptionview';
import Adoptionpost from './Components/LoginForm/Adoptionpost';
import Reportemergency from './Components/LoginForm/Reportemergency';
import About from './Components/LoginForm/About';
import Contact from './Components/LoginForm/Contact';
import Ratings from './Components/LoginForm/Ratings';
// import Chatbot from './Components/LoginForm/Chatbot';
import Petstore from './Components/LoginForm/Petstore';
// import ProductDetails from './Components/LoginForm/ProductDetails';
import Orderpage from './Components/LoginForm/OrderPage';
import Userorders from './Components/LoginForm/UserOrders';
import Userprofile from './Components/LoginForm/UserProfile';

import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import { useState } from 'react';




function App() {
  // const userEmail = localStorage.getItem("userEmail");
  return (
    <div className='animal'>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/Signup' element={<Signup/>}></Route>
          <Route path='/Navbar' element={<Navbar/>}></Route>
          <Route path='/Adoptionview' element={<Adoptionview/>}></Route>
          <Route path='/Adoptionpost' element={<Adoptionpost/>}></Route>
          <Route path='/Reportemergency' element={<Reportemergency/>}></Route>
          <Route path='/About' element={<About/>}></Route>
          <Route path='/Contact' element={<Contact/>}></Route>
          <Route path='/Ratings' element={<Ratings/>}></Route>
          <Route path='/Petstore' element={<Petstore/>}></Route>
          <Route path='/Orderpage' element={<Orderpage/>}></Route>
          {/* <Route path='/Userorders' element={<Userorders userEmail={userEmail} />} /> */}
          <Route path="/Userorders" element={<Userorders />} />
          {/* <Route path="/Userorders" element={userEmail ? <Userorders userEmail={userEmail} userId={userId} /> : <Login />} /> */}
          {/* {userEmail && <Route path='/Userorders' element={<Userorders userEmail={userEmail} />} />} */}
          <Route path='/Userprofile' element={<Userprofile />} />
        </Routes>
      </Router>
      {/* <Chatbot /> */}
    </div>
  );
}

export default App;
