import {Button, Container, FormControl, Table , Alert } from "react-bootstrap";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

let Auth = ({setUser}) => {
    let [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    let [errorMessage, setErrorMessage] = useState('');
    let navigate = useNavigate();

    let onChange = (e) => {
        let {name, value} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    let onSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // 이전 에러 메시지 초기화

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
                setUser(userInfo);
                navigate('/', {state: {userInfo: userInfo}}); // 메인페이지로 이동

            } else {
                setErrorMessage('로그인에 실패했습니다.');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMessage('잘못된 이메일 또는 비밀번호입니다.');
            } else {
                setErrorMessage('로그인 중 오류가 발생했습니다.');
            }
        }
    };

    const handleEmailSearch = () => {
        navigate('/guest/forgotEmail'); // 이메일 찾기 페이지로 이동
    };

    const handlePasswordSearch = () => {
        navigate('/guest/forgotPassword'); // 비밀번호 찾기 페이지로 이동
    };


    return (
        <Container>
            <form onSubmit={onSubmit}>
                <Table striped hover bordered>
                    <thead>
                    <tr>
                        <th colSpan={2} className="text-center">로그인</th>
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
                        <td colSpan={2}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Button type="submit">로그인</Button>
                                <div>
                                    <Button style={{marginRight: '5px'}} onClick={handleEmailSearch}>이메일 찾기</Button>
                                    <Button onClick={handlePasswordSearch}>비밀번호 찾기</Button>
                                </div>
                            </div>
                        </td>

                    </tr>
                    <tr>
                        <td colSpan={2} className="text-center" style={{paddingTop: '10px'}}>
                            {errorMessage && (
                                <Alert variant="danger" style={{margin: '0', padding: '10px', fontSize: '14px'}}>
                                    {errorMessage}
                                </Alert>
                            )}
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </form>
        </Container>
    );
};

export default Auth;
