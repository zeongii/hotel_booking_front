import {Button, Container, FormControl, Table} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";
import style from './User.module.css'


let ForgotEmail = () => {
    let [inputs, setInputs] = useState({
        name: '',
        phone: ''
    });
    let [error, setError] = useState(null);

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
                url: 'http://localhost:8080/guest/forgot-username',
                method: 'POST',
                data: {
                    name: inputs.name,
                    phone: inputs.phone
                }
            });

            if (response.status === 200 && response.data.result === 'success') {
                alert(`당신의 이메일은: ${response.data.email}`);
            }
            setError(null); // 에러 상태 초기화

        } catch (error) {
            alert('해당하는 정보가 없습니다');
            if (error.response) {
                // 서버가 응답했으나 상태 코드가 2xx 범위를 벗어남
                console.error('Error response:', error.response.data);
                setError(`서버가 응답했으나 상태 코드가 2xx 범위를 벗어남: ${error.response.status} - ${error.response.data}`);
                console.log(error.response.data)
            } else if (error.request) {
                // 요청이 만들어졌으나 응답을 받지 못함
                console.error('Error request:', error.request);
                setError('Error: 요청이 만들어졌으나 응답을 받지 못함');
            } else {
                // 요청을 설정하는 중에 오류가 발생함
                console.error('Error message:', error.message);
                setError(`요청을 설정하는 중에 오류가 발생함: ${error.message}`);
            }
        }
    };

    return (
        <Container>
            <form onSubmit={onSubmit}>
                <Table striped hover bordered>
                    <thead>
                    <tr>
                        <th colSpan={2} className={"text-center"}>가입한 이메일 찾기</th>
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
                        <td colSpan={2} className={"text-center"}>
                            <Button type="submit">아이디 찾기</Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </form>
        </Container>
    );
};

const button = {
    backgroundColor: '#9ec2fc',
    borderColor: '#9ec2fc',
};


export default ForgotEmail;
