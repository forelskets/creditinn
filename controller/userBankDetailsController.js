const UserBankDetails = require('../models/userBankDetails');

exports.getUserBankDetails = async (req , res , next)=>{
    console.log("getUserBankDetails");
    try{
        var result = await UserBankDetails.find({})
        console.log(result, "result")
        if(result && result.length > 0){
            return res.send({
                status : 1,
                message: 'success',
                data : result
            })
        }else {
            return res.send({
                status: 0,
                message : 'no_record_found'
            });
        }
    }catch (error){
        return res.send({
            status: 0,
            message : 'something_went_wrong'
        });
    }

}