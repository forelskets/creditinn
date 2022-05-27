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