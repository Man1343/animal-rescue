function Validation(values) {
    let errors = {}
   // const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
   // const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
   const contact = /^[0-9]{10}$/
   


    if (values.address === "") {
        errors.address = "Address is Required" 
    }
    else {
        errors.email = ""
    }

    // if (values.photo_url === "") {
    //     errors.photo_url = "Photo is Required" 
    // }
    // else {
    //     errors.photo_url = ""
    // }

    if (values.email === "") {
        errors.email = "Email is Required" 
    }
    else {
        errors.email = ""
    }

    if (values.contact === "") {
        errors.contact = "Contact is Required" 
    }
   else if (!contact.test(values.contact)){
       errors.contact = "enter valid number"
    }
    else {
        errors.contact = ""
    }
    return errors;
}

export default Validation;