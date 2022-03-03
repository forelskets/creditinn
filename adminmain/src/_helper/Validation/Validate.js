import { rules } from './Rules'
export const Validate = (fields, frule) => {
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