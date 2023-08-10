import './App.css';
import About from './component/About';
import Bill from './component/Bill';
import Coupon from './component/Coupon';
import Login from './component/Login';
import Navbar from './component/Navbar';
import Signup from './component/Signup';
import BillState from './component/context/bills/BillState';
import CouponState from './component/context/coupon/CouponState'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BillState>
      <CouponState>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Bill />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/coupon" element={<Coupon />}></Route>
          </Routes>
        </Router>
        </CouponState>
      </BillState>
      
        
     
    </>
  );
}

export default App;
