import React from 'react';
import {Container, Table, Button} from 'react-bootstrap';
import {useLocation, useNavigate} from 'react-router-dom';
import style from './User.module.css'

const MyPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {userInfo} = location.state || {};

    if (!userInfo) {
        return <p>사용자 정보를 불러올 수 없습니다.</p>;
    }


    const handleViewReservations = () => {
        navigate('/guest/myReservations/' + userInfo.id, {state: {userInfo}});
    };

    const handleViewWishlist = () => {
        navigate('/guest/wishlist/' + userInfo.id, {state: {userInfo}});
    };

    const handleEditProfile = () => {
        navigate('/guest/mypage/edit', {state: {userInfo}});
    };

    return (
        <Container className={style.register}>
            <Table hover>
                <thead>
                <tr>
                    <td colSpan="2">
                        <h2>마이페이지</h2>
                    </td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>이메일</th>
                    <td>{userInfo.email}</td>
                </tr>
                <tr>
                    <th>전화번호</th>
                    <td>{userInfo.phone}</td>
                </tr>
                <tr>
                    <th>주소</th>
                    <td>{userInfo.address}</td>
                </tr>
                <tr>
                    <th>닉네임</th>
                    <td>{userInfo.nickname}</td>
                </tr>
                <tr>
                    <th>등급</th>
                    <td>{userInfo.role}</td>
                </tr>
                <tr>
                    <th>총 이용 금액</th>
                    <td>{userInfo.userTotalAmount} 원</td>
                </tr>
                <tr>
                    <td colSpan="2">
                        <Button style={button} onClick={handleEditProfile}>수정하기</Button> &emsp; &emsp;
                        <Button style={button} onClick={handleViewWishlist}>찜 목록 </Button>  &emsp;&emsp;
                        <Button style={button} onClick={handleViewReservations}>예약목록</Button>

                    </td>
                </tr>
                </tbody>
            </Table>

        </Container>
    )

};
const button = {
    backgroundColor: '#9ec2fc',
    borderColor: '#9ec2fc',
};

export default MyPage;
