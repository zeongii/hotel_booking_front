import React from 'react';
import {Button, Container, Table} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import style from './User.module.css'
import HotelDetails from "../admin/HotelDetails";

const BusinessPage = () => {

    const navigate = useNavigate()

    const location = useLocation()
    const {userInfo} = location.state || {};

    if (!userInfo) {
        return <p>사용자 정보를 불러올 수 없습니다.</p>;
    }

    let HotelDetails = () => {
        navigate('/admin/hotelDetails', {state: {userInfo: userInfo}})
    }

    let UserDetails = () => {
        navigate('/admin/userDetails ', {state: {userInfo: userInfo}})
    }


    return (
        <Container className={style.register}>
            <Table>
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
                    <th>업체이름</th>
                    <td>{userInfo.nickname}</td>
                </tr>
                <tr>
                    <th>등급</th>
                    <td>{userInfo.role}</td>
                </tr>
                <tr>
                    <td colSpan="2">
                        <Button style={button} onClick={HotelDetails}>호텔관리</Button> &emsp;
                        <Button style={button} onClick={UserDetails}>유저 관리</Button>

                    </td>
                </tr>
                </tbody>
            </Table>
        </Container>
    )

}

const button = {
    backgroundColor: '#9ec2fc',
    borderColor: '#9ec2fc',
};
export default BusinessPage