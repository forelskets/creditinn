import toastr from "toastr"
export const Api = async (method, api, Obj) => {
    try {
        let APIOBJ = {}
    if (["POST", "PUT"].includes(method)) {
        APIOBJ = {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(Obj),
        }
    } else {
        APIOBJ = {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }
    }
        const response = await fetch(api, APIOBJ);
        return await response.json()
    } catch (error) {
        toastr.error("Something went wrong")
    }
}