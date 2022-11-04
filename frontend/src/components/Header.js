import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Link } from 'react-router-dom';
import Button from './Button';
import logo from '../images/Logo.svg';
const btnInnerHtml = { tag: 'img', cssClasses: 'header__logo', imageSrc: logo, altString: 'Лого' };

const Header = React.memo(({ isLogin, loggedIn, onSignOut, onSwitchMode }) => {
    const currentUser = React.useContext(CurrentUserContext); 
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <header className="header">
            <Button cssClasses='btn header__logo-btn' btnType='button' btnInnerHtml={btnInnerHtml} isDisabled={false} handleClick={scrollTop} />
            <ul className='header__navbar'>
                {loggedIn && <li><Link to="/" className="btn header__link">{currentUser ?  currentUser.email : ''}</Link></li>}
                {loggedIn && <li><Link to="/sign-in" className="btn header__link header__link_shaded" onClick={onSignOut} >Выйти</Link></li>}
                {isLogin && !loggedIn && <li><Link to="/sign-up" onClick={() => onSwitchMode(false)} className="btn header__link" >Регистрация</Link></li>}
                {!isLogin && !loggedIn && <li><Link to="/sign-in" onClick={() => onSwitchMode(true)} className="btn header__link" >Войти</Link></li>}
            </ul>
        </header>);
});

export default Header;