import React, {useEffect, useState} from "react";
import axios from "axios";
import {Container, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import {useNavigate} from "react-router-dom";

let HotelList = () => {

    let [data, setData] = useState({hotelList: []})
    let navigate = useNavigate()

    let moveHotelOne = (id) => {
        navigate('/hotel/hotelOne/' + id)
    }


    useEffect (() => {
        let showHotelList = async () => {

            let resp = await axios.get('http://localhost:8080/hotel/hotelAll', {} )
            if(resp.status === 200){
                setData(resp.data)
            }

        }
        showHotelList()
    }, [])
    return (
        <Container className={"mt-5"}>
            <Table hover>
                <thead>
                <tr>
                    <td>호텔 번호</td>
                    <td>호텔 이름</td>
                    <td>호텔 주소</td>
                </tr>
                </thead>
                <tbody>
                {data.hotelList.map((h) => (
                    <TableRow h={h} key={h.id} moveHotelOne={moveHotelOne}/>
                )) }
                </tbody>
            </Table>
        </Container>
    )
}

let TableRow = ({h, moveHotelOne}) => {
    return (
        <tr onClick={() => moveHotelOne(h.id)}>
            <td>{h.id}</td>
            <td>{h.hotelName}</td>
            <td>{h.hotelAddress}</td>
        </tr>
    )
}

export default HotelList