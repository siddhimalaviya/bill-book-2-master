import React, { useContext, useState } from 'react'
import couponContext from './context/coupon/CouponContext'
import moment from 'moment/moment';
import { useEffect } from 'react';
import Swal from 'sweetalert2';


const Coupon = () => {
  const context = useContext(couponContext)
  const { coupons, addCoupon, deleteCoupon, editCoupon, getCoupons } = context

  const [coupon, setCoupon] = useState({ id: "", name: "", discount: "", minamt: 0, maxamt: 0 })
  const [isEdit, setIsEdit] = useState(false)

  const handleChange = (e) => {
    setCoupon({ ...coupon, [e.target.name]: e.target.value.toUpperCase() })
  }

  const deleteCoupons = (id) => {
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
        deleteCoupon(id)
        Swal.fire(
          'Deleted!',
          'Your Bill has been deleted.',
          'success'
        )
      }
    })
  }
  const updateCoupon = (curItem) => {
    setIsEdit(true)
    setCoupon({ id: curItem._id, name: curItem.name, discount: curItem.discount, minamt: curItem.minamt, maxamt: curItem.maxamt })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEdit) {
      debugger
      editCoupon(coupon.id, coupon.name, coupon.discount, coupon.minamt, coupon.maxamt)
    } else {
      addCoupon(coupon.name, coupon.discount, coupon.minamt, coupon.maxamt)
    }
    Swal.fire('Saved!', '', 'success')
    setCoupon({ id: "", name: "", discount: "", minamt: 0, maxamt: 0 })
    setIsEdit(false)
  }

  useEffect(() => {
    getCoupons()
    // eslint-disable-next-line
  }, [])

  return (
    <div className='container mt-5'>
      <h1 className='text-center pt-4 text-danger'>Add Coupon</h1>
      <form>
        <div className="mb-3 form-group row">
          <label htmlFor="name" className="col-sm-2 col-form-label fw-bold">Coupon Name : </label>
          <div className="col-sm-10">
            <input type="text" name='name' value={coupon.name} onChange={handleChange} className="form-control" id="name" />
          </div>
        </div>
        <div className="mb-3 form-group row">
          <label htmlFor="discount" className="col-sm-2 col-form-label fw-bold">Discount :</label>
          <div className="col-sm-10">
            <input type="text" name='discount' value={coupon.discount} onChange={handleChange} className="form-control" id="discount" />
          </div>
        </div>
        <div className="mb-3 form-group row">
          <label htmlFor="minamt" className="col-sm-2 col-form-label fw-bold">Min Amount :</label>
          <div className="col-sm-10">
            <input type="text" name='minamt' value={coupon.minamt} onChange={handleChange} className="form-control" id="minamt" />
          </div>
        </div>
        <div className="mb-3 form-group row">
          <label htmlFor="maxamt" className="col-sm-2 col-form-label fw-bold">Max Amount :</label>
          <div className="col-sm-10">
            <input type="text" name='maxamt' value={coupon.maxamt} onChange={handleChange} className="form-control" id="maxamt" />
          </div>
        </div>
        <button type="submit" className="btn btn-success mx-auto d-flex" onClick={handleSubmit}>{isEdit ? "Save Changes" : "Add Coupon"}</button>
      </form>

      <div>
        <table className="table table-hover text-center mt-4" >
          <thead>
            {coupons.length >= 1 && <tr>
              <th className='table-success' style={{ border: "2px solid grey" }} scope="col">Id</th>
              <th className='table-success' style={{ border: "2px solid grey" }} scope="col">Name</th>
              <th className='table-success' style={{ border: "2px solid grey" }} scope="col">Date</th>
              <th className='table-success' style={{ border: "2px solid grey" }} scope="col">Discount</th>
              <th className='table-success' style={{ border: "2px solid grey" }} scope="col">Min Amount</th>
              <th className='table-success' style={{ border: "2px solid grey" }} scope="col">Max Amount</th>
              <th className='table-success' style={{ border: "2px solid grey" }} scope="col">Edit</th>
              <th className='table-success' style={{ border: "2px solid grey" }} scope="col">Delete</th>
            </tr>}
          </thead>
          {coupons.map((coupon) => {
            return <tbody key={coupon._id}>
              <tr>
                <th className='table-warning' style={{ border: "2px solid grey" }} scope="row"> {coupon._id.slice(0, 4)}...{coupon._id.slice(-4)}</th>
                <td className='table-light' style={{ border: "2px solid grey" }}>{coupon.name}</td>
                <td className='table-light' style={{ border: "2px solid grey" }}>{moment(coupon.date).format('DD/MM/YYYY')}</td>
                <td className='table-light' style={{ border: "2px solid grey" }}>{coupon.discount}</td>
                <td className='table-light' style={{ border: "2px solid grey" }}>{coupon.minamt}/-</td>
                <td className='table-light' style={{ border: "2px solid grey" }}>{coupon.maxamt}/-</td>
                <td className='table-warning' style={{ border: "2px solid grey" }}><i className="fa-solid fa-pen text-center text-warning" onClick={(e) => updateCoupon(coupon)}></i></td>
                <td className='table-danger' style={{ border: "2px solid grey" }}><i className="fa-solid fa-trash text-center text-danger" onClick={() => deleteCoupons(coupon._id)}></i></td>
              </tr>
            </tbody>
            // return <BillDetail key={index} bill={bill} num={bill.num} name={bill.name} date={bill.date} type={bill.type} totalQty={bill.totalQty} totalAmt={bill.totalAmt} />
          })
          }
        </table>
      </div>
    </div>
  )
}

export default Coupon