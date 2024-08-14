import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

let HotelShowOne = () => {
    let params=useParams()
    let id= parseInt(params.id)

    useEffect(() => {
        let hotelOne = async () => {
            try {
                let resp = await axios.get('http://localhost:8080/hotel/hotelOne/' + id, {
                    withCredentials: true
                })
                console.log(resp)

            } catch (e) {

            }
        }
        hotelOne()
    }, [])




    return (
        <h1> {id} 번째 호텔입니다</h1>
    )

}
export default HotelShowOne