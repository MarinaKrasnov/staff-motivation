import './Register.sass';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Register() {
	return (
		<div className="register">
			<header className="register__header">
				<img className="register__logo-img" src={logo} alt="Логотип" />
				<h1 className="register__title">Motivation System</h1>
			</header>
			<main className="register__main">
				<Link to="/#" className="register__caption-link">
					У меня есть аккаунт.&#8194;Войти
				</Link>
			</main>
		</div>
	);
}
export default Register;
