import React, { useState, useEffect, useContext } from 'react'
// import BillDetail from './BillDetail';
import Swal from 'sweetalert2';
import moment from 'moment/moment';
import billContext from './context/bills/BillContext';
import { useNavigate } from 'react-router-dom';


const Bill = () => {
    const context = useContext(billContext);
    const { bills, couponDetail, addBill, getBills, getCoupon, deleteBill } = context;
    const getDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const [billDetail, setBillDetail] = useState({ num: "", name: "", date: getDate(), type: "", totalQty: 0, totalAmt: 0, discount: 0, coupon: "", discountRate: 0, discountAmt: 0 });
    const [formValues, setFormValues] = useState([{ itemname: "", qty: "", rate: "", amount: 0 }]);
    const [discountAmt, setDiscountAmt] = useState(0);
    const [netAmt, setNetAmt] = useState(0);

    const navigate = useNavigate()
    let addFormFields = () => {
        setFormValues([...formValues, { itemname: "", qty: "", rate: "", amount: 0 }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    const setDetail = () => {
        billDetail.totalQty = calcQty();
        billDetail.totalAmt = calcAmt();
        // billDetail.discount = calcDis();
        // billDetail.discountRate = calcDisRate();
        // billDetail.discountAmt = calcDisAmt();
        setBillDetail(billDetail)
    }
    const calcQty = () => {
        let total = 0;
        formValues.map((bill) => {
            return total += Number(bill.qty)
        })
        return total;
    }

    const calcAmt = () => {
        let total = 0;
        formValues.map((bill) => {
            return total += bill.qty * bill.rate
        })
        return total;
    }

    const calcDis = () => {
        let total = 0;
        if (couponDetail.name === billDetail.coupon && billDetail.totalAmt >= couponDetail.minamt) {
            total = (billDetail.totalAmt * couponDetail.discount / 100);
            if (total >= couponDetail.maxamt) {
                total = couponDetail.maxamt;
            }

        }


        return total;
    }

    const calcDisAmt = () => {
        let total = 0;
        if (billDetail.totalAmt >= couponDetail.minamt) {
            total = (billDetail.totalAmt - (billDetail.totalAmt * couponDetail.discount / 100));
            if (billDetail.discount >= couponDetail.maxamt) {
                total = (billDetail.totalAmt - couponDetail.maxamt);
            }
        }
        return total;
    }

    const calcDisRate = () => {
        let total = 0
        if (calcAmt() >= couponDetail.minamt) {
            total = couponDetail.discount;
        }
        return total;
    }

    const handleChangec = (i, e) => {
        let newFormValue = [...formValues];
        newFormValue[i][e.target.name] = e.target.value;
        if (newFormValue[i].qty || newFormValue[i].tate) {
            newFormValue[i].amount = newFormValue[i].qty * newFormValue[i].rate;
        }
        setFormValues(newFormValue)
        setDetail()

    }

    const handleApply = (e) => {
        e.preventDefault()
        debugger
        if (billDetail.coupon) {
            let discAmt = billDetail.discount = calcDis();
            billDetail.discountRate = calcDisRate();
            let netAmt = billDetail.discountAmt = calcDisAmt();
            setDiscountAmt(discAmt)
            setNetAmt(netAmt)
        } else {
            let discAmt = billDetail.discount = 0;
            billDetail.discountRate = 0;
            let netAmt = billDetail.discountAmt = 0
            setDiscountAmt(discAmt)
            setNetAmt(netAmt)
        }
    }

    const handleChange = (e) => {

        const { name, value } = e.target;
        const updatedValue = name === 'coupon' ? value.toUpperCase() : value;

        setBillDetail({ ...billDetail, [name]: updatedValue });
        // setBillDetail({ ...billDetail, [e.target.name]: e.target.value })
    }

    const deleteBills = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                debugger
                deleteBill(id)
                Swal.fire(
                    'Deleted!',
                    'Your Bill has been deleted.',
                    'success'
                )
            }
        })
    }

    const submitData = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Do you want to Add ?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Add',
            denyButtonText: `Don't Add`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                debugger
                addBill(billDetail.num, billDetail.name, billDetail.date, billDetail.type, billDetail.totalAmt, billDetail.totalQty, billDetail.discount, billDetail.coupon, billDetail.discountRate, billDetail.discountAmt)
                setFormValues([{ itemname: "", qty: "", rate: "", amount: 0 }])
                setBillDetail({ num: "", name: "", date: getDate(), type: "", totalQty: 0, totalAmt: 0, discount: 0, coupon: "", discountRate: 0, discountAmt: 0 })
                setDiscountAmt(0);
                setNetAmt(0)
                Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('This Bill is not saved', '', 'info')
            }
        })

    }

    // const fetchCoupon = () => {
    //     // Fetch coupon data from the backend API
    //     debugger
    //     fetch('http://localhost:5000/api/coupon/couponName/:couponName')
    //         .then(response => response.json())
    //         .then(data => {
    //             // Assuming data is an array of available coupon names
    //             // Example: ['ABCD', 'EFGH', 'IJKL', 'MNOP', 'QRST']
    //             const availableCoupons = data.map(coupon => coupon.name);

    //             // Check if the current billDetail.coupon is valid
    //             if (availableCoupons.includes(billDetail.coupon.trim())) {
    //                 setCouponStatus('Valid');
    //             } else {
    //                 setCouponStatus('Add Valid Coupon');
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error fetching coupon data:', error);
    //         });
    // };

    useEffect(() => {

        if (localStorage.getItem('token')) {
            getBills();
        } else {
            navigate('/login');
        }
        // eslint-disable-next-line     
    }, [])

    useEffect(() => {
        getCoupon(billDetail.coupon)
        // eslint-disable-next-line
    }, [billDetail.coupon])




    return (
        <div className='container mt-5'>

            <hr />
            <div className="row">
                <div className="col-6">
                    <form className='p-5'>
                        <div className="mb-3">
                            <label htmlFor="num" className="form-label fs-6"><b> Invoice No : </b> </label>
                            <input type="text" className="form-control border border-success" id="num" name='num' value={billDetail.num} onChange={handleChange} required />
                        </div>
                        <div className="mb-3 ">
                            <label htmlFor="name" className="form-label fs-6"><b> Customer Name : </b></label>
                            <input type="text" className="form-control border border-success" id="name" name='name' value={billDetail.name} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="date" className="form-label fs-6"><b> Date : </b></label>
                            <input type="date" className="form-control border border-success" id="date" name='date' value={billDetail.date} onChange={handleChange} disabled required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="type" className='form- fs-6'><b>Payment Type:</b></label>
                            <select className="form-select border border-success" aria-label="Default select example" name='type' value={billDetail.type} onChange={handleChange} required>
                                <option value='' disabled>Select Payment Type</option>
                                <option value="Google pay">Google Pay</option>
                                <option value="Paytm">Paytm </option>
                                <option value="Cash">Cash</option>
                                <option value="Cheque">Cheque</option>
                                <option value="Debit Card">Debit Card</option>
                                <option value="Credit Card">Credit Card</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="coupon" className="form-label fs-6"><b> Coupon : </b></label>
                            <div className='input-group'>
                                <input type="text" className="form-control border border-success" id="coupon" name='coupon' value={billDetail.coupon} onChange={handleChange} required />
                                <button className='btn btn-outline-success' onClick={handleApply}>APPLY</button>

                            </div>
                            <span className='text-danger'><i> {couponDetail.name === billDetail.coupon ? `Valid whether  Min Amount is ${couponDetail.minamt} (You can get discount of amount below ${couponDetail.maxamt}/-) ` : "Add Valid Coupon"}</i></span>
                        </div>

                        <div className="d-flex justify-content-start">
                            <div>
                                <b>Total Quantity : {billDetail.totalQty}</b> <br />
                                <b>Total Amount : {billDetail.totalAmt}</b> <br />
                                <b>Discount: {billDetail.discountRate} % ({discountAmt})</b> <br />
                                <b>Net Amount : {billDetail.discountAmt ? billDetail.discountAmt : netAmt}</b> <br />
                            </div>
                        </div>

                    </form>
                </div>
                <div className="col-6 mt-5">
                    <div className="d-flex justify-content-between">
                        <h3>Add Item</h3>
                        <button className="btn btn-outline-success ms-5" onClick={() => addFormFields()}><i className="fa-solid fa-plus"></i></button>
                    </div>
                    {formValues.map((element, index) => (
                        <div className=" my-1 mx-5" key={index}>
                            <div className="d-flex justify-content-between mb-2">
                                <b> {index + 1}.  </b>
                                {formValues.length >= 2 && <button type="button" className="btn btn-danger btn-sm " onClick={() => removeFormFields(index)} style={{ borderRadius: "50%" }}><i className="fa-sharp fa-solid fa-minus" ></i></button>}
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Item :</label>
                                <div className="col-lg-10 ">
                                    <input className="form-control" type="text" name="itemname" value={element.itemname} onChange={e => handleChangec(index, e)} />
                                </div>
                            </div>
                            <div className='form-group row'>
                                <label className="col-sm-2 col-form-label">Quantity </label>
                                <div className="col-sm-10">
                                    <input className="form-control" type="text" name="qty" value={element.qty} onChange={e => handleChangec(index, e)} />
                                </div>
                            </div>
                            <div className='form-group row'>
                                <label className="col-sm-2 col-form-label">Rate : </label>
                                <div className="col-sm-10">
                                    <input className="form-control" type="text" name="rate" value={element.rate} onChange={e => handleChangec(index, e)} />
                                </div>
                            </div>
                            <div className='form-group row'>
                                <label className="col-sm-2 col-form-label">Amount</label>
                                <div className='col-sm-10'>
                                    <input className="form-control" type="text" disabled value={(element.amount)} />
                                </div>
                            </div>
                            <hr />
                        </div>
                    ))}
                </div>

                <div className="d-flex justify-content-center">
                    <button type='submit' className='btn btn-success' onClick={submitData} > Submit</button>
                </div>
            </div>
            <hr />
            <h4 className='text-center text-danger'> All Bills Details</h4>
            <hr />

            <table className="table table-hover text-center mt-4" >
                <thead>
                    <tr>
                        <th className='table-dark' style={{ border: "2px solid grey" }} scope="col">Id</th>
                        <th className='table-dark' style={{ border: "2px solid grey" }} scope="col">Invoice No</th>
                        <th className='table-dark' style={{ border: "2px solid grey" }} scope="col">Name</th>
                        <th className='table-dark' style={{ border: "2px solid grey" }} scope="col">Date</th>
                        <th className='table-dark' style={{ border: "2px solid grey" }} scope="col">Total Qty</th>
                        <th className='table-dark' style={{ border: "2px solid grey" }} scope="col">Total Amt</th>
                        <th className='table-dark' style={{ border: "2px solid grey" }} scope="col">Discount Rate</th>
                        <th className='table-dark' style={{ border: "2px solid grey" }} scope="col">Net Amt</th>
                        <th className='table-dark' style={{ border: "2px solid grey" }} scope="col">Delete</th>
                    </tr>
                </thead>
                {bills.map((bill) => {
                    return <tbody key={bill._id}>
                        <tr>
                            <th className='table-warning' style={{ border: "2px solid grey" }} scope="row"> {bill._id.slice(0, 4)}...{bill._id.slice(-4)}</th>
                            <td className='table-light' style={{ border: "2px solid grey" }}>{bill.num}</td>
                            <td className='table-light' style={{ border: "2px solid grey" }}>{bill.name}</td>
                            <td className='table-light' style={{ border: "2px solid grey" }}>{moment(bill.date).format('DD/MM/YYYY')}</td>
                            <td className='table-light' style={{ border: "2px solid grey" }}>{bill.totalQty}</td>
                            <td className='table-secondary' style={{ border: "2px solid grey" }}>{bill.totalAmt}/-</td>
                            <td className='table-secondary' style={{ border: "2px solid grey" }}>{bill.discountRate}%  ({bill.discount}₹) </td>
                            <td className='table-success' style={{ border: "2px solid grey" }}>{bill.discountAmt ? bill.discountAmt : bill.totalAmt}/-</td>
                            <td className='table-danger' style={{ border: "2px solid grey" }}><i className="fa-solid fa-trash text-center text-danger" onClick={() => deleteBills(bill._id)}></i></td>
                        </tr>
                    </tbody>
                    // return <BillDetail key={index} bill={bill} num={bill.num} name={bill.name} date={bill.date} type={bill.type} totalQty={bill.totalQty} totalAmt={bill.totalAmt} />
                })
                }
            </table>


        </div>
    )
}

export default Bill