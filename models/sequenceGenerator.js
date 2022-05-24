const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const sequenceSchema = new Schema({
    TransactionNo :{
        type: Number,
        unique: true,
        require : true

    }
})

const Sequence = new mongoose.model('sequence' , sequenceSchema)
module.exports = Sequence;