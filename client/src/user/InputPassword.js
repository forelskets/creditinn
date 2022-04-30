import React,{useState} from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const passwordCSS = {
    position: "absolute",
    top: "8px",
    right: "10px",
    zIndex: 1000,
    cursor:"pointer",
    border : 1
}

const InputPassword = () => {
    const [visible ,setVisible] = useState(true);
     
      
    
   
    const InputType = visible ? "text" : "password";

    const passwordIconHandler = ()=>{
        setVisible(!visible)
    }
  return (
    <div>InputPassword
        <input style={passwordCSS} type={InputType}/>
        <span  onClick={passwordIconHandler}>{visible ? <VisibilityIcon />:<VisibilityOffIcon />}</span>
    </div>
  )
}

export default InputPassword ;