import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

const MypageEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { userInfo } = location.state || {};

    const [formData, setFormData] = useState({
        id: userInfo?.id || '',
        email: userInfo?.email || '',
        nickname: userInfo?.nickname || '',
        name: userInfo?.name || '',
        phone: userInfo?.phone || '',
        address: userInfo?.address || '',
        role: userInfo?.role || '',
        userTotalAmount: userInfo?.userTotalAmount || '',
        userGender: userInfo?.userGender || '',
        password: userInfo?.password || ''
    });

    const [password, setPassword] = useState(''); // 비밀번호 상태 추가

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitted password:", password);

        if (!password) {
            alert("비밀번호를 입력해주세요.");
            return;
        }

        try {
            console.log("비밀번호야 너 살아있어?"); // 비밀번호 확인 요청 전 로그 추가
            const passwordCheckResponse = await axios.post(`http://localhost:8080/guest/check-password`, {
                userId: formData.id,
                password: password,
            });

            console.log("Password check response:", passwordCheckResponse.data);

            if (passwordCheckResponse.status === 200 && passwordCheckResponse.data.valid) {
                console.log("비밀번호야 너 유효해...?"); // 비밀번호가 유효할 경우
                const response = await axios.post(`http://localhost:8080/guest/update`, formData);
                console.log("업데이트 된 정보", response.data);

                if (response.status === 200) {
                    alert("사용자 정보가 성공적으로 수정되었습니다.");
                    const updatedUserInfo = response.data;
                    navigate(`/guest/mypage/${updatedUserInfo.id}`, { state: { userInfo: updatedUserInfo } });
                }

            } else {
                alert("비밀번호가 일치하지 않습니다.");
            }
        } catch (error) {
            console.error('사용자 정보를 수정하는 데 실패했습니다:', error);
            alert("사용자 정보를 수정하는 데 실패했습니다. 다시 시도해 주세요.");
        }
    };


    return (
        <Container>
            <h2>마이페이지 수정</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        readOnly
                    />
                </Form.Group>

                <Form.Group controlId="formName">
                    <Form.Label>이름</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        readOnly
                    />
                </Form.Group>

                <Form.Group controlId="formNickname">
                    <Form.Label>닉네임</Form.Label>
                    <Form.Control
                        type="text"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formPhone">
                    <Form.Label>전화번호</Form.Label>
                    <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formAddress">
                    <Form.Label>주소</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>비밀번호 확인</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    정보 수정
                </Button>
            </Form>
        </Container>
    );
};

export default MypageEdit;
