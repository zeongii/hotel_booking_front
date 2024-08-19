import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useLocation, useNavigate, useParams} from 'react-router-dom';

const UserDetails = () => {
    const { id } = useParams(); // URL에서 id를 가져옴
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    let location = useLocation()
    let userInfo = location.state.userInfo

    useEffect(() => {
        if (id) {
            const fetchUserDetails = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/admin/${id}`);
                    setUser(response.data);
                    console.log(response)
                } catch (error) {
                    console.error('Failed to fetch user details:', error);
                    setError('Failed to load user details');
                } finally {
                    setLoading(false);
                }
            };
            fetchUserDetails();
        } else {
            setLoading(false);
            setError('User ID is missing');
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSaveClick = async () => {
        try {
            await axios.post(`http://localhost:8080/admin/update`, user);
            alert('수정에 성공하였습니다.');
            navigate('/admin/userlist'); // 저장 후 UserList로 리디렉션
        } catch (error) {
            console.error('에러:', error);
            alert('수정에 실패했습니다.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>User Details</h1>
            <form>
                <div>
                    <label>회원 번호:</label>
                    <input
                        type="text"
                        name="id"
                        value={user.id}
                        readOnly // 회원 번호는 수정 불가
                    />
                </div>
                <div>
                    <label>이메일:</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        readOnly // 이메일 수정 불가
                    />
                </div>
                <div>
                    <label>닉네임:</label>
                    <input
                        type="text"
                        name="nickname"
                        value={user.nickname}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>권한:</label>
                    <input
                        type="text"
                        name="role"
                        value={user.role}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>주소:</label>
                    <input
                        type="text"
                        name="address"
                        value={user.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>성별:</label>
                    <input
                        type="text"
                        name="userGender"
                        value={user.userGender}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>휴대폰번호:</label>
                    <input
                        type="text"
                        name="phone"
                        value={user.phone}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>고객등급:</label>
                    <input
                        type="number"
                        name="userGrade"
                        value={user.userGrade}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>현재 상태:</label>
                    <select
                        name="enabled"
                        value={user.enabled}
                        onChange={handleInputChange}
                    >
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                    </select>
                </div>
                <button type="button" onClick={handleSaveClick}>Save</button>
            </form>
        </div>
    );
};

export default UserDetails;
