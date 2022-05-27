const mongoose =require('mongoose');
 const WishList = require('../models/wishlist')
exports.getAllWishList = async (req , res , next) =>{
    console.log("getAllWishList")
    try {
        const result = await WishList.find({})
        .populate(['UserId']).sort({_id:"asc"});
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