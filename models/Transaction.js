const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    amount:{
        type:Number,
        required: true,
        
    },
    type:{
        type:String,
        enum : ['DEPOSIT','WITHDRAWAL'],
        required : true
    },
    status:{
        type: String,
        enum : ['PENDING','COMPLETED','FAILED'],
        required: true
    },
    user: {
        type:Number,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Transaction',transactionSchema)