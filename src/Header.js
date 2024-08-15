import React from "react";
import styles from './Header.module.css';
import logo from './logo.png'
import login from './logIn.png'

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <img src={logo} alt="로고임"/>
                </div>

                <nav className={styles.navigation}>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>메뉴 탭 1</li>
                        <li className={styles.navItem}><img src={login} alt="로그인" style={{width: '30px'}}/> </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header