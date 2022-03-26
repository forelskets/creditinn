import React , { useState , useEffect , useHistory }from 'react';
import { myrefral } from "../_services/Refral.services/index";
import { ApplicationsById } from "../_services/Admin.services";

var Success = 0;
const Status = () => {
    const [profile, setProfile] = useState({});
    const [lstatus, setLstatus] = useState(false);
    const [refralData, setRefralData] = useState([]);
    const [applicationData , setApplicationData] = useState([])
    const LoanFunc = () => {
      setLstatus(!lstatus);
    };
  
    useEffect(() => {
      Success = 1;
    }, []);
  
   
  
    if (Success === 1 && profile) {
      const getMyRefral = async (req, res) => {
        console.log(profile);
        console.log(profile._id);
        var response = await myrefral(profile._id);
        setRefralData(response.data.referraldata);
      };
      getMyRefral();
  
      const getApplications = async (req , res) =>{
        var response = await ApplicationsById(profile._id);
        setApplicationData(response.data.service)
        
      }
  
      getApplications();
  
      Success = 0;
    }
  
  return (
    
    
  <div className="container contact">
     
    
    <div className="content mb-5">
      <h3>
          My Referrals
      </h3>
   <div className="col">
                    
                    <div className="row">
                      <h3>My Referrals</h3>
                    <div className="col">
                      <table className="table">
                        <thead className="title" >
                          <tr>
                            <th >S.no.</th>
                            <th >Name</th>
                            <th >Email</th></tr>
                        </thead>
                        <tbody>
                          {refralData.map((item , ind)=>{
                             return(
                              <>
                               <tr>
                            <td>{ind + 1}</td>
                            <td>{item.Name}</td>
                             <td>{item.Email}</td> 
                            {/* <td>{item.RefralNo}</td> */}
                          </tr>
                              </>
                            )
                          })}
                         
                        </tbody>
                      </table>
                    
                  </div>
                  
                    </div>
                    <div className="row">
                      <h3>Application Table</h3>
                    <div className="col">
                      <table className="table">
                        <thead className="title" >
                          <tr>
                            <th >S.no.</th>
                            <th >Application No.</th>
                            <th >Status</th></tr>
                        </thead>
                        <tbody>
                          {applicationData.map((item , ind)=>{
                             return(
                              <>
                               <tr>
                            <td>{ind + 1}</td>
                            <td>{item.ApplicationNo}</td>
                             <td>{item.status}</td> 
                            {/* <td>{item.RefralNo}</td> */}
                          </tr>
                              </>
                            )
                          })}
                         
                        </tbody>
                      </table>
                    
                  </div>
                  
                    </div>
                </div>
                
  </div>
  
</div>

  );
};

export default Status;

