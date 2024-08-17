import {Button, Container, FormControl, Table} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";
import style from './User.module.css'


let ForgotPassword = () => {
    let [inputs, setInputs] = useState({
        email: '',
        name: '',
        phone: ''
    });

    let onChange = (e) => {
        let {name, value} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    let onSubmit = async (e) => {
        e.preventDefault();

        try {
            let response = await axios({
                url: 'http://localhost:8080/guest/forgot-password',
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
        <div className={style.register}>
            <Container>
                <form onSubmit={onSubmit}>
                    <Table >
                        <thead>
                        <tr>
                            <th colSpan={2}>비밀번호 찾기</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>이메일
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
                            <td>이름
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
                            <td>전화번호
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
                                <Button type="submit" style={button}>비밀번호 찾기</Button>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </form>
            </Container>
        </div>
    );
};


const button = {
    backgroundColor: '#9ec2fc',
    borderColor: '#9ec2fc',
};

export default ForgotPassword;