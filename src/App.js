import './App.css';
import ShowOne from "./board/ShowOne";
import {Route, Routes} from "react-router-dom";
// import ShowList from "./board/ShowList";
// import Write from "./board/Write";
// import Update from "./board/Update";
import Auth from "./user/Auth";
import ShowList from "./hotel/ShowList";
import Register from "./user/Register";

function App() {
    return (
        <div>
            <Routes>

                <Route path="/" element={<Auth/>}/>
                <Route path="/hotel/hotelAll" element={<ShowList/>}/>
                <Route path="/user/register" element={<Register/>}/>

            </Routes>
        </div>
    );
}

export default App;
