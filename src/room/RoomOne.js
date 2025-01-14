import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Button, Carousel, Container, Nav, Navbar, Row, Table} from "react-bootstrap";
import styles from './Room.module.css'
import travelingImage from "../hotel/traveling.png";


let RoomOne = () => {
    let [data, setData] = useState({})
    let [roomType, setRoomType] = useState([])
    let params = useParams()
    let roomId = parseInt(params.roomId)

    let [fileData, setFileData] = useState([])
    const [index, setIndex] = useState(0)

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex)
    }

    let nevigate = useNavigate()

    const location = useLocation()
    const userInfo = location.state.userInfo
    let [inputs, setInputs] = useState({
        startDate: location.state.searchData.startDate,
        endDate: location.state.searchData.endDate,
        peopleCount: location.state.peopleCount,
        isBreakfast: 0,
        enabled: 1
    });

    let onUpdate = () => {
        nevigate('/room/roomUpdate/' + roomId, {state: {userInfo: userInfo}})
    }

    let moveToNext = (reservationId) => {
        nevigate(`/reservation/roomReservationOne/${reservationId}`)
    }

    let moveToReservation = async (e) => {
        e.preventDefault();

        try {
            let resp = await axios.post(`http://localhost:8080/reservation/roomReservation/${roomId}`, inputs, {
                withCredentials: true
            });

            if (resp.data.reservationId !== undefined) {
                moveToNext(resp.data.reservationId);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        let selectOne = async () => {
            try {
                let resp = await axios.get('http://localhost:8080/room/showOne/' + roomId, {
                    withCredentials: true
                })
                console.log(resp)
                console.log(userInfo)
                setData(resp.data.roomDto)
                setRoomType(resp.data.roomTypeList)
                let temp = resp.data.roomFileDtoList
                console.log("temp")
                console.log(temp)
                setFileData(resp.data.roomFileDtoList)
                console.log(fileData)
            } catch (e) {
                console.log(e)
            }
        }
        selectOne()
    }, [])

    let onDelete = async () => {
        let resp = await axios.get('http://localhost:8080/room/delete/' + roomId, {
            withCredentials: true
        }, {state: {userInfo: userInfo}})

        if (resp.status === 200) {
            // 이부분 에서도 호텔 아이디 값으로 반환 필요
            nevigate('/hotelOne/' + data.hotelId)
        }

    }

    console.log(data)


    return (
        <Container>
            <Row className={'justify-content-center'}>
                <div className={styles.roomContainer}>
                    <div className={styles.roomImg}>
                        <Carousel activeIndex={index} onSelect={handleSelect} className="carousel-container">
                            {fileData.length > 0 ? (
                                fileData.map((file) => (
                                    <Carousel.Item key={file.storedFileName}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '100%' // 높이 조정 필요
                                        }}>
                                            <img
                                                src={`http://localhost:8080/room/${file.storedFileName}`}
                                                alt={file.originalFileName}
                                                style={{
                                                    width: '500px',
                                                    height: '400px',
                                                    alignItems: "center",
                                                    border: '1px solid #9ec2fc',
                                                    borderRadius: '10px',
                                                }}

                                            />
                                        </div>
                                    </Carousel.Item>
                                ))) : (<div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                marginBottom: "50px"
                            }}>
                                <img
                                    src={travelingImage}
                                    alt="기본 이미지"
                                    style={{
                                        width: '500px',
                                        height: '400px',
                                        border: '1px solid #9ec2fc',
                                        borderRadius: '10px',
                                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
                                    }}
                                />
                            </div>)}


                        </Carousel>
                    </div>


                    <div className={styles.roomInfo}>
                        <Table bordered hover>
                            <thead>
                            <tr>
                                <td colSpan={3}>
                                    <h1>{data.roomName}</h1>
                                </td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                {roomType.map(r => (
                                    data.roomTypeId === r.id ?
                                        (<td key={r.id} colSpan={3}>{r.typeName}</td>) : null
                                ))}
                            </tr>
                            <tr>
                                <td colSpan={3}>{data.roomContent}</td>
                            </tr>
                            <tr>
                               <td colSpan={3}>조식가격: &emsp; {data.breakfastPrice}</td>
                            </tr>

                            <tr className={"text-center"}>
                                <td><Button onClick={moveToReservation} style={button}>예약하기</Button></td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
                <Table>
                    <tbody>
                    {data.userId === userInfo.id && (

                    <tr>
                        <td>
                            <Button onClick={onUpdate}>수정하기</Button>
                        </td>
                        <td>
                            <Button onClick={onDelete}> 삭제하기</Button>
                        </td>
                        <td>

                        </td>
                    </tr>
                        )}
                    </tbody>
                </Table>
            </Row>
        </Container>
    )

}

const button = {
    backgroundColor: '#9ec2fc',
    borderColor: '#9ec2fc',
};

export default RoomOne