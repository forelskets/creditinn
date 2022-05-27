const mongoose =require('mongoose');
 const Withdrawls = require('../models/withdrawls')
exports.getAllWithdrawls = async (req , res , next) =>{
    console.log("getAllWithdrawls")
    try {
        const result = await Withdrawls.find({})
        .populate(['UserId' , 'BankId']).sort({_id:"asc"});
        if(result && result.length > 0){
            return res.send({
                status : 1 ,
                data: result,
                msg: "success"
            })
        }else {
            return res.send({
                status : 0 ,
                
                msg: "fail"
            })
        }
    } catch (error) {
        console.log(error)
        return res.send({
            status : 0 ,
            
            msg: "something_is_wrong"
        })
    }

}

exports.updateStatus = async (req , res , next) =>{
    console.log("WithdrawlsupdateStatus")
    const {status} = req.body;
    const {id} = req.params;
    try {
        const result = await Withdrawls.findByIdAndUpdate(id , {Status :status},{upsert : true});
        
        if(result ){
            return res.send({
                status : 1 ,
                
                msg: "successfully updated status"
            })
        }else {
            return res.send({
                status : 0 ,
                
                msg: "fail to updated status"
            })
        }
    } catch (error) {
        console.log(error)
        return res.send({
            status : 0 ,
            
            msg: "something_is_wrong"
        })
    }

}

exports.updateTransaction = async (req , res , next) =>{
    console.log("WithdrawlsupdateStatus")
    const {transaction} = req.body;
    const {id} = req.params;
    console.log(id)
    try {
        const result = await Withdrawls.findByIdAndUpdate(id , {TransactionNo :transaction},{upsert : true});
        
        if(result ){
            return res.send({
                status : 1 ,
                
                msg: "successfully updated status"
            })
        }else {
            return res.send({
                status : 0 ,
                
                msg: "fail to updated status"
            })
        }
    } catch (error) {
        console.log(error)
        return res.send({
            status : 0 ,
            
            msg: "something_is_wrong"
        })
    }

}