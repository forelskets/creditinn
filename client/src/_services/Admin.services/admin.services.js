import { Api } from '../../_helper/service_helper/service_helper'
export const service = async (obj) => {
    let res =await Api('POST', '/service', obj)
    
    return res
}

export const AllService = async (search ,obj ) => {
    console.log(search , "allservice search");
    let res =await Api('GET', `/service?${search}`, obj)
    
    console.log("res",res)
    return res
}

export const createBank = async (obj) => {
    let res =await Api('POST', '/bank', obj)
   
    return res
}

export const AllBank = async (obj) => {
    let res =await Api('GET', '/bank', obj)
   
    return res
}

export const AllBankOffer = async (obj) => {
    let res =await Api('GET', '/bank-offer', obj)
   
    return res
}

export const saveBankOffer = async (obj) => {
    let res =await Api('POST', '/bank-offer', obj)
    return res
}

export const Applications = async (obj) => {
    let res =await Api('GET', '/application', obj)
    return res
}

export const ApplicationsById = async (id) => {
    let res =await Api('GET', `/application/${id}`)
    return res
}

export const ApplicationsStateChange = async (id,obj) => {
    let res =await Api('PUT', '/application/status/'+id, obj)
    return res
}

export const ShareRefralDataSave = async (id,obj) => {
    let res =await Api('POST', `/user/shareRefralDataStore/${id}`, obj)
    return res
}

export const productDataSave = async (id,obj) => {
    let res =await Api('POST', `/user/productDataSave/${id}`, obj)
    return res
}

export const ApplyLoans = async(id , obj) =>{
    let res = await Api("GET" , `/getLoanFormData/${id}` , obj)
    return res
}

