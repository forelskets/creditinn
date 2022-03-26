import React, { useEffect, useState } from 'react';
import PaiChart from '../frontPage/chart/PaiChart';

const Calculate = () => {
     const [amount , setAmount] =useState('20000');
     const [rate , setRate] = useState('2');
     const [months , setMonths] = useState('10');
     const [total , setTotal] = useState('');

     const data = [
        { name: 'Loan Amount', value: parseInt(amount) },
        { name: 'Per Month Emi', value: parseInt(total) },
      
      ];

        // Extracting value in the amount
        
    
        // Calculating interest per month
    
        
        // Calculating total payment
        // const total1 = (amount , month , interest) =>{
        //     return(
        //         <>
        //         ;
        //         </>
        //     )
        // }
        
        useEffect(()=>{
              console.log('ffff')
            if(rate && months && amount){
                 const interest = (amount * (rate * 0.01)) / months ;
                console.log(amount , months , interest);
                setTotal(((amount / months) + interest).toFixed(2));
            }else {
                setTotal('')
            }
        },[rate ,amount , months  ])
    
       console.log(rate , amount , months ,'oooo')

      
    
    
    return (
        <>

            {/* <div id="ecww-widgetwrapper" style={{ minWidth: '250px', width: '100%' }}>
                <div
                    id="ecww-widget"
                    style={{
                        position: 'relative',
                        paddingTop: '0',
                        paddingBottom: '280px',
                        height: '0',
                        overflow: 'hidden',
                    }}
                ></div>
            </div> */}
            {/* <div id="ecww-widget-iframeinner"></div> */}
         
            <div className="calculator ">
		<h1>Loan Calculator</h1>
        <div className='row d-flex'>
            <div className='col mx-3'>
            

		<p>Amount (₹) 	:
			<input id="amount" type="number" className='form-control' defaultValue={20000}
			onChange={(e)=>setAmount(e.target.value)} />
		</p>

		<p>Interest Rate :
			<input id="rate" type="number" className='form-control' defaultValue={2}
			onChange={(e)=>setRate(e.target.value)} />
		</p>

		<p>Months to Pay :
			<input id="months" type="number" className='form-control' defaultValue={10}
			onChange={(e)=>setMonths(e.target.value)} />
		</p>

	<p style={{backgroundColor: '#00000'}}>{total ? `EMI : (₹) + ${total}` : ''} </p>
	
             </div>
             <div className="col">
        <PaiChart data = {data} />
           </div>
        </div>
    </div>  
     </>
    );
};

export default Calculate;
