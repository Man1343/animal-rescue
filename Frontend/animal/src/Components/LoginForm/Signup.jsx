import React from 'react'
import axios from 'axios'
import './styles.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Validation from './SignupValidation'


const Signup = () => {
	const navigate = useNavigate()

	const [values, setValues] = useState({
		first_name: '',
		email: '',
		mobile_no: '',
		password: '',
		ootp:'',
	})

	const [isOtpSent, setIsOtpSent] = useState(false);
	const [errors,setErrors] = useState({})

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setValues((prevValues) => ({
		  ...prevValues,
		  [name]: value,
		}));
	  };

	const handleSendOtp = async () => {
		try {
		  const response = await axios.post('http://localhost:8081/send-otp', { email: values.email });
		  console.log(response);
		  setIsOtpSent(true);
		} catch (error) {
		  console.error('Error sending OTP:', error);
		}
	  };

	  const [otpVerificationStatus, setOtpVerificationStatus] = useState({
		success: false,
		message: '',
	  });

	const handleVerifyOtp = async () => {
		try {
		  const response = await axios.post('http://localhost:8081/verify-otp', { ootp: values.ootp });
		  setOtpVerificationStatus({
			success: response.data.success,
			message: response.data.message,
		  });
		  if (response.data.success) {
			try {
			  const signupResponse = await axios.post('http://localhost:8081/api/signup', values);
			  console.log(signupResponse.data);
			  navigate('/');
			} catch (signupError) {
			  console.error('Error signing up:', signupError);
			}
		  } 
		} catch (error) {
		  console.error('Error verifying OTP:', error);
		  setOtpVerificationStatus({
			success: false,
			message: 'Invalid Otp',
		  });
		}
	  };

	  const handleSubmit = async (event) => {
		event.preventDefault();
		setErrors(Validation(values));
	
		if (Object.values(errors).every((error) => error === '')) {
		  if (isOtpSent) {
			handleVerifyOtp();
		  } else {
			handleSendOtp();
		  }
		} else {
		  console.log('Form has validation errors');
		}
	  };

  return (
	<>
    <div className='bg'>
      <div class="form-container">
	    <p class="title">Signup For User</p>
		<form onSubmit={handleSubmit}>
  <div className="input-group">
    <input
      type="text"
      placeholder="Name"
      name="first_name"
      value={values.first_name}
      onChange={handleInputChange}
      disabled={isOtpSent}
    />
    {errors.first_name && <span className="no">{errors.first_name}</span>}
  </div>

  <div className="input-group">
    <input
      type="text"
      placeholder="Email"
      name="email"
      value={values.email}
      onChange={handleInputChange}
      disabled={isOtpSent}
    />
    {errors.email && <span className="no">{errors.email}</span>}
  </div>

  {isOtpSent && (
    <div className="input-grouup">
      <input
        type="text"
        value={values.ootp}
        placeholder="OTP"
        name="ootp"
        onChange={handleInputChange}
      />
      <button type="button" className="siggn" onClick={handleVerifyOtp}>
        Verify
      </button>
      {otpVerificationStatus.message && !otpVerificationStatus.success && (
        <div className="">{otpVerificationStatus.message}</div>
      )}
    </div>
  )}

  <div className="input-group">
    <input
      type="text"
      placeholder="Contact"
      name="mobile_no"
      value={values.mobile_no}
      onChange={handleInputChange}
      disabled={isOtpSent}
    />
    {errors.mobile_no && <span className="no">{errors.mobile_no}</span>}
  </div>

  <div className="input-group">
    <input
      type="password"
      placeholder="Password"
      name="password"
      value={values.password}
      onChange={handleInputChange}
      disabled={isOtpSent}
    />
    {errors.password && <span className="no">{errors.password}</span>}
  </div>

  <button type="submit" className="sign">
    Submit
  </button>
</form>
	
	<p class="signup">Already have an account? <Link to = '/' className='oho'>Login</Link></p>
    </div>
    </div>
	</>
  )
}

export default Signup;
