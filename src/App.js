import './App.css';
import {Route, Routes} from "react-router-dom";
// import HotelOne from "./board/HotelOne";
// import Write from "./board/Write";
// import Update from "./board/Update";
import Auth from "./user/Auth";
import HotelOne from "./hotel/hotelOne";
import Register from "./user/Register";
import RoomRegister from "./room/RoomRegister";
import HotelList from "./hotel/HotelList";
import RoomOne from "./room/RoomOne";
import RoomUpdate from "./room/RoomUpdate";
import RoomImgInsert from "./room/RoomImgInsert";

function App() {
    return (
        <div>
            <Routes>

                <Route path="/" element={<Auth/>}/>
                <Route path="/hotel/hotelAll" element={<HotelList/>}/>
                <Route path="/hotel/hotelOne/:id" element={<HotelOne/>}/>
                <Route path="/user/register" element={<Register/>}/>
                <Route path="/room/register/:hotelId" element={<RoomRegister/>}/>
                <Route path="/room/roomImgInsert/:id" element={<RoomImgInsert/>}/>
                <Route path="/room/roomOne/:roomId" element={<RoomOne/>}/>
                <Route path="/room/roomUpdate/:roomId" element={<RoomUpdate/>}/>
            </Routes>
        </div>
    );
}

export default App;
