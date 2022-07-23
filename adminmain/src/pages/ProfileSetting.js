import React , {useEffect, useState , useRef} from 'react';
import jwt_decoder from 'jwt-decode';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import {useSelector , useDispatch} from 'react-redux'
import toast, { Toaster } from 'react-hot-toast';
import { SET_ADMIN, SET_TOKEN, UPDATE_ADMIN } from 'src/store/types/AdminTypes';
import {useParams} from 'react-router-dom'
import JoditEditor from 'jodit-react';
import { getSettingList , UpdateSettingList ,  UpdateTextEditor} from 'src/_services/Admin.services';
import { Grid, Typography } from '@mui/material';

const ProfileSetting = () => {
  const editor = useRef(null)
 
     const {id} = useParams()
    const dispatch = useDispatch();
    const {admin} = useSelector(state => state.AuthReducer)
    const [editorData , setEditorData] =  useState('')
    const [name , setName] = useState(admin.Name)
    const [email , setEmail] = useState(admin.Email)
    const [mobile , setMobile] = useState(admin.Mobile)
    const [password , setPassword] = useState('')
    const [cashbackreward , setCashbackreward] = useState('')
    const [minAmount , setMinAmount] = useState('')
    const [value, setValue] = useState(id);
    const [tEL , setTEL] = useState('')

    const handleChange = (event, newValue) => {
      setValue(newValue);
      
    };

    const ProfileUpdated = async () =>{
        const update1 =  await fetch('/admin/update',{
            method: "POST",
            headers:{
                Accept:"application/json",
                'Content-Type':'application/json'
            },
            credentials: 'include',
            body:JSON.stringify({name , email , mobile})
        })
        const update = await update1.json();
        
        if(update?.status === 1){
            localStorage.setItem('adminLogin' , update?.token)
            dispatch({type:SET_TOKEN , payload:update?.token})
          
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
            
            const token = localStorage.getItem('adminLogin')
            if(token){
                const decoded = verifyToken(token);
                if(decoded){
                   
                    const {admin} = decoded;
                    
                    dispatch({type:SET_ADMIN , payload: admin}) 
                }
             }
           
            toast.success(update?.msg);
        }else {
         
                toast.error(update?.msg);
         
        }
    }

    const getSettingListData = async () =>{
      const response = await getSettingList();

      console.log(response , "response")
      console.log(response?.data?.Cashbackreward , "responsecash")
      console.log(response?.data?.Minamount , "responseminAmount")
      if(response?.status === 1){
        setCashbackreward(response?.data?.Cashbackreward)
        setMinAmount(response?.data?.Minamount)
        setEditorData(response?.data?.RTEditor)
        setTEL(response?.data?.TEL)
      }else {
        toast.error(response?.msg);
      }
    }
  

    useEffect(()=>{
     setValue(id)
     getSettingListData()
  
    },[id])

    const SettingUpdated = async() =>{
      const response = await UpdateSettingList({cashbackreward , minAmount , RTEditor : editorData , TEL : tEL})
      if(response?.status === 1){
           getSettingListData();
           toast.success(response?.msg)
      }else{
        toast.error(response?.msg)
      }
    }

    
  
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
         <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              style: {
               fontSize : "14px",
              },
            }}
          />
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Item One" value="1" />
          <Tab label="Item Two" value="2" />
        
        </TabList>
      </Box>
      <TabPanel value="1">
          <Box container sx={{ml: 5}}>
          <Box  sx={{mt: 2}} item > 
             <TextField onChange={(e)=>setName(e.target.value)} value={name} label="Name" variant="filled" color="success"  />
              </Box>
              <Box sx={{mt: 2}} item> 
              <TextField onChange={(e)=>setMobile(e.target.value)} value={mobile} label="Mobile" variant="filled" color="success" />   
              </Box>
              <Box  sx={{mt: 2}} item>
              <TextField onChange={(e)=>setEmail(e.target.value)} value={email} label="Email" variant="filled" color="success" />
              </Box>
              <Box  sx={{mt: 2}} item>
              <TextField type="password"  onChange={()=>setPassword()} label="Password" variant="filled" color="success" />
              </Box>
              <Box  sx={{mt: 2}} item>
              <Button variant='contained' onClick={ProfileUpdated}>Update</Button>
              </Box>
          </Box>
      </TabPanel>
      <TabPanel value="2">
  <Grid container direction="row" >
    <Grid item lg={3}>
        <Box sx={{ml:5}}>
      <Box  sx={{mt: 2}} item > 
             <TextField onChange={(e)=>setCashbackreward(e.target.value)} value={cashbackreward} label="CashBackReward" variant="filled" color="success"  />
              </Box>
              <Box sx={{mt: 2}} item> 
              <TextField onChange={(e)=>setMinAmount(e.target.value)} value={minAmount} label="MinAmount" variant="filled" color="success" />   
              </Box>
              <Box sx={{mt: 2}} item> 
              <TextField onChange={(e)=>setTEL(e.target.value)} value={tEL} label="TEL" variant="filled" color="success" />   
              </Box>
              <Box  sx={{mt: 2}} item>
              <Button variant='contained' onClick={SettingUpdated}>Update</Button>
              </Box>
              </Box>
              </Grid>
              <Grid item container direction="column" alignItems="center" justifyContent="center" lg={9}>
                <Grid item>
                <JoditEditor ref={editor} onChange={(content)=> setEditorData(content)} value = {editorData}/>
                </Grid>
                
               
              </Grid>
</Grid>
      </TabPanel>
     
    </TabContext>
  </Box>
  )
}

export default ProfileSetting