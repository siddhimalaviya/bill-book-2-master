import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import billContext from './context/bills/BillContext';

const Login = () => {

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const context = useContext(billContext);
    const navigate = useNavigate();
    const { swalAlert } = context;

    const handleLogin = async (e) => {
        debugger
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        if (json.success) {
            //Save the auth token and Redirect
            localStorage.setItem('token', json.authtoken)
            localStorage.setItem('role', json.role)
            localStorage.setItem('userName', json.name)

            navigate('/');
            swalAlert("Logged in Successfully", "success")


        } else {
            swalAlert("Invalid credentials", "error")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
        }
        // eslint-disable-next-line     
    }, [])
    return (
        <>
            <div className='container h-full'>
                <div className=' d-flex align-items-center mt-5'>
                    <div className=' row'>
                        <div className="col-lg-6 col-md-6 col-sm-12 my-5 align-self-center" >
                            <img src="https://img.freepik.com/premium-vector/online-registration-sign-up-concept-flat-vector-illustration-young-male-cartoon-character-sitting-huge-smartphone-login-account-social-media-app-user-interface-secure-login_241107-1247.jpg?w=2000" alt="" className='w-100 rounded mx-auto d-block h-100' />
                        </div>
                        <div className=" col-lg-6 col-md-6 col-sm-12 my-5">
                            <div className="card-body" >
                                <h2 className='text-center'> Login to continue to iBillbook </h2>
                                <form onSubmit={handleLogin}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={credentials.email} aria-describedby="emailHelp" />
                                        <div id="emailHelp">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credentials.password} />
                                    </div>
                                    <div className="d-flex justify-content-center">

                                        <button type="submit" className="btn btn-success " >Log in</button>
                                    </div>
                                    <div className='text-center'>
                                        You don't have an Account?
                                        <Link to="/signup">Sign up</Link>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login