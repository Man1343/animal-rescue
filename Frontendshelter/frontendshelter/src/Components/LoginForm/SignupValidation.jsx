function Validation(values) {
    let errors = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    //const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})$/
    const mobileNumberRegex = /^[0-9]{10}$/

    if (values.shelter_name === "") {
        errors.shelter_name = "Name is Required" 
    }
    else {
        errors.shelter_name = ""
    }
    
    if (values.email === "") {
        errors.email = "Email is Required" 
    }
    else if (!email_pattern.test(values.email)){
        errors.email = "Please Enter Valid Email"
    }
    else {
        errors.email = ""
    }

    if (values.mobile_no === "") {
        errors.mobile_no = "Contact is Required" 
    }
    else if (!mobileNumberRegex.test(values.mobile_no)){
        errors.mobile_no = "Enter Valid Number"
    }
    else {
        errors.mobile_no = ''
    }

  

    if (values.shelter_address === "") {
        errors.shelter_address = "Address is Required" 
    }
    else {
        errors.shelter_address = ""
    }

    if (values.password === "") {
        errors.password = "Password is Required" 
    }

    else {
        errors.password = ""
    }

   
    return errors;
}

export default Validation;