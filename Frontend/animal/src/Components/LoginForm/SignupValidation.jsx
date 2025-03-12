function Validation(values) {
    let errors = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const mobileNumberRegex = /^[0-9]{10}$/

    if (values.first_name === "") {
        errors.first_name = "Name is Required" 
    }
    else {
        errors.first_name = ""
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

    if (values.email === "") {
        errors.email = "Email is Required" 
    }
    else if (!email_pattern.test(values.email)){
        errors.email = "Enter Valid Email"
    }
    else {
        errors.email = ""
    }

    if (values.password === "") {
        errors.password = "Password is Required" 
    }
    //else if (!passwordPattern.test(values.password)){
      //  errors.password = "Password Must be 8 Digit"
    //}
    else {
        errors.password = ""
    }
    return errors;
}
export default Validation;