import { Button, Container, FormControl, Table } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let Auth = () => {
    let [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    let onChange = (e) => {
        let { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    let navigate = useNavigate();

    let onSubmit = async (e) => {
        e.preventDefault();
        console.log("서버로 보내는 이메일:", inputs.email);  // 서버에 보내는 이메일
        console.log("서버로 보내는 비번:", inputs.password);  // 비밀번호 출력

        try {
            console.log("요청을 보내는 중입니다.");
            let response = await axios({
                url: 'http://localhost:8080/guest/auth',
                method: 'POST',
                data: {
                    email: inputs.email,
                    password: inputs.password
                },
                withCredentials: true
            }, []);

            if (response.status === 200 && response.data.result === 'success') {
                let userInfo = {
                    id: response.data.id,
                    email: response.data.email,
                    password: response.data.password,
                    role: response.data.role,
                    nickname: response.data.nickname,
                    name: response.data.name,
                    phone: response.data.phone,
                    address: response.data.address,
                    userGender: response.data.userGender,
                    userTotalAmount: response.data.userTotalAmount

                };
                console.log("userInfo를 사용하여 사용자 페이지로 이동:", userInfo);
                navigate('guest/mypage/' + userInfo.id, { state: { userInfo } });
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Login failed: 잘못된 이메일 또는 비밀번호');
            } else {
                console.error('Login failed:', error);
            }
        }
    };

    return (
        <Container>
            <form onSubmit={onSubmit}>
                <Table striped hover bordered>
                    <thead>
                    <tr>
                        <th colSpan={2}>로그인</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>이메일</th>
                        <td>
                            <FormControl
                                type="text"
                                name="email"
                                value={inputs.email}
                                onChange={onChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>비밀번호</th>
                        <td>
                            <FormControl
                                type="password"
                                name="password"
                                value={inputs.password}
                                onChange={onChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <Button type="submit">로그인</Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </form>
        </Container>
    );
};

export default Auth;
