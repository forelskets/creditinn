import { Api } from '../../_helper/service_helper/service_helper';


export const AllUsers = async (obj) => {
    let res =await Api('GET', '/user/getAllUsers', obj)
    console.log("res",res)
    return res
}

export const ChangeStatus = async (id , obj) => {
    console.log("pppp")
    let res =await Api('PUT', `/user/update/${id}`, obj)
    console.log("res",res)
    return res
}

export const AllRefrals = async (obj) => {
    let res =await Api('GET', '/user/getAllRefrals', obj)
    console.log("res",res)
    return res
}

export const Products = async (obj) => {
    let res =await Api('GET', '/user/getAllProducts', obj)
    console.log("res",res)
    return res
}

export const AdminLogin = async (obj) => {

    console.log(obj,'oobbjj')
    let res =await Api('POST', '/admin/login', obj)
    console.log("res",res)
    return res
}
export const getAllUserEmis = async(obj)=>{
    let res = await Api("GET" , "/useremi" , obj)
    console.log("res" , res)
    return res
}

export const getSettingList = async(obj)=>{
    let res = await Api("GET" , "/admin/settingList" , obj)
    console.log("res" , res)
    return res
}

export const UpdateSettingList = async(obj)=>{
    let res = await Api("POST" , "/admin/settingUpdate" , obj)
    console.log("res" , res)
    return res
}


export const addLoan = async(obj , id)=>{
    let res = await Api("POST" , `/useremi/loan/${id}` , obj)
    console.log("res" , res)
    return res
}

export const addInsurance = async(obj , id)=>{
    let res = await Api("POST" , `/useremi/insurance/${id}` , obj)
    console.log("res" , res)
    return res
}

export const addCreditCard = async(obj , id)=>{
    let res = await Api("POST" , `/useremi/creditCard/${id}` , obj)
    console.log("res" , res)
    return res
}

