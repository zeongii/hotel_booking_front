import React, { useState, useEffect } from 'react';
import {useLocation, useParams} from 'react-router-dom';
import axios from 'axios';

const HotelDetails = () => {
    let param = useParams()
    let id = param.id
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let location = useLocation()
    let userInfo = location.state.userInfo

    useEffect(() => {
        const fetchHotelDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/hotel/hotelOne/` + id);
                setHotel(response.data);
            } catch (error) {
                setError('Failed to fetch hotel details');
            } finally {
                setLoading(false);
            }
        };

        fetchHotelDetails();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!hotel) return <div>No hotel found</div>;

    return (
        <div>
            <h1>{hotel.hotelName}</h1>
            <p>Address: {hotel.hotelAddress}</p>
            <p>Phone: {hotel.hotelPhone}</p>
            <p>Email: {hotel.hotelEmail}</p>
            <p>Grade: {hotel.hotelGrade}</p>
            {/* 추가적으로 ManyToOne 관계의 외래키 정보를 표시 */}
            <p>City: {hotel.city ? hotel.city.cityName : 'No city assigned'}</p>
            {/* 여기에서 추가적인 상세 정보를 표시할 수 있습니다 */}
        </div>
    );
};

export default HotelDetails;
