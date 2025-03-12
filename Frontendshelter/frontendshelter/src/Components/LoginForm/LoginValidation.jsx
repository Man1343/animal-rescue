function Validation(values) {
    let errors = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
   // const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
   


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
  //  else if (!password_pattern.test(values.password)){
    //    errors.password = "password didnt match"
    //}
    else {
        errors.password = ""
    }
    return errors;
}

export default Validation;