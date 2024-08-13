import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Button, Carousel, Container, Nav, Navbar, Row, Table} from "react-bootstrap";


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


    // 나중에 호텔 아이디 받아오면 수정필요한 부분
    let goBack = () => {
        nevigate(-1)
    }


    let onUpdate = () => {
        nevigate('/room/roomUpdate/' + roomId)
    }

    let onReservation = (roomId) => {
        nevigate('/reservation/roomReservation/'+ roomId)
    }

    useEffect(() => {
        let selectOne = async () => {
            try {
                let resp = await axios.get('http://localhost:8080/room/showOne/' + roomId, {
                    withCredentials: true
                })
                console.log(resp)
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
        })

        if (resp.status === 200) {
            // 이부분 에서도 호텔 아이디 값으로 반환 필요
            nevigate('/hotel/hotelOne/1')
        }

    }

    console.log(data)


    return (
        <Container>
            <Row className={'justify-content-center'}>
                <Carousel activeIndex={index} onSelect={handleSelect} className="carousel-container">

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
                <Navbar expand="lg" className="bg-body-tertiary" >
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
                        <td colSpan={3}>
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
                        <td>
                            <Button onClick={onReservation}>예약하기</Button>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={2} className={"text-center"}>
                            <Button onClick={goBack}>뒤로 가기</Button>

                        </td>
                    </tr>
                    </tbody>

                </Table>
            </Row>
        </Container>
    )

}

export default RoomOne