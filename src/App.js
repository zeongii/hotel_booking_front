import './App.css';
import {Route, Routes} from "react-router-dom";
import Auth from "./user/Auth";
import RoomOne from "./room/RoomOne";
import Register from "./user/Register";
import Map from "./hotel/Map"
import ForgotEmail from "./user/ForgotEmail";
import ForgotPassword from "./user/ForgotPassword";
import SearchHotel from "./search/hotel";
import HotelList from "./hotel/HotelList";
import HotelOne from "./hotel/hotelOne";
import HotelInsert from "./hotel/HotelInsert";
import HotelImgInsert from "./hotel/HotelImgInsert";
import HotelUpdate from "./hotel/HotelUpdate";
import RoomRegister from "./room/RoomRegister";
import RoomImgInsert from "./room/RoomImgInsert";
import RoomUpdate from "./room/RoomUpdate";
import RoomReservation from "./reservation/RoomReservation";
import ReservationOne from "./reservation/ReservationOne";
import NotFound from "./NotFound";



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
