import './App.css';
import ShowOne from "./board/ShowOne";
import {Route, Routes} from "react-router-dom";
// import ShowList from "./board/ShowList";
// import Write from "./board/Write";
// import Update from "./board/Update";
import Auth from "./user/Auth";
import ShowList from "./hotel/ShowList";

// jaehub test

function App() {
    return (
        <div>
            <Routes>
                {/*<Route path="/board/showOne/:id" element={<ShowOne/>}/>
                <Route path="/board/showList/:pageNo" element={<ShowList/>}/>
                <Route path="/board/write" element={<Write/>}/>
                <Route path="/board/update/:id" element={<Update/>}/>*/}
                <Route path="/" element={<Auth/>}/>
                <Route path="/hotel/showList" element={<ShowList/>}/>
            </Routes>
        </div>
    );
}

export default App;
