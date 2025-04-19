import Login from './Components/Manage/Login'
import User from './Components/Manage/User';
import Shelter from './Components/Manage/Shelter';
import Adoption from './Components/Manage/Adoption';
import Updateuser from './Components/Manage/Updateuser';
import Updateshelter from './Components/Manage/Updateshelter';
import Ratings from './Components/Manage/Ratings'
import Record from './Components/Manage/Record';
import Emergencyrecord from './Components/Manage/Emergencyrecord';
import Adminorders from './Components/Manage/AdminOrders';
import Products from './Components/Manage/ProductManager';
import AddProduct from './Components/Manage/AddProduct';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
        <Router>
        <Routes>
        <Route path='/' element={<Login/>}></Route>
          <Route path='/User' element={<User/>}></Route>
          <Route path='/Shelter' element={<Shelter/>}></Route>
          <Route path='/Adoption' element={<Adoption/>}></Route>
          <Route path='/Updateuser' element={<Updateuser/>}></Route>
          <Route path='/Updateshelter' element={<Updateshelter/>}></Route>
          <Route path='/Ratings' element={<Ratings/>}></Route>
          <Route path='/Record' element={<Record/>}></Route>
          <Route path='/Emergencyrecord' element={<Emergencyrecord/>}></Route>
          <Route path='/Adminorders' element={<Adminorders/>}></Route>
          <Route path='/Products' element={<Products/>}></Route>
          <Route path='/AddProduct' element={<AddProduct/>}></Route>
          </Routes>
          </Router>
    </div>
  );
}

export default App;
