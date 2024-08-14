import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';
import {useLocation, useParams} from 'react-router-dom';

const MyReservations = () => {
    const location = useLocation();
    const { userInfo } = location.state || {};
    const [reservations, setReservations] = useState([]);
    const id = userInfo?.id;


    console.log(id)

    useEffect(() => {
        const fetchReservations = async () => {
            console.log(userInfo.id);
            try {
                if (userInfo && userInfo.id) {
                    const response = await axios.get('http://localhost:8080/guest/reservations/' + id);
                    setReservations(response.data);
                } else {
                    console.error('사용자 ID가 정의되지 않았습니다.');
                }
            } catch (error) {
                console.error('예약 정보를 가져오는 데 오류가 발생했습니다:', error);
            }
        };

        fetchReservations();
    }, [userInfo.id]);

    return (
        <Container>
            <h2>내 예약 목록</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>예약 ID</th>
                    <th>예약 날짜</th>
                    <th>상태</th>
                </tr>
                </thead>
                <tbody>
                {reservations.length > 0 ? (
                    reservations.map((reservation) => (
                        <tr key={reservation.id}>
                            <td>{reservation.id}</td>
                            <td>{reservation.date}</td>
                            <td>{reservation.status}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3">예약 내역이 없습니다.</td>
                    </tr>
                )}
                </tbody>
            </Table>
        </Container>
    );
};

export default MyReservations;
