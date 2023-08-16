import './Register.scss';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema } from '../../utils/ValidationSchemes';
import { signup } from '../../utils/MainApi';

import logo from '../../images/logo.svg';
import eyeButton from '../../images/Icon-hidden-pass.svg';

function Register() {
	const {
		register,
		// handleSubmit,
		// setValue,
		// getValues,
		watch,
		formState: { errors, isValid, isDirty },
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(RegisterSchema),
	});

	const [errorMessage, setErrorMessage] = useState(null);
	const [isError, setIsError] = useState(false);
	const [isPasswordHidden, setPasswordHidden] = useState(false);
	const [isConfirmPasswordHidden, setConfirmPasswordHidden] = useState(false);

	function onRegister(data) {
		signup(data)
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

	function onSubmit(evt) {
		evt.preventDefault();
		onRegister();
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
							{errorMessage || errors.message}
						</span>
					) : (
						<h2 className="register__subtitle">
							Создайте учётную запись в приложении
						</h2>
					)}
					<form className="register__form" onSubmit={onSubmit} noValidate>
						<input
							className="register__input"
							placeholder="E-mail"
							{...register('email', { required: true })}
						/>
						<input
							className="register__input"
							placeholder="Фамилия*"
							{...register('lastName', { required: true })}
						/>
						<input
							className="register__input"
							placeholder="Имя*"
							{...register('firstName', { required: true })}
						/>
						<input
							className="register__input"
							placeholder="Отчество"
							{...register('middleName')}
						/>
						<input
							className="register__input"
							placeholder="Пароль"
							{...register('password', { required: true })}
							type={isPasswordHidden ? 'password' : 'text'}
						/>
						{watch('password') ? (
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
							name="confirmPassword"
							placeholder="Повторите пароль"
							{...register('confirmPassword', { required: true })}
						/>

						{watch('confirmPassword') ? (
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
							disabled={!isValid || !isDirty}
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
