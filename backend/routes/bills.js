const express = require('express')
const router = new express.Router()
const Bill = require("../models/bill")
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');

router.post("/addBill", fetchuser, async (req, res) => {
    try {
        const { num, name, date, type, totalQty, totalAmt, discount, discountRate, discountAmt } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const bill = new Bill({ num, name, date, type, totalQty, totalAmt, discount, discountRate, discountAmt, user: req.user.id })
        const savedBill = await bill.save()
        res.json(savedBill);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error");
    }
})

router.get('/fetchAllBill', fetchuser, async (req, res) => {
    try {
        const billData = await Bill.find({user: req.user.id })
        res.send(billData)
    } catch (error) {
        res.send(error)
    }
})

router.delete('/deleteBill/:id', fetchuser, async (req, res) => {
    try {

        //Find the note to be delete and delete
        let note = await Bill.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }

        //Allow deletion only  if user owns this note
        note = await Bill.findByIdAndDelete(req.params.id)
        res.json(note);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error");
    }

})

module.exports = router