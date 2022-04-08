import { Api } from '../../_helper/service_helper/service_helper';


export const AllUsers = async (obj) => {
    let res =await Api('GET', '/user/getAllUsers', obj)
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