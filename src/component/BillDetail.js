import React from 'react'

const BillDetail = (props) => {
    const { bill } = props;
    return (
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Invoice No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Total Qty</th>
                        <th scope="col">Total Amt</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>{bill.num}</td>
                        <td>{bill.name}</td>
                        <td>{bill.date}</td>
                        <td>{bill.totalQty}</td>
                        <td>{bill.totalAmt}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default BillDetail