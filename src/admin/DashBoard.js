import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './DashBoard.css';

function Dashboard() {
    const [visitorCount, setVisitorCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [hotelCount, setHotelCount] = useState(0);
    const userId = 1; // 여기서 실제 로그인한 사용자의 ID를 사용해야 합니다.

    useEffect(() => {
        // 사용자가 페이지에 처음 접근할 때마다 방문 횟수를 1 증가시키는 함수
        const incrementVisitorCount = async () => {
            try {
                const response = await axios.get('http://localhost:8080/admin/incrementVisitor', {
                    params: { user_id: userId } // 방문자 ID를 기반으로 방문 횟수 증가
                });
                setVisitorCount(response.data.visitorCount); // 증가된 방문 횟수를 설정
            } catch (error) {
                console.error('Failed to increment visit count', error);
            }
        };

        incrementVisitorCount(); // 페이지 로드 시 한 번 실행
    }, []); // 의존성 배열을 비워둠으로써 첫 렌더링 때 한 번만 실행

    useEffect(() => {
        // Fetch user count with role 'ROLE_USER' or 'USER'
        const fetchUserCount = async () => {
            try {
                const response = await axios.get('http://localhost:8080/user/userCount', {
                    params: { roles: 'ROLE_USER,USER' }
                });
                setUserCount(response.data.userCount);
            } catch (error) {
                console.error('Failed to fetch user count', error);
            }
        };
        fetchUserCount();

        // Fetch unique hotel count from '/hotel'
        const fetchHotelCount = async () => {
            try {
                const response = await axios.get('http://localhost:8080/hotel/count', { params: { unique: true } });
                setHotelCount(response.data.hotelCount);
            } catch (error) {
                console.error('Failed to fetch hotel count', error);
            }
        };

        fetchHotelCount();
    }, []);


    return (
        <div className="dashboard-container">
            <nav className="dashboard-nav">
                <ul>
                    <li><Link to="/admin/">대시보드</Link></li>
                    <li><Link to="/admin/userList">사용자 목록</Link></li>
                    <li><Link to="/admin/hotelList">호텔 목록</Link></li>
                </ul>
            </nav>

            <h1 className="dashboard-title">관리자 페이지</h1>

            <div className="dashboard-cards">
                <div className="dashboard-card">
                    <div className="card-title">방문 횟수</div>
                    <div className="card-value">{visitorCount}</div>
                </div>
                <div className="dashboard-card">
                    <div className="card-title">회원 수</div>
                    <div className="card-value">{userCount}</div>
                </div>
                <div className="dashboard-card">
                    <div className="card-title">호텔 수</div>
                    <div className="card-value">{hotelCount}</div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
