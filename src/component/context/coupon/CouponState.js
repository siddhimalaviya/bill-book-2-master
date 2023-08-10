import React from 'react'
import CouponContext from './CouponContext';
import Swal from 'sweetalert2';
import { useState } from 'react';

const NoteState = (props) => {

    const host = "http://localhost:5000"
    const noteInitial = []
    const [coupons, setCoupons] = useState(noteInitial);

    const getCoupons = async () => {
        const response = await fetch(`${host}/api/coupon/fetchAllCoupons`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json()
        setCoupons(json)
    }

    const addCoupon = async (name, discount, minamt, maxamt) => {
        const response = await fetch(`${host}/api/coupon/addCoupon`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ name, discount, minamt, maxamt })
        });
        const bill = await response.json();
        setCoupons(coupons.concat(bill))


    }

    let deleteCoupon = async (id) => {
        const response = await fetch(`${host}/api/coupon/deleteCoupon/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log("deleting with  this " + json);
        const newBills = coupons.filter((bill) => { return bill._id !== id })
        setCoupons(newBills)
    }

    const editCoupon = async (id, name, discount, minamt, maxamt) => {
        const response = await fetch(`${host}/api/coupon/updateCoupon/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ name, discount, minamt, maxamt })
        });
        const json = await response.json();
        console.log(json);
        let newCoupon = JSON.parse(JSON.stringify(coupons))

        //Logic to edit in client
        for (let index = 0; index < coupons.length; index++) {
            const element = newCoupon[index];
            if (element._id === id) {
                newCoupon[index].name = name;
                newCoupon[index].discount = discount;
                newCoupon[index].minamt = minamt;
                newCoupon[index].maxamt = maxamt;
            }

        }
        setCoupons(newCoupon)
    }

    const swalAlert = async (message, icon) => {
        Swal.fire({
            position: 'center',
            title: message,
            icon: icon,
            showConfirmButton: false,
            timer: 1800
        })

    }


    return (
        <CouponContext.Provider value={{ coupons, addCoupon, deleteCoupon, editCoupon, getCoupons, swalAlert }}>
            {props.children}
        </CouponContext.Provider>
    )
}

export default NoteState;