import {SET_APPLICATIONS, SET_APPROVE_APPLICATIONS, SET_PENDING_APPLICATIONS, SET_REJECT_APPLICATIONS} from '../types/TableType'
const initState = {
    applications:[],
    approveApplications:'',
    pendingApplications:'',
    rejectApplications:''
}

const TablesReqReducer = (state = initState , action) =>{
    if(action.type === SET_APPLICATIONS){
        return {...state , applications:  action.payload}
    }else if(action.type === SET_APPROVE_APPLICATIONS){
        return {...state , approveApplications:  action.payload}
    }else if(action.type === SET_PENDING_APPLICATIONS){
        return {...state , pendingApplications:  action.payload}
    }else if(action.type === SET_REJECT_APPLICATIONS){
        return {...state , rejectApplications:  action.payload}
    }else {
        return state
    }
}

export default TablesReqReducer