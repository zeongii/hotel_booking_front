import React , { useState }from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import Header from "./layout/Header";


const Main = () => {
    const [userInfo, setUserInfo] = useState(null); // userInfo 상태 관리

    return (
        <BrowserRouter>
            <Header userInfo={userInfo} setUserInfo={setUserInfo} /> {/* Header에 userInfo 전달 */}
            <App setUserInfo={setUserInfo} /> {/* App에 setUserInfo 전달 */}
        </BrowserRouter>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
