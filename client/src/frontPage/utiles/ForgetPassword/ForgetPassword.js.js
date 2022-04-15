import { Box, Paper, Container, TextField , Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React,{useState , useEffect} from "react";
import { useHistory } from "react-router-dom";
import { Validate } from "../../../_helper/Validation/Validate";
import { otpEmail ,matchOTP  , PassUpdate} from "../../../_services/Client.Service";

const useStyle = makeStyles({
  root: {
    
    width: "100vw",
    height: "100vh",
  },
  inputdiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
   
    width: "100vw",
    height: "100vh",
  },
  inputbox:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      padding: '10px', 
  }
});

const Emailfun = (props) =>{
  const [email , setEmail] = useState("");
  const [message , setMessage] = useState("");
    const classes = useStyle();
    
    
    const SENDEMAIL = async () =>{
        const response = await otpEmail({email});
        console.log('sdh');
        if(response.status === 1)
        {
          console.log(response.message,"sendEmail to otp")
          props.emailvar(false , response.message , response.data); 
        }else{
          setMessage(response.message)
        }

       
    }

    
    
    return (
        <Box component={Paper} width={500} height={200} selfAlign="center">
          <Box className={classes.inputbox}>
            <TextField label="Enter Your Email" color="secondary" onChange={(e)=>setEmail(e.target.value)}/>
          </Box>
          <Box className={classes.inputbox}>
            {/* <TextField label="Outlined secondary" color="secondary" /> */}
            <Button variant="outlined" onClick={SENDEMAIL}> Send Email</Button>
          </Box>
          {message ? <Typography>{message}</Typography> : ""}
        </Box>
    )
}

const Otpfun = (props) =>{
  const [otp , setOtp] = useState("");
  const history = useHistory();
    const classes = useStyle();
    const [message , setMessage] = useState(props.message);
    const [passwordInput , setPasswordInput] = useState(false)
    const [password , setPassword] = useState("");
    const [cpassword , setCpassword] = useState("");
    const [error , setError] = useState({});
    

    const SENDOTP = async () =>{
      const Email = props.data.Email;
      const Mobile = props.data.Mobile;
      const Code = otp;
      const response = await matchOTP({Email , Mobile ,Code });
      if(response.status === 1){
        setPasswordInput(true);
      }
      else{
        setMessage(response.message);
      }
    }

const UPDATEPASSWORD = async () =>{
  if(password && cpassword && password === cpassword){
    const Password = password;
    console.log(Password , cpassword ,"cccppppppcpcp");

    let passObj = {password : password}
    let obj = Validate(passObj , rules)
    setError(obj)
    console.log(obj,"obj.password")
    if(obj.password === ""){
      const response = await PassUpdate({Email: props.data.Email , Password})
      if(response.status === 1){
        setMessage(response.message);
        setTimeout(()=>{
         history.push('/');
        }, 3000)
            
      }else{
           setMessage(response.message)
      }
    }
   
  
  }else{
    setMessage("password and Confirm password is not matching")
  }
}


    return (
      <>
        
        {passwordInput ? (<Box component={Paper} width={500} height={200} selfAlign="center">
          <Box className={classes.inputbox}>
            <TextField label="Enter Your Password"  onChange={(e)=>{setPassword(e.target.value)}}/>
          </Box>
          {error.password && (<div className="error-msg">{error.password}</div>) }
          <Box className={classes.inputbox}>
            <TextField label="Enter Your Confirm-Password"  onChange={(e)=>{setCpassword(e.target.value)}}/>
          </Box>
          <Box className={classes.inputbox}>
            {/* <TextField label="Outlined secondary" color="secondary" /> */}
            <Button variant="outlined"  onClick={UPDATEPASSWORD}>UPDATE PASSWORD</Button>
          </Box>
          {message ? <Typography>{message}</Typography> : ""}
          
        </Box>):(<Box component={Paper} width={500} height={200} selfAlign="center">
          <Box className={classes.inputbox}>
            <TextField label="Enter Your OTP" onChange={(e)=>{setOtp(e.target.value)}}/>
          </Box>
          <Box className={classes.inputbox}>
            {/* <TextField label="Outlined secondary" color="secondary" /> */}
            <Button variant="outlined" onClick={SENDOTP}>SEND OTP</Button>
          </Box>
          {message ? <Typography>{message}</Typography> : ""}
          
        </Box>)}
        </>
    )
}

const ForgetPassword = () => {
    const [emailcount , setEmailcount] = useState(true);
    const [message , setMessage] = useState('')
    const [data , setData] = useState({});

    const EmailVar = (value , msg , userData) =>{
      setMessage(msg);
      setData(userData);
       setEmailcount(value);
    }
    console.log(message , "message otp")
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <div className={classes.inputdiv}>
          {emailcount ? <Emailfun emailvar = {EmailVar}/> :<Otpfun message={message} data = {data}/>}
           
      </div>
    </div>
  );
};

export default ForgetPassword;

const rules = [
  {
    field: "password",
    fieldNam:"Password",
    type: "password",
    required: true
  }
]
