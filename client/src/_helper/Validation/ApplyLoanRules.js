export const rules = (field, rule) => {
    let message = ""
    if (field === "" || field === null || (Array.isArray(field) && field.length === 0)) {
        message = rule.fieldName + " is Required!"
    } else {
        
        if (rule.type === 'GST') {
            let gst_regex = /^[0-9]{2}[A-Za-z0-9]{13}$/;
            if(!gst_regex.test(field))
            message = rule.fieldName + " not correct"
        }else if (rule.type === 'PanNo') {
            var pan_regex = /^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]$/;
            if(!pan_regex.test(field))
            message = rule.fieldName + " not correct"
        }else if(rule.type === 'Mobile'){
            var mobile_regex = /^[+91]?[8976][0-9]{9}$/;
            if(!mobile_regex.test(field)){
                message = rule.fieldName + ' is not valid'
            }
        }
    } 
    return message
}