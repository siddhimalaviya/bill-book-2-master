import React from 'react'
import BillContext from './BillContext';
import Swal from 'sweetalert2';
import { useState } from 'react';

const NoteState = (props) =>{

    const host = "http://localhost:5000"
    const noteInitial = []
    const [bills, setBills] = useState(noteInitial);
    const [couponDetail , setCouponDetails] = useState([])

    const getBills = async() => {
        const response = await fetch(`${host}/api/bill/fetchAllBill`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setBills(json)
    }

    const addBill = async(num, name, date, type, totalAmt, totalQty, discount, coupon, discountRate, discountAmt ) => {
        const response = await fetch(`${host}/api/bill/addBill`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({num, name, date, type, totalQty, totalAmt, discount, coupon, discountRate, discountAmt})
        });
        const bill = await response.json();
        setBills(bills.concat(bill))


    }

    let deleteBill = async(id) => {
        const response = await fetch(`${host}/api/bill/deleteBill/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json =await response.json();
        console.log("deleting with  this " + json);
        const newBills = bills.filter((bill) => { return bill._id !== id })
        setBills(newBills)
    }

    const getCoupon = async(couponName) =>{
        const response = await fetch(`${host}/api/coupon/couponName/${couponName}`, {
            method: 'get', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json =await response.json();
        setCouponDetails(json)
    }

    // const editNote = async (id,category,  date, description, amount) => {
    //     const response = await fetch(`${host}/api/expense/updateExpense/${id}`, {
    //         method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({category,  date, description, amount})
    //     });
    //     const json =await response.json(); 
    //     console.log(json);
    //     let newNotes = JSON.parse(JSON.stringify(notes))

    //     //Logic to edit in client
    //     for (let index = 0; index < notes.length; index++) {
    //         const element = newNotes[index];
    //         if (element._id === id) {
    //             newNotes[index].category = category;
    //             newNotes[index].date = date;
    //             newNotes[index].description = description;
    //             newNotes[index].amount = amount;
    //         }

    //     }
    //     console.log(newNotes);
    //     setNotes(newNotes)
    // }

    const swalAlert = async (message, icon) =>{
        Swal.fire({
            position: 'center',
            title: message,
            icon: icon,
            showConfirmButton: false,
            timer: 1800
          })
          
    }


    return (
        <BillContext.Provider value={{ bills, couponDetail, addBill, deleteBill, getBills, getCoupon, swalAlert}}>
            {props.children}
        </BillContext.Provider>
    )
}

export default NoteState;