const mongoose = require('mongoose');



mongoose.connect('mongodb+srv://creditinuser:creditinpassword@cluster0.8xhvd.mongodb.net/creditin?retryWrites=true&w=majority').then(() => {
    console.log("mongo connection Successful");
}).catch((err) => {
    console.log(err)
})

// mongoose.connect('mongodb+srv://doadmin:W6T3ecN0iA8s7529@db-mongodb-nyc3-52074-9aeb65f4.mongo.ondigitalocean.com/admin?authSource=admin&replicaSet=db-mongodb-nyc3-52074' ).then(() => {
//     console.log("mongo connection Successful");
// }).catch((err) => {
//     console.log(err)
// })
