const mongoose = require("mongoose")

mongoose.connect("mongodb://0.0.0.0:27017/bill").then(()=>{
    console.log("connection Successfully");
}).catch((err)=>{
    console.log(err);
    console.log("No Connection");
})
