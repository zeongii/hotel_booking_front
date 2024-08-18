import React, {useState} from "react";
import styles from './layout.module.css';
import logo from '../assets/images/logo.png';
import login from '../assets/icons/login.png'
import mypage from '../assets/icons/mypage.png'
import logout from '../assets/icons/logout.png'
import {Link, useNavigate} from "react-router-dom";

const Header = ({userInfo ,setUserInfo}) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        setUserInfo(null); // userInfo 상태 초기화 (로그아웃 처리)
        navigate('/'); // 로그아웃 후 메인 페이지로 이동
    };


    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link to="/">
                        <img src={logo} alt="로고임"/>
                    </Link>
                </div>

                <nav className={styles.navigation}>
                    <ul className={styles.navList}>
                        {!userInfo ? (
                            <li className={styles.navItem} onClick={toggleDropdown}>
                                <img src={login} alt="로그인" style={{width: '30px', cursor: 'pointer'}}/>

                                {dropdownOpen && (
                                    <ul className={styles.dropdownMenu}>
                                        <li className={styles.dropdownItem}>
                                            <Link to="/guest/auth">사용자로 로그인</Link>
                                        </li>
                                        <li className={styles.dropdownItem}>
                                            <Link to="/business/auth">사업자로 로그인</Link>
                                        </li>
                                    </ul>
                                )}

                            </li>
                        ) : (
                            <>
                                <li className={styles.navItem}>
                                    <Link to={`/guest/mypage/${userInfo.id}`} state={{userInfo}}>
                                        <img src={mypage} alt="마이페이지" style={{width: '30px'}}/>
                                    </Link>
                                </li>

                                <li className={styles.navItem} onClick={handleLogout}>
                                    <img src={logout} alt="로그아웃" style={{width: '30px', cursor: 'pointer'}}/>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>


        </header>
    );
};

export default Header