import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';
import {useSelector , useDispatch} from 'react-redux'
import { useEffect ,useState } from 'react';

import { SET_APPROVE_APPLICATIONS, SET_PENDING_APPLICATIONS, SET_REJECT_APPLICATIONS } from 'src/store/types/TableType';
// ----------------------------------------------------------------------



export default function AppWebsiteVisits() {
  const dispatch = useDispatch()
  const [CHART_DATA , setCHART_DATA] = useState([]);
  let userData = []
  let applicationsData = []
  let applicationApprove = []
  let PendingCount = 0
  let RejectCount = 0
  let ApproveCount = 0
  
  const {usersarray} = useSelector(state => state.AuthReducer)
  const {applications} = useSelector(state => state.TablesReqReducer)
      console.log(usersarray , "USERSaRRAY")
      
      const getChartData = () =>{
        for(let i = 0 ; i < 12 ; i++){
          let count = 0
          usersarray.map((user , ind) =>{
            const date = new Date(user.createdAt)
            const month = date.getMonth();
            if(month === i){
              count++;
            console.log(date.getMonth() ,i )
            }
          })
          userData[i] = count
        }

        console.log(applications , "application")
        for(let i = 0 ; i < 12 ; i++){
          let applicationscount = 0
          let ApprovedCount = 0
          
          applications.map((application , ind) =>{
            const date = new Date(application.createdAt)
            const month = date.getMonth();
            if(month === i){
              applicationscount++;
              if(application.status === "Approved"){
                  ApprovedCount++;
                  ApproveCount++;
              }else  if(application.status === "pending"){
                PendingCount++;
            }
            else  if(application.status === "Reject"){
              RejectCount++;
          }
            console.log(date.getMonth() ,i )
            }
          })
          applicationsData[i] = applicationscount
          applicationApprove[i] = ApprovedCount
         

        }
        dispatch({type: SET_PENDING_APPLICATIONS , payload:PendingCount})
        dispatch({type: SET_APPROVE_APPLICATIONS , payload:ApproveCount})
        dispatch({type: SET_REJECT_APPLICATIONS , payload:RejectCount})
        console.log(applicationsData  , "applicatondata" , applicationApprove , "applicationApprove" , PendingCount , "PendingApplication" , RejectCount , "RejectApplication" , ApproveCount , "Approvecount")
       
         setCHART_DATA([
          {
            name: 'User Per Month',
            type: 'column',
            data: userData
          },
          {
            name: 'Application Applied',
            type: 'area',
            data: applicationsData
          },
          {
            name: 'Application Approved',
            type: 'line',
            data: applicationApprove
          }
        ]);
      }
      
      useEffect(()=>{
       if(usersarray && applications )
              getChartData()
        
      },[usersarray , applications])

    

   const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'


    ],
    xaxis: { type: 'month' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} Total `;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Users & Applications Analytics"  />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
