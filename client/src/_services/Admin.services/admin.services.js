import { Api } from '../../_helper/service_helper/service_helper'
export const service = async (obj) => {
    let res =await Api('POST', '/service', obj)
    console.log("res",res)
    return res
}

export const AllService = async (obj) => {
    let res =await Api('GET', '/service', obj)
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