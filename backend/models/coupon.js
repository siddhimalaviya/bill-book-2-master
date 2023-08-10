const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    discount: {
        type: String,
        require: true
    },
    minamt: {
        type: Number,
        require: true
    },
    maxamt: {
        type: Number,
        require: true
    }

})

const Coupon = new mongoose.model("Coupon", couponSchema)

module.exports = Coupon