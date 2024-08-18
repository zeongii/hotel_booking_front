import notFound from './assets/images/notFound.png'
import React from "react";

let NotFound = () => {
    return (
    <div style={{  display: 'flex',justifyContent: 'center',  alignItems: 'center'}}>
        <img src={notFound} alt={"없음"}/>
    </div>
    )
}

export default NotFound