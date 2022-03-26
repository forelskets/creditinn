import { Api } from "../../_helper/service_helper/service_helper";

export const  myrefral = async (id) =>{
    console.log(id,'ui')
    let res = await Api('GET' ,`/user/referral-count/${id}`)
    return res ;
}