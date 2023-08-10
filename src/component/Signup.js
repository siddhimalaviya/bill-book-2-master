import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import billContext from './context/bills/BillContext';



const Signup = () => {



    const [credentials, setCredentials] = useState({ name: "", email: "", role: "", password: "", cpassword: "" });
    const [formError] = useState({ name: "", email: "", password: "", cpassword: "", });
    const context = useContext(billContext);
    const { swalAlert } = context;
    
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        debugger
        const { name, email, password, role } = credentials;
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, role })
        });
        const json = await response.json()
        if (credentials.password !== credentials.cpassword) {
            swalAlert("Password and confirm password should be same", "error");
        }
        else if (json.success) {
            localStorage.setItem('token', json.authtoken)
            localStorage.setItem('role', json.role)
            localStorage.setItem('userName', json.name)
            navigate('/');
            swalAlert("Account Created Successfully", "success")
        }
        else {
            swalAlert("Invalid detail", "error")

        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    // const handleConfirmPassword = (e) => {
    //     e.preventDefault();
    //     // let inputError = {
    //     //     email: "",
    //     //     password: "",
    //     //     confirmPassword: "",
    //     //   };
    //     if (credentials.password !== credentials.cpassword) {
    //         swalAlert("Password and confirm password should be same", "error");
    //     } else {
    //         navigate('/');
    //         swalAlert("Account Created Successfully", "success")

    //     }
    // };
    return (
        <div className='container'>
            <div className='row mt-5'>

                <div className=" col-lg-6 col-md-6 col-sm-12 my-5 align-self-center" >
                    <div>
                        <img src="https://st.depositphotos.com/18722762/51522/v/600/depositphotos_515228776-stock-illustration-online-registration-sign-login-account.jpg" alt="" className='w-100 rounded mx-auto d-block h-100' />
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 my-5">
                    <div className="card-body">
                        <h2 className='text-center'>Create an account to use iBillbook</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name </label>
                                <input type="text" className="form-control" id="name" onChange={onChange} name="name" required />

                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" onChange={onChange} name="email" aria-describedby="emailHelp" required />
                                <div id="emailHelp" className="form-text" >We'll never share your email with anyone else.</div>

                                <select className="form-select mt-2" name='role' onChange={onChange} aria-label="Default select example">
                                    <option value="">Select Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>


                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className='form-control' id="password" onChange={onChange} name='password' minLength={5} required />
                                {/* <div className="invalid-feedback">{errors.password?.message}</div> */}

                                <label htmlFor="cpassword" className="form-label"> Confirm Password</label>
                                <input type="password" className='form-control' id="cpassword" onChange={onChange} name='cpassword' minLength={5} required />
                                <div className="invalid-feedback">{formError.cpassword}</div>

                            </div>
                            <div id="emailHelp" className="form-text">People who use our service may have uploaded your contact information to iBillbook.</div>
                            <div className=' d-flex justify-content-center'>

                                <button type="submit" className="btn btn-success"
                                // disabled={credentials.password  !==  credentials.cpassword && "password and confirm password must be same"}
                                //  onClick={handleConfirmPassword}
                                >Sign up</button>
                            </div>
                            <div className='text-center'>
                                Already have an Account?
                                <Link to="/login">Login</Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup