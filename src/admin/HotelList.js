import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './HotelList.css';

const HotelList = () => {
    const [hotels, setHotels] = useState([]); // hotels와 setHotels 상태를 정의함
    const [loading, setLoading] = useState(true); // 로딩 상태 초기화
    const [error, setError] = useState(null); // 에러 상태 초기화
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 초기화
    const hotelsPerPage = 10;

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get("http://localhost:8080/hotel/hotelAll");
                if (response.status === 200) {
                    console.log(response.data.hotelList); // API 응답 데이터 확인
                    setHotels(response.data.hotelList); // hotelList 배열을 hotels 상태에 저장
                } else {
                    throw new Error('Failed to fetch hotels');
                }
            } catch (error) {
                console.error('Failed to fetch hotels:', error);
                setError('Failed to fetch hotels');
                setHotels([]); // 오류 발생 시 hotels를 빈 배열로 초기화
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        fetchHotels();
    }, []);

    const indexOfLastHotel = currentPage * hotelsPerPage;
    const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
    const currentHotels = Array.isArray(hotels) ? hotels.slice(indexOfFirstHotel, indexOfLastHotel) : [];
    const totalPages = Math.ceil(hotels.length / hotelsPerPage);

    const moveToPage = (pageNo) => {
        if (pageNo > 0 && pageNo <= totalPages) {
            setCurrentPage(pageNo);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="hotel-list-container">
            <h1>Hotel List</h1>
            <Table hover striped bordered className="hotel-list-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Grade</th>
                    <th>Business Nickname</th>
                    <th>Business Role</th>
                    <th>Details</th>
                </tr>
                </thead>
                <tbody>
                {currentHotels.length > 0 ? (
                    currentHotels.map((hotel) => (
                        <tr key={hotel.id}>
                            <td>{hotel.hotelName}</td>
                            <td>{hotel.hotelAddress}</td>
                            <td>{hotel.hotelPhone}</td>
                            <td>{hotel.hotelEmail}</td>
                            <td>{hotel.hotelGrade}</td>
                            <td>{hotel.businessEntity?.nickname || 'N/A'}</td>
                            <td>{hotel.businessEntity?.role || 'N/A'}</td>
                            <td><Link to={`/admin/hotelDetail/${hotel.id}`}>View Details</Link></td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="8">No hotels available.</td>
                    </tr>
                )}
                </tbody>
            </Table>
            <Pagination className="justify-content-center">
                <Pagination.First onClick={() => moveToPage(1)} />
                <Pagination.Prev onClick={() => moveToPage(currentPage - 1)} />
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <Pagination.Item
                        key={page}
                        active={page === currentPage}
                        onClick={() => moveToPage(page)}
                    >
                        {page}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => moveToPage(currentPage + 1)} />
                <Pagination.Last onClick={() => moveToPage(totalPages)} />
            </Pagination>
        </div>
    );
};

export default HotelList;
