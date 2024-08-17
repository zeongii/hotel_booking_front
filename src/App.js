import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from "react-router-dom";
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
        <div>
            <Routes>
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
                <Route path="/hotel/hotelAll" element={<HotelList/>}/>
                <Route path="/hotel/hotelOne/:id" element={<HotelOne/>}/>
                <Route path="/room/register/:hotelId" element={<RoomRegister/>}/>
                <Route path="/room/roomImgInsert/:id" element={<RoomImgInsert/>}/>
                <Route path="/room/roomOne/:roomId" element={<RoomOne/>}/>
                <Route path="/room/roomUpdate/:roomId" element={<RoomUpdate/>}/>
                <Route path="/reservation/roomReservation/:roomId" element={<RoomReservation/>}/>
                <Route path="/reservation/roomReservationOne/:reservationId" element={<ReservationOne/>}/>
            </Routes>
        </div>
    );
}

export default App;
