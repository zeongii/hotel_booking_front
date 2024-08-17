import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Button, Carousel, Container, Nav, Navbar, Row, Table} from "react-bootstrap";
/*resultMap.put("reservationDto", reservationDto);
resultMap.put("roomDto",roomDto);
resultMap.put("roomTypeList", ROOM_TYPE_SERVICE.selectAll());
resultMap.put("roomFileDtoList",roomFileDtoList);*/

let ReservationOne = () => {
    let [data, setData] = useState({})//roomDto
    let [roomType, setRoomType] = useState([]) //roomTypeList
    let [reservationOne, setReservationOne] = useState({})
    let params = useParams()
    let reservationId = parseInt(params.reservationId)

    let [fileData, setFileData] = useState([]) // 룸 파일 리스트
    const [roomIndex, setRoomIndex] = useState(0)


    const handleSelect = (selectedIndex) => {
        setRoomIndex(selectedIndex)
    }

    let nevigate = useNavigate()

    let onCancled = async (e) => {
        e.preventDefault();

        try {
            let resp = await axios.post(`http://localhost:8080/reservation/canceled/${reservationId}`, {
                data: data,
                roomType: roomType,
                reservationOne: reservationOne,
                fileData: fileData
            }, {
                withCredentials: true
            })

            nevigate('/hotel/hotelAll')

        } catch (error) {
            console.error(error)
        }
        // 나중에 호텔 검색 페이지로 넘겨야함

    }

    let message = reservationOne.isBreakfast === 1 ? "조식 포함" : "조식 미포함";

    useEffect(() => {
        let selectOne = async () => {
            try {
                let resp = await axios.get('http://localhost:8080/reservation/showOne/' + reservationId, {
                    withCredentials: true
                })
                // 셀렉트 원에서 보낼 애들 확인해서 맞춰주기
                setData(resp.data.roomDto)
                setRoomType(resp.data.roomTypeList)
                setFileData(resp.data.roomFileDtoList)
                setReservationOne(resp.data.reservationDto)


            } catch (e) {
                console.log(e)

            }
        }
        selectOne()
    }, [])

    return (
        <Container>
            <Row className={'justify-content-center'}>
                <Carousel activeIndex={roomIndex} onSelect={handleSelect} className="carousel-container">
                    {fileData.map((file) => (
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
                                    style={{width: '600px', height: 'auto', alignItems: "center"}}

                                />
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Container className=".nav-container">
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href="#link">Link</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

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
                                (<td key={r.id} colSpan={3}>방 타입: {r.typeName}</td>) : null
                        ))}
                    </tr>
                    <tr>
                        <td colSpan={3}>방 설명: {data.roomContent}</td>
                    </tr>
                    <tr>
                        <td colSpan={3}>조식 가격: {data.breakfastPrice}</td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            체크인: {new Date(reservationOne.startDate).toLocaleDateString('ko-KR')}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            체크아웃: {new Date(reservationOne.endDate).toLocaleDateString('ko-KR')}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>조식 여부:
                            {message}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>가격:
                            {reservationOne.payPrice}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>예약번호
                            {reservationOne.reservationNumber}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3} className={"text-center"}>
                            <Button onClick={onCancled}>예약 취소</Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>


            </Row>
        </Container>
    )
}

export default ReservationOne