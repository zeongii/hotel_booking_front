import './App.css';
import {Route, Routes} from "react-router-dom";
import Auth from "./user/Auth";
import ShowList from "./hotel/ShowList";
import ForgotEmail from "./user/ForgotEmail";
import ForgotPassword from "./user/ForgotPassword";
import Auth1 from "./user/Auth1";
import Register from "./user/Register";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Auth1/>}/>
                <Route path="/hotel/showList" element={<ShowList/>}/>
                <Route path="/user/register" element={<Register/>}/>
                <Route path="/user/forgotEmail" element={<ForgotEmail/>}/>
                <Route path="/user/forgotPassword" element={<ForgotPassword/>}/>
            </Routes>
        </div>
    );
}

export default App;
