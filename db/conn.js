const mongoose = require('mongoose');



// mongoose.connect('mongodb+srv://creditinuser:creditinpassword@cluster0.8xhvd.mongodb.net/creditin?retryWrites=true&w=majority').then(() => {
//     console.log("mongo connection Successful");
// }).catch((err) => {
//     console.log(err)
// })

mongoose.connect('mongodb+srv://doadmin:4Z19JXp23Ic8d7x6@creditsin-580a594b.mongo.ondigitalocean.com/admin?tls=true&authSource=admin' ).then(() => {
    console.log("mongo connection Successful");
}).catch((err) => {
    console.log(err)
})
