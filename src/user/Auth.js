import {Alert, Button, Container, FormControl, Table} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import style from './User.module.css'


let Auth = ({setUser}) => {
    let [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    let onChange = (e) => {
        let {name, value} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    };

    let [errorMessage, setErrorMessage] = useState('');
    let navigate = useNavigate()

    let onRegister = () => {
        navigate('/user/register')
    }


    let onSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        let formData = new FormData();
        formData.append('email', inputs.email);
        formData.append('password', inputs.password);
        console.log(inputs)

        try {


            let response = await axios({
                url: 'http://localhost:8080/user/auth',
                method: 'POST',
                data: formData,
                withCredentials: true
            });

            console.log(response)

            if (response.status === 200 && response.data.result === 'success') {
                let userInfo = {
                    id: response.data.id,
                    nickname: response.data.nickname,
                    role: response.data.role,
                    phone: response.data.phone,
                    address: response.data.address,
                    email: response.data.email

                }
                if (response.data.role === 'GUEST') {
                    setErrorMessage('GUEST 사용자로는 BUSINESS 로그인 페이지에 접근할 수 없습니다.');
                    return;
                }

                setUser(userInfo)

                navigate('/hotel/showList', {state: {userInfo: userInfo}})
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMessage('잘못된 이메일 또는 비밀번호입니다.');
            } else {
                setErrorMessage('로그인 중 오류가 발생했습니다.');
            }
        }

    }

    return (
        <div >
            <Container>
                <form onSubmit={onSubmit} className={style.register}>
                    <Table  hover className="text-center">
                        <thead>
                        <tr>
                            <td colSpan={2} style={{fontSize: '24px', padding: '20px 0'}}>로그인</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td >아이디<FormControl
                                type={'email'}
                                name={'email'}
                                value={inputs.email}
                                onChange={onChange}
                                style={{padding: '10px', fontSize: '16px'}}/>
                            </td>
                        </tr>
                        <tr>
                            <td>비밀번호<FormControl
                                type={'password'}
                                name={'password'}
                                value={inputs.password}
                                onChange={onChange}
                                style={{padding: '10px', fontSize: '16px'}}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Button type={'submit'} style={button}>로그인</Button>
                                &emsp;  &emsp;  &emsp;  &emsp;
                                <Button onClick={onRegister} style={button}>회원가입</Button>
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
        </div>
    )
}

const button = {
    backgroundColor: '#9ec2fc',
    borderColor: '#9ec2fc',
};

export default Auth;




















