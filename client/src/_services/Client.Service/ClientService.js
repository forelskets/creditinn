import { NoAUTH_API } from '../../_helper/service_helper/service_helper'
export const registerService = async (obj) => {
    let res =await NoAUTH_API('POST', '/userRegister', obj)
    console.log("res",res)
    return res
}

export const matchOTP = async (obj) => {
    let res =await NoAUTH_API('POST', '/matchOtp', obj)
    console.log("res",res)
    return res
}

export const sendOTP = async (obj) => {
    let res =await NoAUTH_API('POST', '/sendOtp', obj)
    console.log("res",res)
    return res
}
// export const AllService = async (obj) => {
//     let res =await NoAUTH_API('GET', '/service', obj)
//     console.log("res",res)
//     return res
// }