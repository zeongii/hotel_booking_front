import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {Route, Routes} from "react-router-dom";
import Auth from "./user/Auth";
import RoomOne from "./room/RoomOne";
import Register from "./user/Register";
import Map from "./hotel/Map"
import ForgotEmail from "./user/ForgotEmail";
import ForgotPassword from "./user/ForgotPassword";
import SearchHotel from "./search/hotel";
import HotelOne from "./hotel/hotelOne";
import RoomRegister from "./room/RoomRegister";
import HotelList from "./hotel/HotelList";
import RoomUpdate from "./room/RoomUpdate";
import RoomImgInsert from "./room/RoomImgInsert";
import RoomReservation from "./reservation/RoomReservation";
import ReservationOne from "./reservation/ReservationOne";
import NotFound from "./NotFound";
import Mypage from "./user/Mypage";
import MypageEdit from "./user/MypageEdit";
import MyReservations from "./user/MyReservations";
import Wishlist from "./user/Wishlist";
import Auth1 from "./user/Auth1";
import HotelImgInsert from "./hotel/HotelImgInsert";
import HotelInsert from "./hotel/HotelInsert";
import HotelUpdate from "./hotel/HotelUpdate";
import UserList from "./admin/UserList";
import DashBoard from "./admin/DashBoard";
import UserDetails from "./admin/UserDetails";
import HotelDetails from "./admin/HotelDetails";
import GuestRegister from "./user/GuestRegister";



const App = ({setUserInfo})  => {

    return (

        <div style={{marginTop: '100px', marginBottom: '60px'}}>
            <Routes>
                <Route path="/" element={<SearchHotel />}/>

                <Route path="/business/auth" element={<Auth setUser={setUserInfo}/>}/>
                <Route path="/user/register" element={<Register/>}/>

                <Route path="/guest/auth" element={<Auth1 setUser={setUserInfo}/>}/>
                {/*<Route path="/guest/register" element={<Register/>}/>*/}
                <Route path="/guest/forgotEmail" element={<ForgotEmail/>}/>
                <Route path="/guest/forgotPassword" element={<ForgotPassword/>}/>

                <Route path="/guest/mypage/:id" element={<Mypage/>}/>
                <Route path="/guest/mypage/edit" element={<MypageEdit/>}/>
                <Route path="/guest/myReservations/:id" element={<MyReservations/>}/>
                <Route path="/guest/wishlist/:id" element={<Wishlist/>}/>

                <Route path="/" element={<Auth setUserInfo={setUserInfo} />} />
                <Route path="/admin/userList" element={<UserList />} />
                {/*<Route path="/" element={<Auth/>}/>*/}
                <Route path="/guest/Register" element={<GuestRegister/>}/>
                <Route path="/admin/userList" element={<UserList/>}/>
                <Route path="/admin/hotelList" element={<HotelList/>}/>
                <Route path="/admin/" element={<DashBoard/>}/>
                <Route path="/admin/userdetails/:id" element={<UserDetails/>}/>
                <Route path="/admin/hoteDetails/:id" element={<HotelDetails/>}/>

                <Route path="/Map" element={<Map/>}/>


                <Route path="/hotel/showList" element={<HotelList/>}/>

                <Route path="/hotelOne/:id" element={<HotelOne/>}/>
                <Route path="/hotelInsert" element={<HotelInsert/>}/>
                <Route path="/imgInsert/:id" element={<HotelImgInsert/>}/>
                <Route path="/hotelUpdate/:id" element={<HotelUpdate/>}/>
                <Route path="/room/register/:hotelId" element={<RoomRegister/>}/>
                <Route path="/room/roomImgInsert/:id" element={<RoomImgInsert/>}/>
                <Route path="/room/roomOne/:roomId" element={<RoomOne/>}/>
                <Route path="/room/roomUpdate/:roomId" element={<RoomUpdate/>}/>
                <Route path="/reservation/roomReservation/:roomId" element={<RoomReservation/>}/>
                <Route path="/reservation/roomReservationOne/:reservationId" element={<ReservationOne/>}/>
                <Route path="*" element={<NotFound/>}/>

            </Routes>
        </div>
    );
}

export default App;
