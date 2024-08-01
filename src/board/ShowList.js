import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Container, Pagination, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';

let ShowList = () => {
    let location = useLocation();
    let userInfo = location.state.userInfo;

    let [data, setData] = useState({boardList: []});

    let params = useParams();
    let pageNo = params.pageNo;

    let navigate = useNavigate();
    let moveToSingle = (id) => {
        navigate('/board/showOne/' + id, {state: {userInfo: userInfo}});
    }

    let moveToPage = (pageNo) => {
        navigate('/board/showList/' + pageNo, {state: {userInfo: userInfo}});
    }

    useEffect(() => {
        let selectList = async () => {
            let resp = await axios.get('http://localhost:8080/board/showList/' + pageNo, {
                withCredentials: true
            })
                .catch((e) => {
                    //pageNo에 유효하지 않은 값이 들어오면 1번 페이지로 이동시켜준다.
                    console.error(e);
                    window.location.href = '/board/showList/1'
                });

            if (resp.status === 200) {
                console.log(resp);
                setData(resp.data);
            }
        }
        selectList();
    }, [pageNo]);
    return (
        <Container className={"mt-3"}>
            <Table hover striped bordered className={"table-light"}>
                <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>글쓴이</th>
                </tr>
                </thead>
                <tbody>
                {data.boardList.map(board => (
                    <TableRow board={board} key={board.id} moveToSingle={moveToSingle}/>
                ))}
                <tr>
                    <td colSpan={3} className={"text-center"}>
                        <MyPagination
                            startPage={data.startPage}
                            curPage={data.curPage}
                            endPage={data.endPage}
                            maxPage={data.maxPage}
                            moveToPage={moveToPage}
                        />
                    </td>
                </tr>
                </tbody>
            </Table>
        </Container>
    )
}

let TableRow = ({board, moveToSingle}) => {
    return (
        <tr onClick={() => moveToSingle(board.id)}>
            <td>{board.id}</td>
            <td>{board.title}</td>
            <td>{board.nickname}</td>
        </tr>
    )
}

let MyPagination = ({startPage, endPage, curPage, maxPage, moveToPage}) => {
    let items = [];

    items.push(<Pagination.First onClick={() => moveToPage(1)}/>);
    for (let i = startPage; i <= endPage; i++) {
        items.push(
            <Pagination.Item key={i} active={i === curPage} onClick={() => moveToPage(i)}>
                {i}
            </Pagination.Item>
        );
    }

    items.push(<Pagination.Last onClick={() => moveToPage(maxPage)}/>)

    return (
        <Pagination className={"justify-content-center"}>
            {items}
        </Pagination>
    )
}

export default ShowList;