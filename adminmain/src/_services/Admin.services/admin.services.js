import { Api } from '../../_helper/service_helper/service_helper'
export const service = async (obj) => {
    let res =await Api('POST', '/service', obj)
    console.log("res",res)
    return res
}

export const AllService = async (obj) => {
    let res =await Api('GET', '/service/getList', obj)
    console.log("res",res)
    return res
}
export const AllCategory = async (obj) => {
    let res =await Api('GET', '/category', obj)
    console.log("res",res)
    return res
}

export const Updateservice = async (id , obj) => {
    let res =await Api('PUT', `/service/${id}`, obj)
    console.log("res",res)
    return res
}
export const ChangeServiceStatus = async (id , obj) => {
    let res = await Api('PUT' , `/service/status/${id}` , obj)
    console.log("res" , res)
    return res
}
export const ChangeOfferStatus = async (id , obj) => {
    let res = await Api('PUT' , `/bank-offer/status/${id}` , obj)
    console.log("res" , res)
    return res
}
export const ChangeBankStatus = async (id , obj) => {
    let res = await Api('PUT' , `/bank/status/${id}` , obj)
    console.log("res" , res)
    return res
}

export const Deleteservice = async (id , obj) => {
    let res =await Api('DELETE', `/service/${id}`, obj)
    console.log("res",res)
    return res
}

export const createBank = async (obj) => {
    let res =await Api('POST', '/bank', obj)
    console.log("res",res)
    return res
}

export const AllBank = async (obj) => {
    let res =await Api('GET', '/bank', obj)
    console.log("res",res)
    return res
}

export const UpdateBanks = async (id , obj) => {
    let res =await Api('PUT', `/bank/${id}`, obj)
    console.log("res",res)
    return res
}

export const DeleteBank = async (id , obj) => {
    let res =await Api('Delete', `/bank/${id}`, obj)
    console.log("res",res)
    return res
}

export const AllBankOffer = async (obj) => {
    let res =await Api('GET', '/bank-offer', obj)
    console.log("res",res)
    return res
}

export const saveBankOffer = async (obj) => {
    let res =await Api('POST', '/bank-offer', obj)
    console.log("res",res)
    return res
}

export const DeleteBankOffer = async (id , obj) => {
    let res =await Api('Delete', `/bank-offer/${id}`, obj)
    console.log("res",res)
    return res
}

export const Applications = async (obj) => {
    let res =await Api('GET', '/application', obj)
    console.log("res",res)
    return res
}



export const ApplicationsStateChange = async (id,obj) => {
    let res =await Api('PUT', '/application/status/'+id, obj)
    console.log("res",res)
    return res
}

export const allortCashback = async(obj) =>{
    let res = await Api('POST','/cashAndearning/create', obj)
    console.log("res",res)
    return res
}

export const getTransactionList = async(obj) =>{
    let res = await Api("GET", "/cashAndearning/getTransactionList", obj)
    console.log("res" , res)
    return res
}

export const getUserBankDetailsList = async(obj) =>{
    let res = await Api("GET", "/userBankDetails", obj)
    console.log("res" , res)
    return res
}

export const getAllWishList = async(obj)=>{
    let res = await Api("GET" , "/wishlist" , obj)
    console.log("res" , res)
    return res
}

export const getAllWithDrawls = async(obj)=>{
    let res = await Api("GET" , "/withdrawls" , obj)
    console.log("res" , res)
    return res
}

export const WithDrawlsStateChange = async(id , obj)=>{
    let res = await Api("PUT" , `/withdrawls/status/${id}` , obj)
    console.log("res" , res)
    return res
}

export const WithDrawlsUpdateTransaction = async(id , obj)=>{
    let res = await Api("PUT" , `/withdrawls/transaction/${id}` , obj)
    console.log("res" , res)
    return res
}



