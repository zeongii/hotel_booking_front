import {useLocation, useNavigate} from "react-router-dom";
import {Button, Container, Table} from "react-bootstrap";
import data from "bootstrap/js/src/dom/data";

let HotelOne = () => {

    let id = parseInt(1)

    let location = useLocation()
    let nevigate = useNavigate()

    let roomInsert =(hotelId) => {
        nevigate(`/room/register/`+1)
    }

    return (
        <Container className={"mt-3"}>
            <h1>호텔id가 1인 호텔의 상세 페이지 입니다.</h1>

            <Button onClick={roomInsert}>방 등록하기</Button>
            {/*<Table hover striped bordered className={"table-danger"}>
                <thead>
                <tr>
                    <td>방 번호</td>
                    <td></td>
                    <td>작성자</td>
                </tr>
                </thead>
                <tbody>
                {data.boardList.map(b => (
                    <TableRow board={b} key={b.id} moveToSingle={moveToSingle}/>
                ))}
                <tr>
                    <td colSpan={3} className={"text-center"}>
                        <MyPagination
                            startPage={data.startPage}
                            endPage={data.endPage}
                            currentPage={data.currentPage}
                            maxPage={data.maxPage}
                            moveToPage={moveToPage}
                        />
                    </td>
                </tr>
                </tbody>
            </Table>*/}

        </Container>


    )
}

export default HotelOne;