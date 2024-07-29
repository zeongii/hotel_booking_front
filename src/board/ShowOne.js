import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {Container, Table} from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

let ShowOne = () => {
    //useLocation 주소의 ? 뒤를 받아옴
    //useParams
    let params = useParams();
    let id = parseInt(params.id);
    let [data, setData] = useState({});

    useEffect(() => {
        //비동기 함수
        let selectOne = async () => {
            try {
                let resp = await axios.get('http://localhost:8080/board/showOne/' + id, {});
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


    return (
        <Container className={"mt-3"}>
            <Table striped bordered hover>
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
                    <td colSpan={2}>작성일: {data.entryDate} </td>
                    <td colSpan={2}>수정일: {data.modifyDate} </td>
                </tr>
            </Table>
            {data.content}
        </Container>
    )
}

export default ShowOne;



























