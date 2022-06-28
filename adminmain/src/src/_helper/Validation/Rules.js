export const rules = (field, rule) => {
    let message = ""
    if (field === "" || field === null ||(Array.isArray(field) && field.length === 0)) {
        message = rule.fieldName + " is Required!"
    }
    return message
}  