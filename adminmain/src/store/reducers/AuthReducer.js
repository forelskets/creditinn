import jwt_decoder from 'jwt-decode';
import { USERSARRAY , CLOSE_LOADER , LOGIN_ERRORS, SET_LOADER , SET_TOKEN , SET_MESSAGE , REMOVE_MESSAGE, SET_ADMIN} from '../types/AdminTypes';

const initState = {
    loading : false,
    loginErrors:[],
    token:'',
    admin:'',
    message:'',
    usersarray:[]
}

const verifyToken = (token) =>{
    const decodeToken = jwt_decoder(token);
    const expiresIn = new Date(decodeToken.exp * 1000);
    if(new Date() > expiresIn){
        localStorage.removeItem('adminLogin');
        return null;
    }else {
        return decodeToken
    }
}

const token = localStorage.getItem('adminLogin');
if(token){
    const decoded = verifyToken(token);
    
    console.log(decoded , "decoded")
    if(decoded){
        initState.token = token;
        const {admin} = decoded;
        initState.admin = admin; 
    }
 }

 const AuthReducer = (state= initState , action) =>{
     if(action.type === SET_LOADER){
         return {...state , loading:true}
     }else if(action.type === CLOSE_LOADER){
         return {...state , loading: false}
     }else if(action.type === LOGIN_ERRORS){
         return {...state , loginErrors: action.payload}
     }else if(action.type === SET_TOKEN){
         return {...state , token: action.payload}
     }else if(action.type === SET_ADMIN){
        return {...state , admin: action.payload}
    }else if(action.type === SET_MESSAGE){
         return {...state , message: action.payload}
     }else if(action.type === REMOVE_MESSAGE){
         return {...state , message:''}
     }else if(action.type === USERSARRAY){
        return {...state , usersarray: action.payload}
    }else {
         return state;
     }
 }

 export default AuthReducer;