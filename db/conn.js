const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://creditinuser:creditinpassword@cluster0.8xhvd.mongodb.net/creditin?retryWrites=true&w=majority').then(()=>{
    console.log("mongo connection Successful");
}).catch((err)=>{
    console.log(err)
})