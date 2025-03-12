import React, { useState } from 'react';
import { FaUser, FaLock} from "react-icons/fa";
import './styles.css'
import './template.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Constant from '../../Constant';
import Validation from './LoginValidation'; 


    const Login = () => {
        const [values, setValues] = useState({
          email: '',
          password: '',
        });
      
        const [errors, setErrors] = useState({});
        const navigate = useNavigate();
        const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
        const [showForgotPassword, setShowForgotPassword] = useState(false);
      
        const handleInput = (event) => {
          setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
        };
      
        const handleSubmit = async (event) => {
          event.preventDefault();
          setErrors(Validation(values));
      
          if (errors.email === '' && errors.password === '') {
            try {
              const res = await axios.post(Constant.URLs.ApiUrl + '/loginn', values);
      
              if (res.data === 'login successfully') {
                navigate('/Navbar');
              } else {
                alert('No record');
              }
            } catch (error) {
              if (error.response && error.response.status === 404) {
                alert('User not found. Please check your email address.');
              } else {
                console.error('Error:', error);
              }
            }
          }
        };
      
        const handleForgotPasswordEmail = (event) => {
          setForgotPasswordEmail(event.target.value);
        };
      
        const handleForgotPasswordSubmit = (event) => {
          event.preventDefault();
      
          axios
            .post(Constant.URLs.ApiUrl + '/forgot-passwordd', { email: forgotPasswordEmail })
            .then((res) => {
              console.log(res.data);
              alert(res.data.message);
            })
            .catch((error) => {
              console.error('Error initiating forgot password:', error);
            });
        };
      
        const toggleForgotPassword = () => {
          setShowForgotPassword(!showForgotPassword);
    
          setForgotPasswordEmail('');
        };
      
        return (
          <div className="bg">
            <div class="form-container">
              {showForgotPassword ? (
                <div>
                  <p class="title">Forgot Password</p>
                  <form class="form" onSubmit={handleForgotPasswordSubmit}>
                    <div class="input-group">
                      <input type="text" name="forgotPasswordEmail" placeholder="Enter your email" value={forgotPasswordEmail} onChange={handleForgotPasswordEmail}/>
                    </div>
                    <button type="submit" class="sign">
                      Submit
                    </button>
                  </form>
                  <p class="signup" onClick={toggleForgotPassword}>
                    Remembered your password? <span className="oho">Login</span>
                  </p>
                </div>
              ) : (
                <div>
                  <p class="title">Login</p>
                  <form class="form" onSubmit={handleSubmit}>
                    <div class="input-group">
                      <input type="text" name="email" placeholder="Email" value={values.email} onChange={handleInput}/>
                      {errors.email && <span className="text-danger">{errors.email}</span>}
                      <FaUser className="icon" />
                    </div>
      
                    <div class="input-group">
                      <input type="password" name="password" placeholder="Password" value={values.password} onChange={handleInput}/>
                      {errors.password && <span className="text-danger">{errors.password}</span>}
                      <FaLock className="icon" />
                    </div>
      
                    <div className="remember-forgot">
                      <label>
                        <input type="checkbox" /> Remember Me
                      </label>
                    </div>
      
                    <button type="submit" class="sign">
                      Sign in
                    </button>
                  </form>
      
                  <p class="signup">
                    Don't have an account? <Link to="/Signupp" className="oho">Signup</Link>{' '}
                  </p>
                  <p class="signup" onClick={toggleForgotPassword}>
                    Forgot your password? <span className="oho">Reset here</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      };
      
      export default Login;
      
