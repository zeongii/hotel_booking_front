import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button, Card, Carousel, Container, Form, Table} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';

import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import travelingImage from "../hotel/traveling.png";
import {useNavigate} from "react-router-dom";


const SearchHotel = () => {
    const [hotelArr, setHotelArr] = useState([]);
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState();
    const [peopleCount, setPeopleCount] = useState(1);
    const [searchDone, setSearchDone] = useState(false); // 검색 완료 여부 상태 추가

    let [searchParams, setSearchParams] = useState({
        grade: [],
        cityId: [],
        facilityId: [],
        roomTypeId: [],
        hotelName: "",
        startDate: "",
        endDate: "",
        peopleCount: peopleCount
    });

    const grades = [
        {id: 1, label: '1성급'},
        {id: 2, label: '2성급'},
        {id: 3, label: '3성급'},
        {id: 4, label: '4성급'},
        {id: 5, label: '5성급'}
    ];

    const cities = [
        {id: 1, label: '서울'},
        {id: 2, label: '부산'},
        {id: 3, label: '인천'},
        {id: 4, label: '대구'},
        {id: 5, label: '광주'},
        {id: 6, label: '대전'},
        {id: 7, label: '울산'},
        {id: 8, label: '제주'},
        {id: 9, label: '수원'},
        {id: 10, label: '경주'},
    ];

    const facilities = [
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

    const roomTypeList = [
        {id: 1, label: '스탠다드+싱글+시티뷰'},
        {id: 2, label: '스탠다드+싱글+오션뷰'},
        {id: 3, label: '스탠다드+더블+시티뷰'},
        {id: 4, label: '스탠다드+더블+오션뷰'},
        {id: 5, label: '디럭스+싱글+시티뷰'},
        {id: 6, label: '디럭스+싱글+오션뷰'},
        {id: 7, label: '디럭스+더블+시티뷰'},
        {id: 8, label: '디럭스+더블+오션뷰'},
        {id: 9, label: '스위트+시티뷰'},
        {id: 10, label: '스위트+오션뷰'},
        {id: 11, label: '레지던스+시티뷰'},
        {id: 12, label: '레지던스+오션뷰'}
    ];

    useEffect(() => {
        const initialSearchParams = { ...searchParams, startDate: new Date(), endDate: new Date() };
        setSearchParams(initialSearchParams);
        handleSearch();  // 컴포넌트가 마운트될 때 handleSearch 호출
    }, []);

    const handleCheckboxChange = (name, id) => {
        setSearchParams(prev => {
            const updatedList = prev[name].includes(id)
                ? prev[name].filter(item => item !== id)
                : [...prev[name], id];
            const newParams = {...prev, [name]: updatedList};

            console.log(`잘 들어가니..?`, newParams);

            return newParams;
        });
    };


    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        console.log('잘 받고 있니?:', searchParams);

        try {
            const response = await axios.post('http://localhost:8080/search/hotel', searchParams);
            const responseHotelDtoList = response.data.hotelDtoList;
            console.log(responseHotelDtoList);
            console.log(response.data.peopleCount);

            const newHotelArr = [];
            setHotelArr([]);
            responseHotelDtoList.forEach(hotel => newHotelArr.push(hotel));

            newHotelArr.forEach(h => setHotelArr(...hotelArr, hotelArr.push(h)))
            setHotelArr(newHotelArr);

            console.log(hotelArr);
        } catch (error) {
            console.error('호텔 검색 중 오류가 발생했습니다!', error);
        }
    };



    const hotelNameChange = (e) => {
        let {name, value} = e.target;

        setSearchParams({
            ...searchParams,
            [name]: value
        })
        console.log(searchParams.hotelName);
    }

    const addPeople = () => {
        if (searchParams.peopleCount < 9) {
            setSearchParams({
                ...searchParams,
                peopleCount: searchParams.peopleCount + 1
            })
        }
    }

    const minusPeople = () => {
        if (searchParams.peopleCount > 1) {
            setSearchParams({
                ...searchParams,
                peopleCount: searchParams.peopleCount - 1
            })
        }
    }


    const [hotelIndex, setHotelIndex] = useState(0)
    const handleSelect = (selectedIndex) => {
        setHotelIndex(selectedIndex)
    }

    let navigate = useNavigate()

    let moveHotelOne = (id) => {
        navigate('/hotelOne/' + id)
    }


    return (
        <Container>
            <h1>호텔 검색</h1>
            <Form onSubmit={handleSearch}>
                <Table>
                    <thead>
                    <tr>
                        <td valign='middle' align='center'>
                            <DatePicker
                                dateFormat='yyyy-MM-dd'
                                shouldCloseOnSelect
                                minDate={new Date()}
                                selected={startDate}
                                value={startDate}
                                placeholderText='시작 날짜'
                                onChange={(date) => {
                                    setStartDate(date);
                                    setSearchParams({
                                        ...searchParams,
                                        startDate: date
                                    })
                                }}
                            />
                        </td>
                        <td valign='middle' align='center'>
                            <DatePicker
                                dateFormat='yyyy-MM-dd'
                                shouldCloseOnSelect
                                minDate={Math.max(searchParams.startDate, new Date())}
                                selected={searchParams.endDate}
                                placeholderText='마지막 날짜'
                                onChange={(date) => {
                                    setEndDate(date);
                                    setSearchParams({
                                        ...searchParams,
                                        endDate: date
                                    })
                                }}
                            />
                        </td>
                        <td valign='middle' align='center'>
                            <Table>
                                <tbody>
                                <tr>
                                    <th>
                                        <Button onClick={minusPeople}>-</Button>
                                    </th>
                                    <th>
                                        <input type='text' className='form-control' disabled='true'
                                               value={'인원수: ' + searchParams.peopleCount}/>
                                    </th>
                                    <th>
                                        <Button onClick={addPeople}>+</Button>
                                    </th>
                                </tr>
                                </tbody>
                            </Table>
                        </td>
                    </tr>
                    </thead>
                </Table>


                <Table striped>
                    <tbody>
                    <tr>
                        <th>호텔 등급</th>
                        {grades.map(grade => (
                            <td>
                                <label key={grade.id}>
                                    <input
                                        type="checkbox"
                                        checked={searchParams.grade.includes(grade.id)}
                                        onChange={() => handleCheckboxChange('grade', grade.id)}
                                    />
                                    {grade.label}
                                </label>
                            </td>
                        ))}
                    </tr>

                    <tr>
                        <th rowSpan={3}>도시</th>
                        <td>
                            <label key={1}>
                                <input type="checkbox"
                                       checked={searchParams.cityId.includes(1)}
                                       onChange={() => handleCheckboxChange('cityId', 1)}
                                />
                                서울
                            </label>
                        </td>
                        <td>
                            <label key={2}>
                                <input type="checkbox"
                                       checked={searchParams.cityId.includes(2)}
                                       onChange={() => handleCheckboxChange('cityId', 2)}
                                />
                                경기
                            </label>
                        </td>
                        <td>
                            <label key={3}>
                                <input type="checkbox"
                                       checked={searchParams.cityId.includes(3)}
                                       onChange={() => handleCheckboxChange('cityId', 3)}
                                />
                                인천
                            </label>
                        </td>
                        <td>
                            <label key={4}>
                                <input type="checkbox"
                                       checked={searchParams.cityId.includes(4)}
                                       onChange={() => handleCheckboxChange('cityId', 4)}
                                />
                                대구
                            </label>
                        </td>
                        <td>
                            <label key={5}>
                                <input type="checkbox"
                                       checked={searchParams.cityId.includes(5)}
                                       onChange={() => handleCheckboxChange('cityId', 5)}
                                />
                                광주
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label key={6}>
                                <input type="checkbox"
                                       checked={searchParams.cityId.includes(6)}
                                       onChange={() => handleCheckboxChange('cityId', 6)}
                                />
                                대전
                            </label>
                        </td>
                        <td>
                            <label key={7}>
                                <input type="checkbox"
                                       checked={searchParams.cityId.includes(7)}
                                       onChange={() => handleCheckboxChange('cityId', 7)}
                                />
                                울산
                            </label>
                        </td>
                        <td>
                            <label key={8}>
                                <input type="checkbox"
                                       checked={searchParams.cityId.includes(8)}
                                       onChange={() => handleCheckboxChange('cityId', 8)}
                                />
                                제주
                            </label>
                        </td>
                        <td>
                            <label key={9}>
                                <input type="checkbox"
                                       checked={searchParams.cityId.includes(9)}
                                       onChange={() => handleCheckboxChange('cityId', 9)}
                                />
                                수원
                            </label>
                        </td>
                        <td>
                            <label key={10}>
                                <input type="checkbox"
                                       checked={searchParams.cityId.includes(10)}
                                       onChange={() => handleCheckboxChange('cityId', 10)}
                                />
                                경주
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label key={11}>
                                <input type="checkbox"
                                       checked={searchParams.cityId.includes(11)}
                                       onChange={() => handleCheckboxChange('cityId', 11)}
                                />
                                부산
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th rowSpan={3}>편의시설</th>
                        <td>
                            <label key={1}>
                                <input
                                    type="checkbox"
                                    checked={searchParams.facilityId.includes(1)}
                                    onChange={() => handleCheckboxChange('facilityId', 1)}
                                />
                                야외수영장
                            </label>
                        </td>
                        <td>
                            <label key={2}>
                                <input
                                    type="checkbox"
                                    checked={searchParams.facilityId.includes(2)}
                                    onChange={() => handleCheckboxChange('facilityId', 2)}
                                />
                                실내수영장
                            </label>
                        </td>
                        <td>
                            <label key={3}>
                                <input
                                    type="checkbox"
                                    checked={searchParams.facilityId.includes(3)}
                                    onChange={() => handleCheckboxChange('facilityId', 3)}
                                />
                                사우나
                            </label>
                        </td>
                        <td>
                            <label key={4}>
                                <input
                                    type="checkbox"
                                    checked={searchParams.facilityId.includes(4)}
                                    onChange={() => handleCheckboxChange('facilityId', 4)}
                                />
                                키즈룸
                            </label>
                        </td>
                        <td>
                            <label key={5}>
                                <input
                                    type="checkbox"
                                    checked={searchParams.facilityId.includes(5)}
                                    onChange={() => handleCheckboxChange('facilityId', 5)}
                                />
                                카지노
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label key={6}>
                                <input
                                    type="checkbox"
                                    checked={searchParams.facilityId.includes(6)}
                                    onChange={() => handleCheckboxChange('facilityId', 6)}
                                />
                                피트니스센터
                            </label>
                        </td>
                        <td>
                            <label key={7}>
                                <input
                                    type="checkbox"
                                    checked={searchParams.facilityId.includes(7)}
                                    onChange={() => handleCheckboxChange('facilityId', 7)}
                                />
                                무료와이파이
                            </label>
                        </td>
                        <td>
                            <label key={8}>
                                <input
                                    type="checkbox"
                                    checked={searchParams.facilityId.includes(8)}
                                    onChange={() => handleCheckboxChange('facilityId', 8)}
                                />
                                세탁시설
                            </label>
                        </td>
                        <td>
                            <label key={9}>
                                <input
                                    type="checkbox"
                                    checked={searchParams.facilityId.includes(9)}
                                    onChange={() => handleCheckboxChange('facilityId', 9)}
                                />
                                스파
                            </label>
                        </td>
                        <td>
                            <label key={10}>
                                <input
                                    type="checkbox"
                                    checked={searchParams.facilityId.includes(10)}
                                    onChange={() => handleCheckboxChange('facilityId', 10)}
                                />
                                24시간 프론트 데스크
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label key={11}>
                                <input
                                    type="checkbox"
                                    checked={searchParams.facilityId.includes(11)}
                                    onChange={() => handleCheckboxChange('facilityId', 11)}
                                />
                                레스토랑
                            </label>
                        </td>
                        <td>
                            <label key={12}>
                                <input
                                    type="checkbox"
                                    checked={searchParams.facilityId.includes(12)}
                                    onChange={() => handleCheckboxChange('facilityId', 12)}
                                />
                                무료주차
                            </label>
                        </td>
                        <td>
                            <label key={13}>
                                <input
                                    type="checkbox"
                                    checked={searchParams.facilityId.includes(13)}
                                    onChange={() => handleCheckboxChange('facilityId', 13)}
                                />
                                바
                            </label>
                        </td>
                        <td>
                            <label key={14}>
                                <input
                                    type="checkbox"
                                    checked={searchParams.facilityId.includes(14)}
                                    onChange={() => handleCheckboxChange('facilityId', 14)}
                                />
                                ATM
                            </label>
                        </td>
                        <td>
                            <label key={15}>
                                <input
                                    type="checkbox"
                                    checked={searchParams.facilityId.includes(15)}
                                    onChange={() => handleCheckboxChange('facilityId', 15)}
                                />
                                야외정원
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th rowSpan={3}>방 타입</th>
                        <td>
                            <label key={1}>
                                <input
                                    type="checkbox"
                                    checked={searchParams.roomTypeId.includes(1)}
                                    onChange={() => handleCheckboxChange('roomTypeId', 1)}
                                />
                                스탠다드+싱글+시티뷰
                            </label>
                        </td>
                        <td>
                            <label key={2}>
                                <input
                                    type="checkbox"
                                    checked={searchParams.roomTypeId.includes(2)}
                                    onChange={() => handleCheckboxChange('roomTypeId', 2)}
                                />
                                스탠다드+싱글+오션뷰
                            </label>
                        </td>
                        <td>
                            <label key={3}>
                                <input
                                    type="checkbox"
                                    checked={searchParams.roomTypeId.includes(3)}
                                    onChange={() => handleCheckboxChange('roomTypeId', 3)}
                                />
                                스탠다드+더블+시티뷰
                            </label>
                        </td>
                        <td>
                            <label key={4}>
                                <input
                                    type="checkbox"
                                    checked={searchParams.roomTypeId.includes(4)}
                                    onChange={() => handleCheckboxChange('roomTypeId', 4)}
                                />
                                스탠다드+더블+오션뷰
                            </label>
                        </td>
                        <td>
                            <label key={5}>
                                <input
                                    type="checkbox"
                                    checked={searchParams.roomTypeId.includes(5)}
                                    onChange={() => handleCheckboxChange('roomTypeId', 5)}
                                />
                                디럭스+싱글+시티뷰
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label key={6}>
                                <input
                                    type="checkbox"
                                    checked={searchParams.roomTypeId.includes(6)}
                                    onChange={() => handleCheckboxChange('roomTypeId', 6)}
                                />
                                디럭스+싱글+오션뷰
                            </label>
                        </td>
                        <td>
                            <label key={7}>
                                <input
                                    type="checkbox"
                                    checked={searchParams.roomTypeId.includes(7)}
                                    onChange={() => handleCheckboxChange('roomTypeId', 7)}
                                />
                                디럭스+더블+시티뷰
                            </label>
                        </td>
                        <td>
                            <label key={8}>
                                <input
                                    type="checkbox"
                                    checked={searchParams.roomTypeId.includes(8)}
                                    onChange={() => handleCheckboxChange('roomTypeId', 8)}
                                />
                                디럭스+더블+오션뷰
                            </label>
                        </td>
                        <td>
                            <label key={9}>
                                <input
                                    type="checkbox"
                                    checked={searchParams.roomTypeId.includes(9)}
                                    onChange={() => handleCheckboxChange('roomTypeId', 9)}
                                />
                                스위트+시티뷰
                            </label>
                        </td>
                        <td>
                            <label key={10}>
                                <input
                                    type="checkbox"
                                    checked={searchParams.roomTypeId.includes(10)}
                                    onChange={() => handleCheckboxChange('roomTypeId', 10)}
                                />
                                스위트+오션뷰
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label key={11}>
                                <input
                                    type="checkbox"
                                    checked={searchParams.roomTypeId.includes(11)}
                                    onChange={() => handleCheckboxChange('roomTypeId', 11)}
                                />
                                레지던스+시티뷰
                            </label>
                        </td>
                        <td>
                            <label key={12}>
                                <input
                                    type="checkbox"
                                    checked={searchParams.roomTypeId.includes(12)}
                                    onChange={() => handleCheckboxChange('roomTypeId', 12)}
                                />
                                레지던스+오션뷰
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th>호텔 이름</th>
                        <td colSpan={5}>
                            <label key="hotelName">
                                <input type={'text'} name={'hotelName'} value={searchParams.hotelName}
                                       className="form-control"
                                       onChange={hotelNameChange}/>
                            </label>
                        </td>
                    </tr>
                    </tbody>
                </Table>
                <Button type="submit">검색</Button>
            </Form>

            <h2>검색 결과</h2>
            <div style={styles.cardContainer}>
                {hotelArr.map(hotel => (
                    <Card style={{width: '18rem'}}>
                        <Carousel activeIndex={hotelIndex} onSelect={handleSelect} className="carousel-container">
                            {(hotel.imageList && hotel.imageList.length > 0) ? (
                                hotel.imageList.map((hotelImages, imgIndex) => (
                                    <Carousel.Item key={imgIndex}>
                                        <div style={styles.imageContainer}>
                                            <Card.Img
                                                src={`http://localhost:8080/hotel/${hotelImages}`}
                                                alt={hotelImages}
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
                        <Card.Body onClick={() => moveHotelOne(hotel.id)}>
                            <Card.Title>{hotel.hotelName}</Card.Title>
                            <Card.Text>
                                호텔 정보 넣기
                            </Card.Text>
                            <Button style={button}>예약하러 가기</Button>
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
        width: '18rem',
        flex: '1 1 calc(33.333% - 1rem)', // 한 줄에 3개 배치
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

const button = {
    backgroundColor: '#99bffd',
    borderColor: '#99bffd',
};

export default SearchHotel;
