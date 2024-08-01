import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {Button, Container, Table} from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

let ShowOne = () => {
    //useLocation 주소의 ? 뒤를 받아옴
    //useParams
    let params = useParams();
    let id = parseInt(params.id);
    let [data, setData] = useState({});

    let location = useLocation();
    let userInfo = location.state.userInfo;

    let navigate = useNavigate();
    let goBack = () => {
        navigate(-1);
    }

    let onUpdate = () => {
        navigate(`/board/update/` + id, {state: {userInfo: userInfo}});
    }

    let onDelete = async () => {
        let response = await axios.get('http://localhost:8080/board/delete/' + id, {
            withCredentials: true
        })

        if (response.status === 200) {
            navigate('/board/showList/1', {state: {userInfo: userInfo}});
        }
    }

    useEffect(() => {
        //비동기 함수
        let selectOne = async () => {
            try {
                let resp = await axios.get('http://localhost:8080/board/showOne/' + id, {
                    withCredentials: true
                });
                if (resp.status === 200) {
                    console.log(data);
                    setData(resp.data);
                }
            } catch (e) {
                console.error(e);
            }
        }
        selectOne();
    }, [])

    let onLogout = async () => {
        let response = await axios.post('http://localhost:8080/user/logOut', {
            withCredentials: true
        });

        if (response.status === 200) {
            navigate('/');
        }
        console.log(response);
    }

    return (
        <Container className={"mt-3"}>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <td colSpan={2} className={'text-end'}>
                        <Button onClick={onLogout}>logOut</Button>
                    </td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td colSpan={2}>제목: {data.title} </td>
                </tr>
                <tr>
                    <td colSpan={2}>글 번호: {data.id} </td>
                </tr>
                <tr>
                    <td colSpan={2}>작성자: {data.nickname} </td>
                </tr>
                <tr>
                    <td>작성일: {data.entryDate} </td>
                    <td>수정일: {data.modifyDate} </td>
                </tr>
                {data.writerId === userInfo.id ?
                    <tr className={'justify-content-center'}>
                        <td className={'text-start'}>
                            <Button onClick={onUpdate}>수정 페이지</Button>
                        </td>
                        <td className={'text-end'}>
                            <Button onClick={onDelete}>삭제</Button>
                        </td>
                    </tr>
                    : null
                }
                <tr>
                    <td colSpan={2} className={"text-center"}>
                        <Button onClick={goBack}>뒤로 가기</Button>
                    </td>
                </tr>
                </tbody>
            </Table>
            {data.content}
        </Container>
    )
}

export default ShowOne;



























