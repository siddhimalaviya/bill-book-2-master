const express = require('express')
const router = new express.Router()
const Coupon = require("../models/coupon")
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');

router.post("/addCoupon", fetchuser, async (req, res) => {
    try {
        const { name, discount, minamt, maxamt } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const coupon = new Coupon({ name, discount, minamt, maxamt, user: req.user.id})
        const savedCoupon = await coupon.save()
        res.json(savedCoupon);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error");
    }
})

router.get('/fetchAllCoupons', fetchuser, async (req, res) => {
    try {
        const billData = await Coupon.find({user: req.user.id })
        res.send(billData)
    } catch (error) {
        res.send(error)
    }
})

router.get('/couponName/:couponName', fetchuser, async (req, res) => {
    try {
        const couponName = req.params.couponName;
        const billData = await Coupon.findOne({name :couponName  })
        res.send(billData)
    } catch (error) {
        res.send(error)
    }
})

router.delete('/deleteCoupon/:id', fetchuser, async (req, res) => {
    try {

        //Find the note to be delete and delete
        let note = await Coupon.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }

        //Allow deletion only  if user owns this note
        note = await Coupon.findByIdAndDelete(req.params.id)
        res.json(note);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error");
    }

})

router.put('/updateCoupon/:id', fetchuser, async (req, res) => {
    const { name, discount, minamt, maxamt } = req.body
    try {

        //Create a newNote Object 
        const newCoupon = {};
        if (name) { newCoupon.name = name };
        if (discount) { newCoupon.discount = discount };
        if (minamt) { newCoupon.minamt = minamt };
        if (maxamt) { newCoupon.maxamt = maxamt };

        //Find the note to be updated and updated
        let note = await Coupon.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Coupon.findByIdAndUpdate(req.params.id, { $set: newCoupon }, { new: true })
        res.json( note );
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error");

    }
})

module.exports = router