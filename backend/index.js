const express = require('express')
const app = express()
require('./db')
const port = process.env.PORT || 5000
var cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/bill',require('./routes/bills'))
app.use('/api/coupon',require('./routes/coupon'))


app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`);
})