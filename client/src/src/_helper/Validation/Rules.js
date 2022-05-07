export const rules = (field, rule) => {
    let message = ""
    if (field === "" || field === null || (Array.isArray(field) && field.length === 0)) {
        message = rule.fieldName + " is Required!"
        console.log('msssssggg')
    }else {
        console.log('mobile1111')
        var mob_regex = /^([+]\d{2})?\d{10}$/;
        if (rule.type === 'mobile' && !mob_regex.test(field)) {
            message = rule.fieldName + " number is not valid!"
        }else if(rule.type === 'email' && !validateEmail(field)){
            message = rule.fieldName + " is not valid!"
        }else if(rule.type === 'password'){
            let pass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            if(!pass.test(field)){
                message = 'Minimum eight characters, at least one letter, one number and one special character!'
            }
        } else if (rule.type === 'GST') {
            let gst_regex = /^[0-9]{2}[A-Za-z0-9]{13}$/;
            if(!gst_regex.test(field))
            message = rule.fieldName + " not correct"
        }else if (rule.type === 'PanNo') {
            var pan_regex = /^[a-zA-Z]{4}[a-zA-Z0-9]{6}$/;
            if(!pan_regex.test(field))
            message = rule.fieldName + " not correct"
        }else if(rule.type === 'Mobile'){
            var mobile_regex = /^[+91]?[8976][0-9]{9}$/;
            console.log(rule.type,'mobilee')
            if(!mobile_regex.test(field)){
                message = rule.fieldName + ' is not valid'
            }
        }
    }
    return message
}


const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };


 