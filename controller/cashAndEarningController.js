const UserTransaton = require('../models/userTransaction')
const UserBankDetails = require('../models/userBankDetails')

exports.createUserTransaction = async (req , res , next) =>{
         try{

            const userbankdetails = await UserBankDetails.findOne({UserId : req.body.userId})
            const TransactionWalletCashback =  parseInt(userbankdetails?.Wallet || 0)  + parseInt(req.body.Amount)
            const TransactionWalletEarning =  parseInt(userbankdetails?.Wallet || 0)  + parseInt(req.body.Amount)
             const cashback1 = await UserTransaton({
                 userId: req.body.userId,
                 TransactionType: req.body.TransactionType,
                 CreditDebit: req.body.CreditDebit,
                 Amount:req.body.Amount,
                 TransactionWallet: TransactionWalletCashback
             });
             console.log(cashback1,"cashback")
             const cashback = cashback1.save();
             console.log(req.body.userId , "userId")
             
             if(userbankdetails){
                 console.log(userbankdetails.Wallet , "wallet")
             const wallet = parseInt(userbankdetails?.Wallet || 0)   + parseInt(req.body.Amount);
              console.log(wallet , "wallet")
             const userBankDetailsUpdated = await UserBankDetails.findOneAndUpdate({UserId : req.body.userId},{Wallet : wallet},{upsert: true});
               console.log(userBankDetailsUpdated , "userBankDetails")
             }
             if(req.body.Earning !=="" && req.body.Earning !== undefined)
             {
                 const earning1 = await UserTransaton({
                 UserId : req.body.refralId,
                 TransactionType : req.body.TransactionTypeEarning,
                 CreditDebit : req.body.CreditDebit,
                 Amount : req.body.Earning,
                 TransactionWallet: TransactionWalletEarning
             });
             const earning = earning1.save();
             console.log(earning1 ,"earning")
             const userbankdetails = await UserBankDetails.findOne({UserId : req.body.userId})
             if(userbankdetails){
                 
             const wallet = parseInt(userbankdetails?.Wallet || 0)   + parseInt(req.body.Amount);
             
             const userBankDetailsUpdated = await UserBankDetails.findOneAndUpdate({userId : req.body.refralId},{Wallet : wallet},{upsert:true});
             
             }

             if(earning){
                return res.send({
                    status: 1,
                    message: 'allorted'
                })
            }else{
                return res.send({
                    status: 0,
                    message: 'not allorted'
                })
            }
            }
             if(cashback){
                 return res.send({
                     status: 1,
                     message: 'allorted'
                 })
             }else{
                 return res.send({
                     status: 0,
                     message: 'not allorted'
                 })
             }
         }catch(error){
             console.log('error' , error);
             return res.send({
                 status: 0,
                 message: 'something_went_wrong'
             })
         }
}


exports.getTransactionList = async (req , res , next) =>{
    try{
        const result = await UserTransaton.find()
        .populate(['userId'])
        .sort({_id : 'desc'});
        console.log("result" , result)
       
        if(result){
            return res.send({
                status: 1,
                data: result,
                message: 'success'
            })
        }else{
            return res.send({
                status: 0,
                message: 'not success'
            })
        }
    }catch(error){
        console.log('error' , error);
        return res.send({
            status: 0,
            message: 'something_went_wrong'
        })
    }
}