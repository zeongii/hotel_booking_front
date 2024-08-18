import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from "./user/Auth";
import Register from "./user/Register";
import UserList from '../../hotel_booking_front/jaehun/src/admin/UserList'
import DashBoard from "../../hotel_booking_front/jaehun/src/admin/DashBoard";
import UserDetails from "../../hotel_booking_front/jaehun/src/admin/UserDetails";
import HotelList from "../../hotel_booking_front/jaehun/src/admin/HotelList";
import HotelDetails from "../../hotel_booking_front/jaehun/src/admin/HotelDetails";


function App() {
    const [userInfo, setUserInfo] = useState({
        id: '',
        email: '',
        role: ''
    });
    return (
            <Routes>
                <Route path="/" element={<Auth setUserInfo={setUserInfo} />} />
                <Route path="/admin/userList" element={<UserList userInfo={userInfo} />} />
                {/*<Route path="/" element={<Auth/>}/>*/}
                <Route path="/user/Register" element={<Register/>}/>
                <Route path="/admin/userList" element={<UserList/>}/>
                <Route path="/admin/hotelList" element={<HotelList/>}/>
                <Route path="/admin/" element={<DashBoard/>}/>
                <Route path="/admin/userdetails/:id" element={<UserDetails/>}/>
                <Route path="/admin/hoteDetails/:id" element={<HotelDetails/>}/>
            </Routes>
    );
}

export default App
