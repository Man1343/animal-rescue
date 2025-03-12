import React, { useState } from 'react';
import { FaUser, FaLock} from "react-icons/fa";
import './Styles.css'
import './template.css'
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import Constant from '../../Constant';
import Validation from './Loginvalidation'; 

const Login= () => { 
    const [values, setValues] = useState({
        email:'',
        password:''
    })

    const [errors,setErrors] = useState({})
    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues (prev => ({...prev,[event.target.name]:[event.target.value]}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));

        if(errors.email === "" && errors.password === ""){
            axios.post(Constant.URLs.ApiUrl + '/Admin', values)
            .then (res => {
                if(res.data === "login successfully")
                {
                    navigate('/Record')
                }
                else{
                    alert ("no record")
                }
            })
            .catch (errors => console.log(errors));
        }

       
    }
  
return (
   <div className='bg'> 
    <div class="form-container">
	    <p class="title">Login</p>
	    <form class="form" onSubmit={handleSubmit} >
		    <div class="input-group">
			    <input type="text" name="email"  placeholder="Email" onChange={handleInput} />
                {errors.email && <span className='text-danger'>{errors.email}</span>}
                <FaUser className='icon' />
		    </div>
		
            <div class="input-group">
			<input type="password" name="password"  placeholder="Password" onChange={handleInput} />
            {errors.password && <span className='text-danger'>{errors.password}</span>}
            <FaLock className='icon'/>
			</div>
		
            <div className="remember-forgot">
                <label><input type="checkbox"/> Remember Me
                </label>
            </div>
        
        <button type='submit' class="sign" >Sign in</button>
	    </form>
	

   
    
</div>
 </div>
  )
}

export default Login