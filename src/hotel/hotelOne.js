import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Button, Carousel, Container, Table} from "react-bootstrap";
import data from "bootstrap/js/src/dom/data";
import {useEffect, useState} from "react";
import axios from "axios";

let HotelOne = () => {
    
    let location = useLocation()
    let nevigate = useNavigate()

    let params=useParams()
    let id= parseInt(params.id) // hotelId
    
    
    const [roomIndex, setRoomIndex]=useState(0)
    const handleSelect = (selectedIndex) => {
        setRoomIndex(selectedIndex)
    }

    let [hotelData, setHotelData] = useState({})

    let [roomdata,setRoomdata]=useState({roomList:[]})
    let [roomType,setRoomType] = useState([])

    let roomInsert =(hotelId) => {
        nevigate(`/room/register/` + hotelId)
    }
    let moveToSingle = (roomId)=> {
        nevigate('/room/roomOne/'+roomId)
    }






    useEffect(()=> {
        let roomSelectList= async ()=> {
            try {
                let resp = await axios.get("http://localhost:8080/room/showList/"+id,{
                    withCredentials:true
                })
                if(resp.status === 200) {
                    setRoomdata(resp.data)
                    setRoomType(resp.data.roomTypeList)
                }
            } catch (e) {
                console.log(e)
            }
        }

        roomSelectList()
    },[id])
    let TableRow= ({room, moveToSingle})=> {
        return(
            <tr onClick={()=> moveToSingle(room.id)}>


                <td>
                    {/*{room.id}*/}
                    <Carousel activeIndex={roomIndex} onSelect={handleSelect} className="carousel-container">

                        {room.imageList.map((roomImages) => (
                            <Carousel.Item key={roomImages}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%' // 높이 조정 필요
                                }}>
                                    <img
                                        src={`http://localhost:8080/room/${roomImages}`}
                                        alt={roomImages}
                                        style={{width: '600px', height: 'auto', alignItems: "center"}}

                                    />
                                </div>
                            </Carousel.Item>
                        ))}

                    </Carousel>


                </td>
                {roomType.map(r=>(
                    room.roomTypeId === r.id ?
                        (<td key={r.id}> 방 타입: {r.typeName}</td>) :null
                ))}

                <td>{room.roomPrice}</td>
            </tr>
        )
    }

    return (
        <Container className={"mt-3"}>
            <h1>호텔id가 1인 호텔의 상세 페이지 입니다.</h1>








            <Button onClick={roomInsert}>방 등록하기</Button>

            <Table hover striped bordered className={"table-danger"}>
                <thead>
                <tr>
                    <td>방 사진</td>
                    <td>방 타입</td>
                    <td>가격</td>
                </tr>
                </thead>
                <tbody>
                {roomdata.roomList.map(r => (
                    <TableRow room={r} key={r.id} moveToSingle={moveToSingle}/>
                ))}

                </tbody>
            </Table>

        </Container>


    )
}


export default HotelOne;