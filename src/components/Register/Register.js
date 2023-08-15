import './Register.scss';
import React, { useState } from 'react';
import logo from '../../images/logo.svg';
import eyeButton from '../../images/Icon-hidden-pass.svg';
import { register } from '../../utils/MainApi';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function Register() {
	const { values, handleChange, errors, isValid } = useFormAndValidation();
	const [errorMessage, setErrorMessage] = useState(null);
	const [isError, setIsError] = useState(false);
	const [isPasswordHidden, setPasswordHidden] = useState(false);
	const [isConfirmPasswordHidden, setConfirmPasswordHidden] = useState(false);

	function onRegister(name, email, password) {
		register(name, email, password)
			.then(() => {
				console.log('Пользователь зарегистрирован');
				// здесь будет открываться попап(или не попап, или не будет) об успешной регистрации
			})
			.catch((err) => {
				if (err === 409) {
					setIsError(true);
					setErrorMessage('Пользователь с таким email уже существует');
				} else if (err === 500) {
					setIsError(true);
					setErrorMessage('На сервере произошла ошибка');
					// должна быть ошибка что такого пользователя нет в БД
				} else {
					setIsError(true);
					setErrorMessage(
						'Такого пользователя нет в системе. Проверьте правильность ввода данных'
					);
				}
			});
	}
	function handleSubmitRegister(evt) {
		evt.preventDefault();
		const { name, email, password } = values;
		if (isValid) {
			onRegister(name, email, password);
		}
	}
	function handlePasswordHidden() {
		if (isPasswordHidden) {
			setPasswordHidden(false);
		} else {
			setPasswordHidden(true);
		}
	}
	function handleConfirmPasswordHidden() {
		if (isConfirmPasswordHidden) {
			setConfirmPasswordHidden(false);
		} else {
			setConfirmPasswordHidden(true);
		}
	}

	return (
		<div className="register">
			<div className="register__container">
				<header className="register__header">
					<img className="register__logo-img" src={logo} alt="Логотип" />
					<h1 className="register__title">Motivation System</h1>
				</header>
				<main className="register__main">
					{isError ? (
						<span className="register__error">
							{errorMessage || errors.lastName || errors.email}
						</span>
					) : (
						<h2 className="register__subtitle">
							Создайте учётную запись в приложении
						</h2>
					)}
					<form
						className="register__form"
						onSubmit={handleSubmitRegister}
						noValidate
					>
						<input
							className="register__input"
							type="email"
							id="email"
							name="email"
							placeholder="E-mail"
							value={values.email || ''}
							onChange={handleChange}
							autoComplete="email"
							required
						/>
						<input
							className="register__input"
							type="text"
							id="lastName"
							name="lastName"
							placeholder="Фамилия*"
							value={values.lastName || ''}
							onChange={handleChange}
							required
						/>
						<input
							className="register__input"
							type="text"
							id="firstName"
							name="firstName"
							placeholder="Имя*"
							value={values.firstName || ''}
							onChange={handleChange}
							required
						/>
						<input
							className="register__input"
							type="text"
							id="middleName"
							name="middleName"
							placeholder="Отчество"
							value={values.middleName || ''}
							onChange={handleChange}
						/>
						<input
							className="register__input"
							type={isPasswordHidden ? 'password' : 'text'}
							id="password"
							name="password"
							placeholder="Пароль"
							minLength={6}
							maxLength={6}
							value={values.password || ''}
							onChange={handleChange}
							autoComplete="current-password"
							required
						/>
						{values.password ? (
							<button
								className="register__eye-button password"
								type="button"
								onClick={handlePasswordHidden}
							>
								<img src={eyeButton} alt="скрыть пароль" />
							</button>
						) : null}
						<input
							className="register__input"
							type={isConfirmPasswordHidden ? 'password' : 'text'}
							id="confirmPassword"
							name="confirmPassword"
							placeholder="Повторите пароль"
							minLength={4}
							maxLength={30}
							value={values.confirmPassword || ''}
							onChange={handleChange}
							autoComplete="current-password"
							required
						/>

						{values.confirmPassword ? (
							<button
								className="register__eye-button confirmPassword"
								type="button"
								onClick={handleConfirmPasswordHidden}
							>
								<img src={eyeButton} alt="скрыть пароль" />
							</button>
						) : null}

						<button
							className={
								isValid
									? 'register__submit-button'
									: 'register__submit-button_disabled'
							}
							type="submit"
							disabled={!isValid}
						>
							Зарегистрироваться
						</button>
					</form>
					{/* <div className="register__caption-link">У меня есть аккаунт.&#8194;Войти</div> */}
				</main>
			</div>
		</div>
	);
}
export default Register;
