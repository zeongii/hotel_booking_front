import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, Carousel, Container, Form, Table} from "react-bootstrap";
import DatePicker from "react-datepicker";
import travelingImage from "./traveling.png";
import {AiFillHeart} from "react-icons/ai";
import style from "./Hotel.module.css";
import Map from "./Map";

let MyHotelOne = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = parseInt(params.id);

    let location = useLocation()
    let userInfo = location.state.userInfo


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

    const moveToSingle = (roomId) => navigate(`/room/roomOne/${roomId}`, {
        state: {
            userInfo: userInfo
        }
    });
    const onDelete = async () => {
        const resp = await axios.get(`http://localhost:8080/hotel/delete/${id}`);
        console.log(resp)
        if (resp.status === 200) {
            navigate('/hotel/showList', {state: {userInfo: userInfo}});
        }
    };


    let roomInsert = (hotelId) => {
        navigate(`/room/register/${hotelId}`, {state: {userInfo: userInfo}})
    }


    const onUpdate = () => {
        navigate('/hotelUpdate/' + id, {state: {userInfo: userInfo}})
    }

    let [wish, setWish] = useState({
        hotelId: id,
        guestId: userInfo.id
    })

    const [isWished, setIsWished] = useState(() => {
        // 초기 로드 시 localStorage에서 값을 불러옵니다.
        const savedWishStatus = localStorage.getItem(`hotel-wished-${id}`);
        return savedWishStatus === 'true'; // 저장된 값이 true이면 true로 설정
    });


    const wishList = async () => {
        try {
            const resp = await axios.post('http://localhost:8080/guest/wishlist', wish, {state: {userInfo: userInfo}});

            console.log(resp.data);
            console.log(wish)
            const newWishStatus = !isWished;
            setIsWished(newWishStatus);

            // 새로 업데이트된 좋아요 상태를 localStorage에 저장
            localStorage.setItem(`hotel-wished-${id}`, newWishStatus.toString());
        } catch (error) {
            console.error('Error adding/removing from wishlist:', error);
        }
    }
    useEffect(() => {
        const fetchHotelData = async () => {
            const resp = await axios.get(`http://localhost:8080/hotel/hotelOne/${id}`);
            setHotelData(resp.data.hotelDto);
            setFileData(resp.data.hotelFileDtoList);
            setFacilities(resp.data.facilities);
            console.log(resp)
        };
        fetchHotelData();
    }, [id]);


    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const resp = await axios.get(`http://localhost:8080/room/showList/${id}`, {state: {userInfo: userInfo}});
                if (resp.status === 200) {
                    setRoomdata(resp.data);
                    setRoomType(resp.data.roomTypeList);
                    console.log(resp);
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
                {fileData.length > 0 ? (
                    fileData.map((file) => (
                        <Carousel.Item key={file.storedFileName}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                marginBottom: "50px"
                            }}>
                                <img
                                    src={`http://localhost:8080/hotel/${file.storedFileName}`}
                                    alt={`http://localhost:8080/hotel/${file.storedFileName}`}
                                    style={{
                                        width: '600px',
                                        height: 'auto',
                                        border: '1px solid #9ec2fc',
                                        borderRadius: '8px',
                                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
                                    }}
                                />
                            </div>
                        </Carousel.Item>
                    ))
                ) : (
                    <Carousel.Item>
                        <div style={{
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
                                    width: '600px',
                                    height: 'auto',
                                    border: '1px solid #9ec2fc',
                                    borderRadius: '8px',
                                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
                                }}
                            />
                        </div>
                    </Carousel.Item>
                )}
            </Carousel>
            <h1 className="mb-5">{hotelData.hotelName}

                <AiFillHeart onClick={wishList}
                             style={{cursor: 'pointer', fontSize: '45px', color: isWished ? 'red' : 'lightgray'}}/>
                &emsp; &emsp;
                {hotelData.userId === userInfo.id && (
                    <>
                        <Button onClick={onDelete} style={button}>호텔 삭제</Button> &emsp;
                        <Button onClick={onUpdate} style={button}>호텔 수정</Button> &emsp;
                    </>
                )}
            </h1>
            <div className={style.hotelContainer}>
                <div className={style.hotelInfo}>
                    {facilities.map(f => (
                        <div key={f}>{facility[f - 1].label}</div>
                    ))}
                </div>

                <div className={style.hotelMap}><Map address={hotelData.address}/></div>

            </div>

            <div style={{marginTop: '20px'}}>
                {hotelData.userId === userInfo.id && (
                    <Button onClick={() => roomInsert(hotelData.id)} style={button}>방 등록하기</Button>
                )}
            </div>


            <div style={styles.cardContainer}>
                {roomdata.roomList.length > 0 ? (
                    roomdata.roomList.map(r => (
                        <Card key={r.id} style={{width: '18rem', marginTop: "50px"}}>
                            <Carousel activeIndex={roomIndex} onSelect={handleSelect}
                                      className="carousel-container">
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
                                <Card.Title>

                                </Card.Title>
                                <Card.Text>
                                    {roomType.map(rt => (
                                        r.roomTypeId === rt.id ? <td key={rt.id}> {rt.typeName}</td> : null
                                    ))}
                                    {r.roomPrice}
                                </Card.Text>
                                <Button style={button}>예약하러 가기</Button>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <div className={style.room}>
                        <h2>No rooms are registered</h2>
                    </div>
                )}
            </div>

        </Container>
    );
};

const styles = {
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
    },
    card: {
        width: '15rem',
        boxSizing: 'border-box',
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px', // 적절한 높이 설정
    },
    image: {
        width: '100%',
        height: '200px',
    }

};

const button = {
    backgroundColor: '#9ec2fc',
    borderColor: '#9ec2fc',

}
export default MyHotelOne