import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from "react-router-dom";
import Auth from "./user/Auth";
import RoomOne from "./room/RoomOne";
import Register from "./user/Register";
import Map from "./hotel/Map"
import ForgotEmail from "./user/ForgotEmail";
import ForgotPassword from "./user/ForgotPassword";
import Register from "./user/Register";
import SearchHotel from "./search/hotel";
import HotelOne from "./hotel/hotelOne";
import RoomRegister from "./room/RoomRegister";
import HotelList from "./hotel/HotelList";
import RoomOne from "./room/RoomOne";
import RoomUpdate from "./room/RoomUpdate";
import RoomImgInsert from "./room/RoomImgInsert";
import RoomReservation from "./reservation/RoomReservation";
import ReservationOne from "./reservation/ReservationOne";
import NotFound from "./NotFound";


import Mypage from "./user/Mypage";
import MypageEdit from "./user/MypageEdit";
import MyReservations from "./user/MyReservations";
import Wishlist from "./user/Wishlist";
import Auth from "./user/Auth";
import Auth1 from "./user/Auth1";

function ShowList() {
    return null;
}

function App() {
    return (
        <div style={{marginTop: '100px', marginBottom: '60px'}}>
            <Routes>
                <Route path="/" element={<HotelList/>}/>
                <Route path="/Map" element={<Map/>}/>
                <Route path="/user/auth" element={<Auth/>}/>
                <Route path="/user/register" element={<Register/>}/>
                <Route path="/user/forgotEmail" element={<ForgotEmail/>}/>
                <Route path="/user/forgotPassword" element={<ForgotPassword/>}/>
                <Route path="/jisu" element={<Auth1/>}/>
                <Route path="/guest/register" element={<Register/>}/>
                <Route path="/guest/forgotEmail" element={<ForgotEmail/>}/>
                <Route path="/guest/forgotPassword" element={<ForgotPassword/>}/>
                <Route path="/guest/mypage/:id" element={<Mypage/>}/>
                <Route path="/guest/mypage/edit" element={<MypageEdit />} />
                <Route path="/guest/myReservations/:id" element={<MyReservations />} />
                <Route path="/guest/wishlist/:id" element={<Wishlist/>}/>
                <Route path="/" element={<Auth/>}/>
                <Route path="/hotel/showList" element={<ShowList/>}/>
                <Route path="/search/hotel" element={<SearchHotel/>}/>
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
