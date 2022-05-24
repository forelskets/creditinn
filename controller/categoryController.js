
const Category = require('../models/category')

exports.getCategoryList = async (req , res , next) =>{
    try {
        const result = await Category.findById("62887f0edb981f5779fa8947")
        console.log(result , result.length , "sssss")
        if (result && Object.keys(result).length > 0){
           return res.send({
                status : 1,
                msg: "success",
                data: result
            })
        }
        else {
           return res.send({
                status : 0,
                msg: "id not found",
                // data: result
            })
        }
    } catch (error) {
        console.log(error)
        return res.send({
            status : 0,
            msg: "something technical problem",
           
        })
    }

}