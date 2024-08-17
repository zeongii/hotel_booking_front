import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Wishlist = () => {
    const location = useLocation();
    const { userInfo } = location.state || {};
    const [wishlist, setWishlist] = useState([]);
    const id = userInfo?.id;

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                if (userInfo && userInfo.id) {
                    const response = await axios.get('http://localhost:8080/guest/wishlist/'+id);
                    setWishlist(response.data);
                } else {
                    console.error('사용자 ID가 정의되지 않았습니다.');
                }
            } catch (error) {
                console.error('위시리스트를 가져오는 데 오류가 발생했습니다:', error);
            }
        };

        fetchWishlist();
    }, [userInfo.id]);

    return (
        <Container>
            <h2>내 찜 목록</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>호텔 ID</th>
                    <th>호텔 이름</th>
                    <th>위치</th>
                </tr>
                </thead>
                <tbody>
                {wishlist.length > 0 ? (
                    wishlist.map((item) => (
                        <tr key={item.hotelId}>
                            <td>{item.hotelId}</td>
                            <td>{item.hotelName}</td>
                            <td>{item.location}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3">찜한 호텔이 없습니다.</td>
                    </tr>
                )}
                </tbody>
            </Table>
        </Container>
    );
};

export default Wishlist;
