import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Container, FormControl, FormSelect, Table} from "react-bootstrap";


let RoomRegister= () => {
    let hotelId=parseInt(1)



    let [inputs,setInputs] = useState({
        roomName: '',
        roomTypeId: '',
        roomMax: '',
        roomPrice: '',
        roomContent: '',
        checkIn: '',
        checkOut: '',
        breakfastPrice: ''
    })

    let [data, setData] = useState({roomTypeList:[]})

    let nevigate = useNavigate()

    let moveToNext = (roomId) => {
        nevigate(`/room/roomOne/${roomId}`)
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
        try {
            let resp = await axios.post(`http://localhost:8080/room/write/`+hotelId, inputs)

            if (resp.data.roomId !== undefined) {
                moveToNext(resp.data.roomId)
            }

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Container className={"mt-3"}>
            <form onSubmit={onSubmit}>
                <Table striped hover bordered>
                    <thead>
                    <tr>
                        <td colSpan={2} className={"text-center"}>객실 등록하기</td>
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
                                {data.roomTypeList.map(r => (
                                    <option key={r.id} value={r.id}>
                                        {r.typeContent}
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
                                name={'content'}
                                value={inputs.content}
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
                    <tr>
                        <td colSpan={2} className={'text-center'}>
                            <Button type={'submit'}>
                                등록하기
                            </Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </form>

        </Container>
    )

}

export default RoomRegister