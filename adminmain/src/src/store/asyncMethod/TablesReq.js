import { Applications } from "src/_services/Admin.services"
import { SET_APPLICATIONS } from "../types/TableType"

export const getApplications = () =>{
    return async (dispatch)=>{
        let res = await Applications()
        console.log(res , "reeeee")
            if (res?.status === 1 && Array.isArray(res?.data?.applications)){
                console.log(res.data.applications,"raaaa")
                dispatch({type:SET_APPLICATIONS , payload: res?.data?.applications })
                return res?.data?.applications
        }
    }
   
}