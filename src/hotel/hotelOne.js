import React, {useRef, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, Carousel, Container, Table} from "react-bootstrap";
import axios from "axios";
import Map from './Map';
import travelingImage from "./traveling.png";

const HotelOne = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = parseInt(params.id);

    const facility = [
        {id: 1, label: '️🏊‍♀️야외수영장'},
        {id: 2, label: '🤿실내수영장'},
        {id: 3, label: '♨️사우나'},
        {id: 4, label: '👨‍👩‍👧‍👦키즈룸'},
        {id: 5, label: '🎰카지노'},
        {id: 6, label: '🏋️피트니스센터'},
        {id: 7, label: '🛜무료와이파이'},
        {id: 8, label: '🫧️세탁시설'},
        {id: 9, label: '🛁스파'},
        {id: 10, label: '🛎️24시간 프론트 데스크'},
        {id: 11, label: '🥗레스토랑'},
        {id: 12, label: '🚗무료주차'},
        {id: 13, label: '🍸바'},
        {id: 14, label: '🏧ATM'},
        {id: 15, label: '🌴야외정원'}
    ];

    const [roomIndex, setRoomIndex] = useState(0);
    const [index, setIndex] = useState(0);
    const [hotelData, setHotelData] = useState({});


    const [facilities, setFacilities] = useState([]);
    const [fileData, setFileData] = useState([]);
    const [roomdata, setRoomdata] = useState({roomList: []});
    const [roomType, setRoomType] = useState([]);


    const handleSelect = (selectedIndex) => setRoomIndex(selectedIndex);
    const handleHotelSelect = (selectedIndex) => setIndex(selectedIndex);

    const roomInsert = (hotelId) => navigate(`/room/register/${hotelId}`);
    const moveToSingle = (roomId) => navigate(`/room/roomOne/${roomId}`);
    const onDelete = async () => {
        const resp = await axios.get(`http://localhost:8080/hotel/delete/${id}`);
        if (resp.status === 200) {
            navigate('/hotelAll');
        }
    };

    useEffect(() => {
        const fetchHotelData = async () => {
            const resp = await axios.get(`http://localhost:8080/hotel/hotelOne/${id}`);
            setHotelData(resp.data.hotelDto);
            setFileData(resp.data.hotelFileDtoList);
            setFacilities(resp.data.facilities);
        };
        fetchHotelData();
    }, [id]);

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const resp = await axios.get(`http://localhost:8080/room/showList/${id}`);
                if (resp.status === 200) {
                    setRoomdata(resp.data);
                    setRoomType(resp.data.roomTypeList);
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchRoomData();
    }, [id]);


    return (
        <Container className={"mt-3"}>
            <Carousel activeIndex={index} onSelect={handleHotelSelect} className="carousel-container">
                {fileData.map((file) => (
                    <Carousel.Item key={file.storedFileName}>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                            <img
                                src={`http://localhost:8080/hotel/${file.storedFileName}`}
                                alt={file.originalFileName}
                                style={{width: '600px', height: 'auto'}}
                            />
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
            <h1>{hotelData.hotelName}</h1>
            {facilities.map(f => (
                <div key={f}>{facility[f - 1].label}</div>
            ))}


            {/*<Map address={hotelData.address}/>
                    맵 고장남 하나만 뜨고 있음*/}

            <div style={styles.cardContainer}>
                {roomdata.roomList.map(r => (
                    <Card style={{width: '18rem'}}>
                        <Carousel activeIndex={roomIndex} onSelect={handleSelect} className="carousel-container">
                            {r.imageList.length > 0 ? (
                                r.imageList.map((roomImages) => (
                                    <Carousel.Item key={roomImages}>
                                        <div style={styles.imageContainer}>
                                            <Card.Img
                                                src={`http://localhost:8080/room/${roomImages}`}
                                                alt={roomImages}
                                                style={styles.image}
                                            />
                                        </div>
                                    </Carousel.Item>
                                ))
                            ) : (
                                <div style={styles.imageContainer}>
                                    <Card.Img
                                        src={travelingImage}
                                        alt="기본 이미지"
                                        style={styles.image}
                                    />
                                </div>
                            )}
                        </Carousel>

                        <Card.Body onClick={() => moveToSingle(r.id)}>
                            <Card.Title>{roomType.map(r => (
                                r.roomTypeId === r.id ? <td key={r.id}> 방 타입: {r.typeName}</td> : null
                            ))}</Card.Title>
                            <Card.Text>
                                {r.roomPrice}
                            </Card.Text>
                            <Button variant="primary">예약하러 가기</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    );
};

const styles = {
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        justifyContent: 'space-between',
    },
    card: {
        width: '15rem',
        boxSizing: 'border-box',
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '300px', // 적절한 높이 설정
    },
    image: {
        width: '100%',
        height: '300px',
    },
};

export default HotelOne;