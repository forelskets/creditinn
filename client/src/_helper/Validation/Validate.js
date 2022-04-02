import { rules } from './ApplyLoanRules'
export const Validate = (fields, frule) => {
    console.log(fields,'fields');
    console.log(frule,'frule');
    let error = {}
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
    })
    return error
}

