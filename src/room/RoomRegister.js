import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Button, Container, FormControl, FormSelect, Table } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

let RoomRegister = () => {
    let hotelId = parseInt(1);

    const roomTypeList = [
        { id: 1, typeName: '스탠다드+싱글+시티뷰' },
        { id: 2, typeName: '스탠다드+싱글+오션뷰' },
        { id: 3, typeName: '스탠다드+더블+시티뷰' },
        { id: 4, typeName: '스탠다드+더블+오션뷰' },
        { id: 5, typeName: '디럭스+싱글+시티뷰' },
        { id: 6, typeName: '디럭스+싱글+오션뷰' },
        { id: 7, typeName: '디럭스+더블+시티뷰' },
        { id: 8, typeName: '디럭스+더블+오션뷰' },
        { id: 9, typeName: '스위트+시티뷰' },
        { id: 10, typeName: '스위트+오션뷰' },
        { id: 11, typeName: '레지던스+시티뷰' },
        { id: 12, typeName: '레지던스+오션뷰' }
    ];

    let [inputs, setInputs] = useState({
        roomName: '',
        roomTypeId: '',
        roomMax: '',
        roomPrice: '',
        roomContent: '',
        checkIn: '',
        checkOut: '',
        breakfastPrice: '',
        File: []
    });

    let navigate = useNavigate();

    let moveToNext = (roomId) => {
        navigate(`/room/roomOne/${roomId}`);
    };

    let onChange = (e) => {
        let { name, value } = e.target;
        if (name === "roomTypeId") {
            value = parseInt(value, 10);
        }

        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    let onEditorChange = (event, editor) => {
        const data = editor.getData();
        setInputs({
            ...inputs,
            roomContent: data,
        });
    };

    let onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in inputs) {
            if (key === 'File') {
                inputs[key].forEach(file => {
                    formData.append('files', file);
                });
            } else {
                formData.append(key, inputs[key]);
            }
        }

        try {
            let resp = await axios.post(`http://localhost:8080/room/write/${hotelId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (resp.data.roomId !== undefined) {
                moveToNext(resp.data.roomId);
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container className={"mt-3"}>
            <form onSubmit={onSubmit} encType={"multipart/form-data"}>
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
                                onChange={onChange} />
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
                                onChange={onChange} />
                        </td>
                    </tr>
                    <tr>
                        <td>객실 가격</td>
                        <td>
                            <FormControl
                                type={'number'}
                                value={inputs.roomPrice}
                                name={'roomPrice'}
                                onChange={onChange} />
                        </td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td>
                            <CKEditor
                                editor={ClassicEditor}
                                data={inputs.roomContent}
                                onChange={onEditorChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>조식 가격</td>
                        <td>
                            <FormControl
                                type={'number'}
                                value={inputs.breakfastPrice}
                                name={'breakfastPrice'}
                                onChange={onChange} />
                        </td>
                    </tr>
                    <tr>
                        <td>체크인</td>
                        <td>
                            <FormControl
                                type={'datetime-local'}
                                value={inputs.checkIn}
                                name={'checkIn'}
                                onChange={onChange} />
                        </td>
                    </tr>
                    <tr>
                        <td>체크아웃</td>
                        <td>
                            <FormControl
                                type={'datetime-local'}
                                value={inputs.checkOut}
                                name={'checkOut'}
                                onChange={onChange} />
                        </td>
                    </tr>
                    <tr>
                        <td>파일</td>
                        <td>
                            <FormControl
                                type={'file'}
                                name={'File'} multiple
                                onChange={(e) => {
                                    setInputs({
                                        ...inputs,
                                        File: Array.from(e.target.files)
                                    });
                                }} />
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
    );
};

export default RoomRegister;
