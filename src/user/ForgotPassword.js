import { Button, Container, FormControl, Table } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

let ForgotPassword = () => {
    let [inputs, setInputs] = useState({
        email: '',
        name: '',
        phone: ''
    });

    let onChange = (e) => {
        let { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    let onSubmit = async (e) => {
        e.preventDefault();

        try {
            let response = await axios({
                url: 'http://localhost:8080/user/forgot-password',
                method: 'POST',
                data: {
                    email: inputs.email,
                    name: inputs.name,
                    phone: inputs.phone
                }
            });

            if (response.status === 200 && response.data.result === 'success') {
                alert(`비밀번호 찾기 성공: ${response.data.password}`);

            }
        } catch (error) {
            alert('해당 정보를 찾을 수 없습니다.');
            console.error('Password retrieval failed:', error);
        }
    };

    return (
        <Container>
            <form onSubmit={onSubmit}>
                <Table striped hover bordered>
                    <thead>
                    <tr>
                        <th colSpan={2}>비밀번호 찾기</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>이메일</th>
                        <td>
                            <FormControl
                                type="email"
                                name="email"
                                value={inputs.email}
                                onChange={onChange}
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>이름</th>
                        <td>
                            <FormControl
                                type="text"
                                name="name"
                                value={inputs.name}
                                onChange={onChange}
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>전화번호</th>
                        <td>
                            <FormControl
                                type="text"
                                name="phone"
                                value={inputs.phone}
                                onChange={onChange}
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <Button type="submit">비밀번호 찾기</Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </form>
        </Container>
    );
};

export default ForgotPassword;
