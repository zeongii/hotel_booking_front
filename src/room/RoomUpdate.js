import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Container, FormControl, FormSelect, Table} from "react-bootstrap";
import style from './Room.module.css'


let RoomUpdate = () => {
    let parms = useParams()
    let roomId = parms.roomId

    const roomTypeList = [
        {id: 1, typeName: '스탠다드+싱글+시티뷰'},
        {id: 2, typeName: '스탠다드+싱글+오션뷰'},
        {id: 3, typeName: '스탠다드+더블+시티뷰'},
        {id: 4, typeName: '스탠다드+더블+오션뷰'},
        {id: 5, typeName: '디럭스+싱글+시티뷰'},
        {id: 6, typeName: '디럭스+싱글+오션뷰'},
        {id: 7, typeName: '디럭스+더블+시티뷰'},
        {id: 8, typeName: '디럭스+더블+오션뷰'},
        {id: 9, typeName: '스위트+시티뷰'},
        {id: 10, typeName: '스위트+오션뷰'},
        {id: 11, typeName: '레지던스+시티뷰'},
        {id: 12, typeName: '레지던스+오션뷰'}
    ]
    let [inputs, setInputs] = useState({
        roomName: '',
        roomTypeId: '',
        roomMax: '',
        roomPrice: '',
        roomContent: '',
        /*checkIn: '',
        checkOut: '',*/
        breakfastPrice: ''
    })

    let onChange = (e) => {
        let {name, value} = e.target
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    let nevigate = useNavigate()
    let moveToNext = (id) => {
        nevigate(`/room/roomOne/${id}`)
    }

    let onSubmit = async (e) => {
        e.preventDefault()
        //나중에 글쓴이 확인하는거 넣어야함 if문으로
        let resp = await axios.post('http://localhost:8080/room/update', inputs, {
            withCredentials: true
        })
        if (resp.status === 200) {
            moveToNext(resp.data.destRoomId)
        }
    }

    useEffect(() => {
        let getUpdate = async () => {
            let resp = await axios.get('http://localhost:8080/room/showOne/' + roomId, {
                withCredentials: true
            })
            if (resp.status === 200) {
                setInputs(resp.data.roomDto)
            }
        }
        getUpdate()
    }, [])

    return (
        <div className={style.roomInsertContainer}>
            <Container className={"mt-3"}>
                <form onSubmit={onSubmit}>
                    <Table striped hover bordered>
                        <thead>
                        <tr>
                            <td colSpan={2} className={"text-center"}>객실 수정하기</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>객실 이름</td>
                            <td>
                                <FormControl
                                    type={'text'}
                                    value={inputs.roomName}
                                    name={'roomName'}
                                    onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>객실 타입</td>
                            <td>
                                <FormSelect name="roomTypeId" value={inputs.roomTypeId} onChange={onChange}>
                                    {roomTypeList.map(r => (
                                        <option key={r.id} value={r.id}>
                                            {r.typeName}
                                        </option>
                                    ))}
                                </FormSelect>
                            </td>
                        </tr>
                        <tr>
                            <td>객실 수</td>
                            <td>
                                <FormControl
                                    type={'number'}
                                    value={inputs.roomMax}
                                    name={'roomMax'}
                                    onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>객실 가격</td>
                            <td>
                                <FormControl
                                    type={'number'}
                                    value={inputs.roomPrice}
                                    name={'roomPrice'}
                                    onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>내용</td>
                            <td>
                            <textarea
                                name={'roomContent'}
                                value={inputs.roomContent}
                                className={"form-control"}
                                onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>조식 가격</td>
                            <td>
                                <FormControl
                                    type={'number'}
                                    value={inputs.breakfastPrice}
                                    name={'breakfastPrice'}
                                    onChange={onChange}/>
                            </td>
                        </tr>
                        {/* <tr>
                            <td>체크인</td>
                            <td>
                                <FormControl
                                    type={'datetime-local'}
                                    value={inputs.checkIn}
                                    name={'checkIn'}
                                    onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>체크아웃</td>
                            <td>
                                <FormControl
                                    type={'datetime-local'}
                                    value={inputs.checkOut}
                                    name={'checkOut'}
                                    onChange={onChange}/>
                            </td>
                        </tr>*/}
                        <tr>
                            <td colSpan={2} className={'text-center'}>
                                <Button type={'submit'}>
                                    수정하기
                                </Button>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </form>
            </Container>
        </div>
    )


}

export default RoomUpdate