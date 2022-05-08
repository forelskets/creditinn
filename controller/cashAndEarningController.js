const UserTransaton = require('../models/userTransaction')

exports.createUserTransaction = async (req , res , next) =>{
         try{
             const cashback1 = await UserTransaton({
                 userId: req.body.userId,
                 TransactionType: req.body.TransactionType,
                 CreditDebit: req.body.CreditDebit,
                 Amount:req.body.Amount
             });
             console.log(cashback1,"cashback")
             const cashback = cashback1.save();
             if(req.body.Earning !=="" && req.body.Earning !== undefined)
             {
                 const earning1 = await UserTransaton({
                 userId : req.body.refralId,
                 TransactionType : req.body.TransactionTypeEarning,
                 CreditDebit : req.body.CreditDebit,
                 Amount : req.body.Earning
             });
             const earning = earning1.save();
             console.log(earning1 ,"earning")

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