import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Button, Carousel, Container, Table} from "react-bootstrap";
import data from "bootstrap/js/src/dom/data";
import {useEffect, useState} from "react";
import axios from "axios";

let HotelOne = () => {

    let location = useLocation()
    let nevigate = useNavigate()

    let params = useParams()
    let id = parseInt(params.id)

    console.log(id)

    const facility = [
        {id: 1, label: '야외수영장'},
        {id: 2, label: '실내수영장'},
        {id: 3, label: '사우나'},
        {id: 4, label: '키즈룸'},
        {id: 5, label: '카지노'},
        {id: 6, label: '피트니스센터'},
        {id: 7, label: '무료와이파이'},
        {id: 8, label: '세탁시설'},
        {id: 9, label: '스파'},
        {id: 10, label: '24시간 프론트 데스크'},
        {id: 11, label: '레스토랑'},
        {id: 12, label: '무료주차'},
        {id: 13, label: '바'},
        {id: 14, label: 'ATM'},
        {id: 15, label: '야외정원'}
    ];


    const [roomIndex, setRoomIndex] = useState(0)
    const handleSelect = (selectedIndex) => {
        setRoomIndex(selectedIndex)
    }

    const [index, setIndex] = useState(0)

    const handleHotelSelect = (selectedIndex) => {
        setIndex(selectedIndex)
    }

    let [hotelData, setHotelData] = useState({})

    let [facilities, setFacilities] = useState([])

    let [fileData, setFileData] = useState([])


    let [roomdata, setRoomdata] = useState({roomList: []})
    let [roomType, setRoomType] = useState([])

    let roomInsert = (hotelId) => {
        nevigate(`/room/register/` + hotelId)
    }
    let moveToSingle = (roomId) => {
        nevigate('/room/roomOne/' + roomId)
    }

    let onDelete = async () => {
        let resp = await axios.get('http://localhost:8080/hotel/delete/' + id, {})
        if (resp.status === 200) {
            nevigate('/hotelAll')
        }

    }


    useEffect(() => {
        let HotelOne = async () => {
            let resp = await axios.get('http://localhost:8080/hotel/hotelOne/' + id, {})
            console.log(resp)

            setHotelData(resp.data.hotelDto)
            setFileData(resp.data.hotelFileDtoList)
            setFacilities(resp.data.facilities)

            console.log(resp.data.facilities)


        }
        HotelOne()
    }, [])


    useEffect(() => {
        let roomSelectList = async () => {
            try {
                let resp = await axios.get("http://localhost:8080/room/showList/" + id, {
                    withCredentials: true
                })
                if (resp.status === 200) {
                    setRoomdata(resp.data)
                    setRoomType(resp.data.roomTypeList)
                }
            } catch (e) {
                console.log(e)
            }
        }

        roomSelectList()
    }, [id])
    let TableRow = ({room, moveToSingle}) => {
        return (
            <tr onClick={() => moveToSingle(room.id)}>


                <td>
                    {/*{room.id}*/}
                    <Carousel activeIndex={roomIndex} onSelect={handleSelect} className="carousel-container">

                        {room.imageList.map((roomImages) => (
                            <Carousel.Item key={roomImages}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%' // 높이 조정 필요
                                }}>
                                    <img
                                        src={`http://localhost:8080/room/${roomImages}`}
                                        alt={roomImages}
                                        style={{width: '600px', height: 'auto', alignItems: "center"}}

                                    />
                                </div>
                            </Carousel.Item>
                        ))}

                    </Carousel>


                </td>
                {roomType.map(r => (
                    room.roomTypeId === r.id ?
                        (<td key={r.id}> 방 타입: {r.typeName}</td>) : null
                ))}

                <td>{room.roomPrice}</td>
            </tr>
        )
    }

    return (
        <Container className={"mt-3"}>
            <h1>호텔id가 {id}인 호텔의 상세 페이지 입니다.</h1>
            <Carousel activeIndex={index} onSelect={handleHotelSelect} className="carousel-container">

                {fileData.map((file) => (
                    <Carousel.Item key={file.storedFileName}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%' // 높이 조정 필요
                        }}>
                            <img
                                src={`http://localhost:8080/hotel/${file.storedFileName}`}
                                alt={file.originalFileName}
                                style={{width: '600px', height: 'auto', alignItems: "center"}}

                            />
                        </div>
                    </Carousel.Item>
                ))}


            </Carousel>


            <Button onClick={onDelete}>호텔삭제</Button>
            <Button onClick={roomInsert}>방 등록하기</Button>

            {facilities.map(f => (
                <div>{facility[f - 1].label}</div>
            ))}

            <Table hover striped bordered className={"table-danger"}>
                <thead>
                <tr>
                    <td>방 사진</td>
                    <td>방 타입</td>
                    <td>가격</td>
                </tr>
                </thead>
                <tbody>
                {roomdata.roomList.map(r => (
                        <TableRow room={r} key={r.id} moveToSingle={moveToSingle}/>
                    )
                )}

                </tbody>
            </Table>

        </Container>


    )
}


export default HotelOne;