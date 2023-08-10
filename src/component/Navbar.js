import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    let location = useLocation();
    // useEffect(() => {
    // //   console.log(location);
    // }, [location])
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    const userName = localStorage.getItem('userName')
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userName');
        
        navigate('/login');
    }
    return (
        <>
            <nav className={`navbar fixed-top navbar-expand-lg shadow navbar-dark bg-success`}>
                <div>

                </div>
                <div className="container-fluid">

                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsJDE5XGB4FMmvLuVRvAe9qA_eUqUSFiCu6X5Lyb8r&s" alt="" style={{ width: "100px", height: "44px" }} />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                           { token && <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>}
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                            {role === "admin" && <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/coupon" ? "active" : ""}`} to="/coupon">Coupon</Link>
                            </li>}
                        </ul>
                        {/* <div className='mx-auto'>
                            <h1 className="text-center text-success">D<img src="https://companieslogo.com/img/orig/DMART.NS-6f885d00.png?t=1599629043" alt="" style={{ width: "28px", height: "37px" }} />Mart</h1>
                        </div> */}
                        {localStorage.getItem('userName') && <h6 className="d-flex mb-lg-0 mb-3 mx-1 text-white"> Hello {userName}!</h6>}
                        {!localStorage.getItem('token') ? <form className="d-flex mb-lg-0 mb-3">
                            <Link className={`btn mx-1 ${location.pathname === "/login" ? "btn-warning" : "btn-outline-warning"} `} to="/login" role="button">Login</Link>
                            <Link className={`btn mx-1 ${location.pathname === "/signup" ? "btn-warning" : "btn-outline-warning"}`} to="/signup" role="button">Sign up</Link>
                        </form> : <button onClick={handleLogout} className={`btn btn-danger`}>Logout</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar