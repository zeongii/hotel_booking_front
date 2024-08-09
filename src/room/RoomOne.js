import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Button, Container, Table} from "react-bootstrap";


let RoomOne = () => {
    let [data, setData] = useState({})
    let [roomType, setRoomType] = useState([])
    let params = useParams()
    let roomId = parseInt(params.roomId)

    let nevigate = useNavigate()

    let goBack=()=>{
        nevigate(-1)
    }
    let onUpdate = () => {
        nevigate('/room/roomUpdate/' + roomId)
    }

    useEffect(() => {
        let selectOne = async () => {
            try {
                let resp = await axios.get('http://localhost:8080/room/showOne/'+roomId, {
                    withCredentials: true
                })
                console.log(resp.data)
                setData(resp.data.roomDto)
                setRoomType(resp.data.roomTypeList)
            } catch (e) {
                console.log(e)
            }
        }
        selectOne()
    }, [])

    let onDelete = async () => {
        let resp = await axios.get('http://localhost:8080/room/delete/' + roomId, {
            withCredentials: true
        })

        if (resp.status === 200) {
            // 이부분 에서도 호텔 아이디 값으로 반환 필요
            nevigate('/hotel/hotelOne/1')
        }

    }

    console.log(data)


    return (
        <Container>
            {/*xs md lg 는 화면의 너비에 따라서 이런식으로 나뉠때 col-6이 적용되게 만듬*/}
            <Table striped bordered hover>
                <thead>
                <tr>
                    <td>
                        <h1>방 이름: {data.roomName}</h1>
                    </td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    {roomType.map(r => (
                        data.roomTypeId === r.id ?
                            (<td key={r.id}>방 타입: {r.typeName}</td>) : null
                    ))}
                </tr>
                <tr>
                    <td colSpan={2}>방 설명: {data.roomContent}</td>
                </tr>
                <tr>
                    <td colSpan={2}>조식 가격: {data.breakfastPrice}</td>
                </tr>
                <tr>
                <td>작성일: {data.createdTime}</td>
                    <td>수정일: {data.updatedTime}</td>
                </tr>

                <tr>
                    <td>
                        <Button onClick={onUpdate}>수정하기</Button>
                    </td>
                    <td>
                        <Button onClick={onDelete}> 삭제하기</Button>
                    </td>
                </tr>

                <tr>
                    <td colSpan={2} className={"text-center"}>
                        <Button onClick={goBack}>뒤로 가기</Button>

                    </td>
                </tr>
                </tbody>

            </Table>

        </Container>
    )

}

export default RoomOne