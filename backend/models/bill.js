const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
     },
    num: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    type: {
        type: String
    },
    coupon: {
        type: String
    },
    totalQty: {
        type: Number,
        required: true
    },
    totalAmt: {
        type: Number,
        required: true
    },
    discount: {
        type: Number
    },
    discountRate: {
        type: Number
    },
    discountAmt: {
        type: Number
    }

})

const Bill = new mongoose.model("Bill", expenseSchema)

module.exports = Bill