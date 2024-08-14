import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, Carousel, Container, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import {useNavigate} from "react-router-dom";

let HotelList = () => {

    let [data, setData] = useState({hotelList: []})

    const [hotelIndex, setHotelIndex] = useState(0)
    const handleSelect = (selectedIndex) => {
        setHotelIndex(selectedIndex)
    }

    let navigate = useNavigate()

    let moveHotelOne = (id) => {
        navigate('/hotelOne/' + id)
    }

    let moveInsert = () => {
        navigate('/hotelInsert')
    }


    useEffect(() => {
        let showHotelList = async () => {

            let resp = await axios
                .get('http://localhost:8080/hotel/hotelAll', {})
            console.log(resp)
            if (resp.status === 200) {
                setData(resp.data)
                console.log(resp.data)


            }

        }

        showHotelList()
    }, [])



    return (


        <Container className={"mt-3"}>
            <Button onClick={moveInsert}>호텔 작성하기</Button>

            <Table hover striped bordered className={"table-danger"}>
                <thead>
                <tr>
                    <td>호텔 사진</td>
                    <td>호텔 번호</td>
                    <td>호텔 이름</td>
                    <td>호텔 주소</td>
                </tr>
                </thead>
                <tbody>
                {data.hotelList.map((h) => (
                    <TableRow h={h} key={h.id} moveHotelOne={moveHotelOne}/>
                ))}



                </tbody>
            </Table>
{/*
            <Card style={{ width: '18rem' }}>
                {h.imageList.map((hotelImages) => (
                <Carousel.Item key={hotelImages}>
                <Card.Img
                    src={`http://localhost:8080/hotel/${hotelImages}`}
                    alt={hotelImages}
                    style={{width: '600px', height: 'auto', alignItems: "center"}}

                />
                </Carousel.Item>
                ))}

                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>*/}

        </Container>


    )

    let TableRow = ({h, moveHotelOne}) => {
        return (
            <tr>
                <td>
                    <Carousel activeIndex={hotelIndex} onSelect={handleSelect} className="carousel-container">

                        {h.imageList.map((hotelImages) => (
                            <Carousel.Item key={hotelImages}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%' // 높이 조정 필요
                                }}>
                                    <img
                                        src={`http://localhost:8080/hotel/${hotelImages}`}
                                        alt={hotelImages}
                                        style={{width: '600px', height: 'auto', alignItems: "center"}}

                                    />
                                </div>
                            </Carousel.Item>
                        ))}

                    </Carousel>
                </td>
                <td onClick={() => moveHotelOne(h.id)}>{h.id}</td>
                <td onClick={() => moveHotelOne(h.id)}>{h.hotelName}</td>
                <td onClick={() => moveHotelOne(h.id)}>{h.hotelAddress}</td>
            </tr>

        )
    }

}


export default HotelList