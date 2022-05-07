import { Api } from "../../_helper/service_helper/service_helper"

export const customerSupport = async (obj) => {
    console.log(obj,'ooo')
    let res =await Api('POST', '/support/customerSupport', obj)
    console.log("res",res)
    return res
}

export const corporateSupport = async (obj) => {
    console.log(obj)
    let res =await Api('POST', '/support/corporateSupport', obj)
    console.log("res",res)
    return res
}