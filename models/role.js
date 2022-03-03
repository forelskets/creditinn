const mongoose = require('mongoose');
const roleSchema = new mongoose.Schema({
     
    RoleId:{
            type: Number,
            required: true
        },
   Name:{                          
           type:String,             
           required: true          
          },
    Status:{
        type:Boolean,
        require: true
    },
     
   
}, {timestamps : true }  
)

const Role = new mongoose.model('role',roleSchema)

module.exports = Role;