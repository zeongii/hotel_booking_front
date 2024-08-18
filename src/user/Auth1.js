import {Button, Container, FormControl, Table, Alert} from "react-bootstrap";
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
        let formData = new FormData();
        formData.append('email', inputs.email);
        formData.append('password', inputs.password);
        console.log("서버로 보내는 이메일:", inputs.email);  // 서버에 보내는 이메일
        console.log("서버로 보내는 비번:", inputs.password);  // 비밀번호 출력

        try {
            console.log("요청을 보내는 중입니다.");
            let response = await axios({
                url: 'http://localhost:8080/user/auth',
                method: 'POST',
                data: formData,
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
    const handleGuestRegister = () => {
        navigate('/guest/register'); // 비밀번호 찾기 페이지로 이동
    };


    return (
        <Container>
            <form onSubmit={onSubmit}>
                <Table striped hover bordered className="text-center">
                    <thead>
                    <tr>
                        <th colSpan={2} className="text-center" style={{fontSize: '24px', padding: '20px 0'}}>로그인</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th style={{width: '30%', verticalAlign: 'middle'}}>이메일</th>
                        <td style={{padding: '15px'}}>
                            <FormControl
                                type="text"
                                name="email"
                                value={inputs.email}
                                onChange={onChange}
                                required
                                style={{padding: '10px', fontSize: '16px'}}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th style={{verticalAlign: 'middle'}}>비밀번호</th>
                        <td style={{padding: '15px'}}>
                            <FormControl
                                type="password"
                                name="password"
                                value={inputs.password}
                                onChange={onChange}
                                required
                                style={{padding: '10px', fontSize: '16px'}}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{padding: '20px 0'}}>
                            <div style={{textAlign: 'center', marginBottom: '10px'}}>
                                <Button type="submit" style={{fontSize: '16px', padding: '10px 20px'}}>로그인</Button>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
                                <Button variant="outline-secondary" onClick={handleGuestRegister}
                                        style={{fontSize: '14px'}}>회원가입</Button>
                                <Button variant="outline-secondary" onClick={handleEmailSearch}
                                        style={{fontSize: '14px'}}>이메일 찾기</Button>
                                <Button variant="outline-secondary" onClick={handlePasswordSearch}
                                        style={{fontSize: '14px'}}>비밀번호 찾기</Button>
                            </div>
                        </td>
                    </tr>
                    {errorMessage && (
                        <tr>
                            <td colSpan={2} className="text-center" style={{paddingTop: '10px'}}>
                                <Alert variant="danger" style={{margin: '0', padding: '10px', fontSize: '14px'}}>
                                    {errorMessage}
                                </Alert>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </form>
        </Container>
    );
};

export default Auth;