import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {Button, Container, FormControl, FormSelect, Table} from "react-bootstrap";
import style from './Room.module.css'


let RoomRegister = () => {
    let hotelId = parseInt(1);

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
    ];

    let [inputs, setInputs] = useState({
        roomName: '',
        roomTypeId: '',
        roomMax: '',
        roomPrice: '',
        roomContent: '',
        /*checkIn: '',
        checkOut: '',*/
        breakfastPrice: ''
    });

    let navigate = useNavigate();

    let moveToNext = (roomId) => {
        navigate(`/room/roomImgInsert/${roomId}`);
    };

    let onChange = (e) => {
        let {name, value} = e.target;
        if (name === "roomTypeId") {
            value = parseInt(value, 10);
        }

        setInputs({
            ...inputs,
            [name]: value,
        });
    };


    let onSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs)


        try {
            let resp = await axios.post(`http://localhost:8080/room/write/${hotelId}`, inputs, {

                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(resp)
            if (resp.data.roomId !== undefined) {
                moveToNext(resp.data.roomId);
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={style.roomInsertContainer}>

            <Container className={"mt-3"}>
                <form onSubmit={onSubmit} encType={"multipart/form-data"}>
                    <Table>
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
                                <FormControl
                                    type={'text'}
                                    value={inputs.roomContent}
                                    name={'roomContent'}
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
        </div>

    )
        ;
};

export default RoomRegister;