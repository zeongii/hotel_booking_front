import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Button, Container, FormControl, Table} from "react-bootstrap";

let Register = () => {
    let[inputs,setInputs] = useState({
        email: '',
        password:'',
        nickname: '',
        phone: '',
        address: '',
        role: 'BUSINESS',
        enabled: 1
    })
    let nevigate = useNavigate()
    let moveToNext=(id) => {
        nevigate('/')
    }
    let onChange = (e) => {
        let {name,value} = e.target
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    let onSubmit = async (e) => {
        e.preventDefault()
        try{
            let resp =await axios.post('http://localhost:8080/user/register',inputs)
            console.log(resp.data.resultId)
            if(resp.data.resultId!==undefined) {
                moveToNext()
            }
        } catch (error){
            console.log(error)
        }
    }
    return(
        <Container className={"mt-3"}>
            <form onSubmit={onSubmit}>
                <Table striped hover bordered>
                    <thead>
                    <tr>
                        <td colSpan={2} className={"text-center"}>회원 가입하기</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>아이디</td>
                        <td><FormControl type={'email'} value={inputs.email} name={'email'} className={"form-control"}
                                         onChange={onChange}/></td>
                    </tr>
                    <tr>
                        <td>비밀번호</td>
                        <td><FormControl type={'password'} value={inputs.password} name={'password'}
                                         className={"form-control"}
                                         onChange={onChange}/></td>
                    </tr>
                    <tr>
                        <td>업체이름</td>
                        <td><FormControl type={'text'} value={inputs.nickname} name={'nickname'}
                                         className={"form-control"}
                                         onChange={onChange}/></td>
                    </tr>
                    <tr>
                        <td>전화번호</td>
                        <td><FormControl type={'text'} value={inputs.phone} name={'phone'} className={"form-control"}
                                         onChange={onChange}/></td>
                    </tr>
                    <tr>
                        <td>주소</td>
                        <td><FormControl type={'text'} value={inputs.address} name={'address'}
                                         className={"form-control"}
                                         onChange={onChange}/></td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <Button type={'submit'}>회원가입</Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </form>
        </Container>
    )
}

export default Register