import Loginn from './Components/LoginForm/Loginn';
import Signupp from './Components/LoginForm/signupp';
import Adoptionpost from './Components/LoginForm/Adoptionpost'
import Viewemergency from './Components/LoginForm/Viewemergency'
import About from './Components/LoginForm/about'
import Contact from './Components/LoginForm/Contact'
import Viewratings from './Components/LoginForm/Viewratings';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './Components/LoginForm/Navbar';
import './App.css';

function App() {
  return (
    <div className="animal">
      <Router>
        <Routes>
          <Route path='/' element={<Loginn/>}></Route>
          <Route path='/signupp' element={<Signupp/>}></Route>
          <Route path='/Navbar' element={<Navbar/>}></Route>
          <Route path='/Adoptionpost' element={<Adoptionpost/>}></Route>
          <Route path='/Viewemergency' element={<Viewemergency/>}></Route>
          <Route path='/About' element={<About/>}></Route>
          <Route path='/Contact' element={<Contact/>}></Route>
          <Route path='/Viewratings' element={<Viewratings/>}></Route>
          </Routes>
          </Router>
    </div>
  );
}

export default App;
