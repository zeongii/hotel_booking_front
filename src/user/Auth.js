import {Button, Container, FormControl, Table} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import style from './User.module.css'


let Auth = () => {
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

    let navigate = useNavigate()

    let onRegister = () => {
        navigate('/user/register')
    }

    let onSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('email', inputs.email);
        formData.append('password', inputs.password);
        console.log(inputs)

        let response = await axios({
            url: 'http://localhost:8080/user/auth',
            method: 'POST',
            data: formData,
            withCredentials: true
        });

        if (response.status === 200 && response.data.result === 'success') {
            let userInfo = {
                id: response.data.id,
                nickname: response.data.nickname,
                role: response.data.role
            }
            navigate('/', {state: {userInfo: userInfo}});
        }
    }

    return (
        <div className={style.register}>
            <Container>
                <form onSubmit={onSubmit}>
                    <Table hover>
                        <thead>
                        <tr>
                            <td colSpan={2}>로그인</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>아이디<FormControl
                                type={'email'}
                                name={'email'}
                                value={inputs.email}
                                onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>비밀번호<FormControl
                                type={'password'}
                                name={'password'}
                                value={inputs.password}
                                onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Button type={'submit'} style={button}>로그인</Button>
                                &emsp;  &emsp;  &emsp;  &emsp;
                                <Button onClick={onRegister} style={button}>회원가입</Button>
                            </td>
                        </tr>
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




















