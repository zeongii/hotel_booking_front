import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from "react-router-dom";
import ForgotEmail from "./user/ForgotEmail";
import ForgotPassword from "./user/ForgotPassword";
import Register from "./user/Register";
import Wishlist from "./user/Wishlist";
import Auth1 from "./user/Auth1";
import Mypage from "./user/Mypage";
import MyReservations from "./user/MyReservations";


function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Auth1/>}/>
                <Route path="/guest/register" element={<Register/>}/>
                <Route path="/guest/forgotEmail" element={<ForgotEmail/>}/>
                <Route path="/guest/forgotPassword" element={<ForgotPassword/>}/>
                <Route path="/guest/mypage/:id" element={<Mypage/>}/>
                <Route path="/guest/myReservations/:id" element={<MyReservations />} />
                <Route path="/guest/wishlist/:id" element={<Wishlist/>}/>
            </Routes>
        </div>
    );
}

export default App;
