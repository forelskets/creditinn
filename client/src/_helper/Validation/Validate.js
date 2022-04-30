import { rules } from './Rules'
export const Validate = (fields, frule) => {
    console.log(fields,'fields');
    console.log(frule,'frule');
    let error = {}
    if(Array.isArray(fields)){
        fields.map((key) => {
            let rule = ""
            console.log(Object.keys(key)[0],"key");
            console.log(key,"key values");
            console.log(Object.values(key)[0],"key values 1");
            Array.isArray(frule) && frule.map((obj) => {
                if (Object.keys(key)[0] === obj.field) {
                    rule = obj
                }
            })
            if (rule !== "") {
                error = {
                    ...error, [Object.keys(key)[0]]: rules(Object.values(key)[0], rule)
                }
            }
        })
    }else{
    Object.keys(fields).map((key) => {
        let rule = ""
        Array.isArray(frule) && frule.map((obj) => {
            if (key === obj.field) {
                rule = obj
            }
        })
        if (rule !== "") {
            error = {
                ...error, [key]: rules(fields[key], rule)
            }
        }
    })}
    return error
}

