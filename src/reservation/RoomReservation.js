import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {Button, Container, FormCheck, FormControl, Table} from "react-bootstrap";
import axios from "axios";
import style from './reg.module.css'


let RoomReservation = () => {

    let parms = useParams()
    let roomId = parseInt(parms.roomId);

    let [inputs, setInputs] = useState({
        startDate: '',
        endDate: '',
        isBreakfast: '',
        enabled: 1
    });

    let nevigate = useNavigate();

    let moveToNext = (reservationId) => {
        nevigate(`/reservation/reservationOne/${reservationId}`)
    }

    let onChange = (e) => {
        let {name, value} = e.target;

        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    let onSubmit = async (e) => {
        e.preventDefault();

        try {
            let resp = await axios.post(`http://localhost:8080/reservation/roomReservation/${roomId}`, inputs, {
                withCredentials: true
            });

            if (resp.data.reservationId !== undefined) {
                moveToNext(resp.data.reservationId);
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={style.regContainer}>
            <Container >
                <form onSubmit={onSubmit}>
                    <Table hover >
                        <thead>
                        <tr>
                            <td colSpan={2} className={"text-center"}>객실 예약하기</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>체크인 날짜
                                <FormControl
                                    type={'date'}
                                    value={inputs.startDate}
                                    name={'startDate'}
                                    onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>체크아웃 날짜
                                <FormControl
                                    type={'date'}
                                    value={inputs.endDate}
                                    name={'endDate'}
                                    onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>조식 선택
                                <FormCheck
                                    type={'radio'}
                                    label={'예'}
                                    value={1}
                                    name={'isBreakfast'}
                                    onChange={onChange}
                                />
                                <FormCheck
                                    type={'radio'}
                                    label={'아니오'}
                                    value={0}
                                    name={'isBreakfast'}
                                    onChange={onChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className={'text-center'}>
                                <Button type={'submit'}>
                                    예약하기
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

export default RoomReservation