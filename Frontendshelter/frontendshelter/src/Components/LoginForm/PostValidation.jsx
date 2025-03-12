function Validation(values) {
    let errors = {}

   const mobile_no = /^[0-9]{10}$/
   


    if (values.animal_name === "") {
        errors.animal_name = "Name of Animal is Required" 
    }
    else {
        errors.animal_name = ""
    }

    if (values.species === "") {
        errors.species = "Species is Required" 
    }
    else {
        errors.species = ""
    }

    if (values.age === "") {
        errors.age = "Age is Required" 
    }
    else {
        errors.age = ""
    }

    if (values.description === "") {
        errors.description = "Description is Required" 
    }
 
    else {
        errors.description = ""
    }

    if (values.mobile_no === "") {
        errors.mobile_no = "Mobile No is Required" 
    }
   else if (!mobile_no.test(values.mobile_no)){
       errors.mobile_no = "enter valid number"
    }
    else {
        errors.mobile_no = ""
    }

   
    if (values.email === "") {
        errors.email = "Email is Required" 
    }
 
    else {
        errors.Email = ""
    }
    return errors;
}

export default Validation;