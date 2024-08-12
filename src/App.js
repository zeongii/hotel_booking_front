import './App.css';
import {Route, Routes} from "react-router-dom";
import Auth from "./user/Auth";
import ShowList from "./hotel/ShowList";
import ForgotEmail from "./user/ForgotEmail";
import ForgotPassword from "./user/ForgotPassword";
import Register from "./user/Register";
import SearchHotel from "./search/hotel";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Auth/>}/>
                <Route path="/hotel/showList" element={<ShowList/>}/>
                <Route path="/user/register" element={<Register/>}/>
                <Route path="/user/forgotEmail" element={<ForgotEmail/>}/>
                <Route path="/user/forgotPassword" element={<ForgotPassword/>}/>
                <Route path="/search/hotel" element={<SearchHotel/>}/>
            </Routes>
        </div>
    );
}

export default App;
