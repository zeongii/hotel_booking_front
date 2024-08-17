import React, {useState} from 'react';
import axios from "axios";
import {Button, Container, Form, FormControl, Table} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import DaumPostcode from 'react-daum-postcode';
import style from './Hotel.module.css'

let HotelInsert = () => {
    let params = useParams()
    let id = params.id


    let [inputs, setInputs] = useState({
        hotelName: '',
        hotelAddress: '',
        hotelPhone: '',
        hotelEmail: '',
        hotelGrade: '',
        cityId: '',
        facilities: []
    })

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


    const [roadAddress, setRoadAddress] = useState("");
    const [buildingName, setBuildingName] = useState("");

    const completeHandler = (data) => {
        console.log(data);
        setRoadAddress(data.roadAddress);
        setBuildingName(data.buildingName);
    }


    const [selectedFacilities, setSelectedFacilities] = useState([]);
    // 아무것도 들어있지 않은 체크박스 배열을 만들고

    const handleCheckboxChange = (id) => {
        setSelectedFacilities(prev =>
            prev.includes(id) ? prev.filter(facilityId => facilityId !== id) : [...prev, id]
        );
        //기존에 가지고있던 배열에 내가 넣으려는 id가 있으면 빼고, 그게 아니면 넣도록 코드 만들기(checkBox)
    };


    let navigate = useNavigate()

    let moveToNext = (id) => {
        navigate(`/imgInsert/${id}`)
    }


    let onChange = (e) => {
        let {name, value} = e.target
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    let onSubmit = async (e) => {
        e.preventDefault()
        let valueMap = {
            hotelAddress: roadAddress,
            hotelEmail: inputs.hotelEmail,
            hotelGrade: inputs.hotelGrade,
            hotelName: buildingName,
            hotelPhone: inputs.hotelPhone,
            cityId: inputs.cityId,
            facilities: selectedFacilities
        }
        console.log(valueMap)
        try {
            let resp = await axios.post('http://localhost:8080/hotel/update/' + id, valueMap)
            console.log(resp)
            moveToNext(id)


        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Container>
            <div className={style.hotelInsertContainer}>
                <form onSubmit={onSubmit}>
                    <Table style={{width: '70%', margin: '0 auto'}}>
                        <thead>
                        <tr className="text-center">
                            <td className={'col-3'}>호텔 수정하기</td>
                        </tr>
                        </thead>
                        <tbody>
                        <DaumPostcode onComplete={completeHandler}/>
                        <tr>
                            <td>호텔명 &emsp; {buildingName} </td>
                        </tr>
                        <tr>
                            <td>호텔주소 &emsp; {roadAddress} </td>
                        </tr>
                        <tr>
                            <td>호텔이메일 <FormControl type={'text'} value={inputs.hotelEmail} name={'hotelEmail'}
                                                   onChange={onChange} placeholder={"ex) hotel1234@gmail.com"}/>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Form.Label>호텔 도시</Form.Label>
                                <Form>
                                    <Form.Group>
                                        <Form.Control
                                            as="select"
                                            value={inputs.cityId}
                                            name="cityId"
                                            onChange={onChange}
                                        >
                                            <option value="">호텔 도시 선택</option>
                                            <option value="1">서울</option>
                                            <option value="2">경기</option>
                                            <option value="3">인천</option>
                                            <option value="4">대구</option>
                                            <option value="5">광주</option>
                                            <option value="6">대전</option>
                                            <option value="7">울산</option>
                                            <option value="8">제주</option>
                                            <option value="9">수원</option>
                                            <option value="10">경주</option>
                                            <option value="11">부산</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form>
                            </td>
                        </tr>
                        <tr>
                            <td>호텔전화번호<FormControl type={'text'} value={inputs.hotelPhone} name={'hotelPhone'}
                                                   onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>호텔 등급</Form.Label>
                                <Form>
                                    <Form.Group>
                                        <Form.Control
                                            as="select"
                                            value={inputs.hotelGrade}
                                            name="hotelGrade"
                                            onChange={onChange}
                                        >
                                            <option value="">호텔 등급 선택</option>
                                            <option value="1">1성급</option>
                                            <option value="2">2성급</option>
                                            <option value="3">3성급</option>
                                            <option value="4">4성급</option>
                                            <option value="5">5성급</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form>
                            </td>
                        </tr>
                        <tr className="text-center">
                            <td>편의시설</td>
                        </tr>
                        <tr>
                            <td>
                                {facilities.map(facility => (
                                    <label key={facility.id}>
                                        <input
                                            type="checkbox"
                                            checked={selectedFacilities.includes(facility.id)}
                                            onChange={() => handleCheckboxChange(facility.id)}
                                        />
                                        {facility.label} &ensp;
                                    </label>
                                ))}
                            </td>
                        </tr>

                        <tr className="text-center">
                            <td>
                                <Button type={'submit'}>수정하기</Button>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </form>
            </div>
        </Container>

    )
}
export default HotelInsert
