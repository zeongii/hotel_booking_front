import { Button, Container, FormControl, Table, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

let Register = () => {
    let [inputs, setInputs] = useState({
        name: '',
        email:'',
        phone: '',
        password: '',
        confirmPassword: '',
        gender: '',
        address: ''
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

        if (inputs.password !== inputs.confirmPassword) {
            alert("비밀번호가 일치 하지 않습니다");
            return;
        }

        try {
            let response = await axios({
                url: 'http://localhost:8080/user/register',
                method: 'POST',
                data: {
                    name: inputs.name,
                    email: inputs.email,
                    phone: inputs.phone,
                    password: inputs.password,
                    gender: inputs.gender,
                    address: inputs.address
                }
            });

            if (response.status === 200 && response.data.result === 'success') {
                alert('회원가입 완료');
            }
        } catch (error) {
            console.error('회원가입 실패이유:', error);
        }
    };

    return (
        <Container>
            <form onSubmit={onSubmit}>
                <Table striped hover bordered>
                    <thead>
                    <tr>
                        <th colSpan={2}>회원가입</th>
                    </tr>
                    </thead>
                    <tbody>
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
                        <th>email</th>
                        <td>
                            <FormControl
                                type="text"
                                name="email"
                                value={inputs.email}
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
                        <th>비밀번호</th>
                        <td>
                            <FormControl
                                type="password"
                                name="password"
                                value={inputs.password}
                                onChange={onChange}
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>비밀번호 확인</th>
                        <td>
                            <FormControl
                                type="password"
                                name="confirmPassword"
                                value={inputs.confirmPassword}
                                onChange={onChange}
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>성별</th>
                        <td>
                            <Form.Check
                                type="radio"
                                name="gender"
                                value="male"
                                label="남성"
                                onChange={onChange}
                                checked={inputs.gender === "male"}
                            />
                            <Form.Check
                                type="radio"
                                name="gender"
                                value="female"
                                label="여성"
                                onChange={onChange}
                                checked={inputs.gender === "female"}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td>
                            <FormControl
                                type="text"
                                name="address"
                                value={inputs.address}
                                onChange={onChange}
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <Button type="submit">회원가입</Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </form>
        </Container>
    );
};

export default Register;
