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

function App() {
    return (
        <div>
            <Routes>

                <Route path="/" element={<Auth/>}/>
                <Route path="/hotel/hotelAll" element={<HotelList/>}/>
                <Route path="/hotel/hotelOne/:id" element={<HotelOne/>}/>
                <Route path="/user/register" element={<Register/>}/>
                <Route path="room/register/:hotelId" element={<RoomRegister/>}/>
            </Routes>
        </div>
    );
}

export default App;
