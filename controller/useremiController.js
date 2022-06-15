const  mongoose = require('mongoose')
const Useremi = require('../models/useremi')

exports.getAllUserEmis = async (req , res , next)=>{
    console.log("getAllUserEmis")
    try {
        const result = await Useremi.find({})
        if(result && result.length > 0){
            return res.send({
                status:1,
                data: result,
                msg: 'success'
            })
        } else {
            return res.send({
                status:0,
                msg: "fail"
            })
        }
    } catch (error) {
        console.log(error)
        return res.send({
            status:0,
            msg: "something_is_wrong"
        })
        
    }
}

exports.addLoan = async(req , res , next) =>{
    console.log("addLoan")
    const {id} = req.params
    console.log(id , "idddd")

     try {
         const result = await Useremi({
             UserId:mongoose.Types.ObjectId(id),
             BankName:req.body.BankName,
             Category:"Loans",
             EmiAmount:req.body.EmiAmount,
             Type:req.body.Type,
             EmiDate:req.body.EmiDate,
             EndDate:req.body.EndDate
         })
         const addData = await result.save();
         if(addData){
             return res.send({
                 status: 1,
                 msg:"data_add_successfully"
             })
         }else {
             return res.send({
                 status: 0,
                 msg: "fail_to_add"
             })
         }
     } catch (error) {
         console.log(error)
        return res.send({
            status: 0,
            msg: "technical_issues"
        })
     }
}

exports.addInsurance = async(req , res , next) =>{
    console.log("addInsurance")
    const {id} = req.params
    console.log(id , "idddd")
    console.log(req.body.InsuranceType , "insuranceType")
    try {
        const result = await Useremi({
            UserId:mongoose.Types.ObjectId(id),
            ProviderName: req.body.ProviderName,
            Category:"Insurances",
            EmiAmount: req.body.EmiAmount,
            Type:req.body.Type,
            EmiDate:req.body.EmiDate,
            EndDate:req.body.EndDate
        })
        const addData = await result.save();
        if(addData){
            return res.send({
                status: 1,
                msg:"data_add_successfully"
            })
        }else {
            return res.send({
                status: 0,
                msg: "fail_to_add"
            })
        }
    } catch (error) {
        console.log(error)
       return res.send({
           status: 0,
           msg: "technical_issues"
       })
    }
}

exports.addCreditCard = async(req , res) =>{
    console.log("addInsurance")
    const {id} = req.params
    console.log(id , "idddd")
    console.log(req.body.EmiAmount , "emiamount")

    try {
        const result = await Useremi({
            UserId:mongoose.Types.ObjectId(id),
            BankName:req.body.BankName,
            Category:"Credit Cards",
            EmiAmount:req.body.EmiAmount,
            EmiDate:req.body.EmiDate,
           
        })
        const addData = await result.save();
        if(addData){
            return res.send({
                status: 1,
                msg:"data_add_successfully"
            })
        }else {
            return res.send({
                status: 0,
                msg: "fail_to_add"
            })
        }
    } catch (error) {
        console.log(error)
       return res.send({
           status: 0,
           msg: "technical_issues"
       })
    }
}