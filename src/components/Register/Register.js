import './Register.scss';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema } from '../../utils/ValidationSchemes';
import { signup } from '../../utils/MainApi';

import logo from '../../images/logo.svg';
import alarmLogo from '../../images/alarm-logo.svg';
import eyeButton from '../../images/Icon-hidden-pass.svg';

function Register() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		// setValue,
		// getValues,
		watch,
		formState: { errors, isValid, isDirty },
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(RegisterSchema),
	});

	const [isError, setIsError] = useState(false);
	const [isPasswordHidden, setPasswordHidden] = useState(false);
	const [isConfirmPasswordHidden, setConfirmPasswordHidden] = useState(false);
	const [isEmailInputActive, setEmailInputActive] = useState(false);
	const [isLastNameInputActive, setLastNameInputActive] = useState(false);
	const [isFirstNameInputActive, setFirstNameInputActive] = useState(false);
	const [isPasswordInputActive, setPasswordInputActive] = useState(false);
	const [isConfirmPasswordInputActive, setConfirmPasswordInputActive] =
		useState(false);
	function onRegister(data) {
		signup(data)
			.then(() => {
				navigate('/main');
				console.log('Пользователь зарегистрирован'); // проверяю успешна ли регистрация
			})
			.catch((err) => {
				if (err === 409) {
					setIsError(true);
				} else if (err === 500) {
					setIsError(true);
				} else {
					setIsError(true);
				}
			});
	}

	function onSubmit(data, evt) {
		evt.preventDefault();
		onRegister(data);
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

	function handleFirstNameInputFocus() {
		setFirstNameInputActive(true);
	}
	function handleFirstNameInputBlur() {
		setFirstNameInputActive(false);
	}
	function handleEmailInputFocus() {
		setEmailInputActive(true);
	}
	function handleEmailInputBlur() {
		setEmailInputActive(false);
	}
	function handleLastNameInputFocus() {
		setLastNameInputActive(true);
	}
	function handleLastNameInputBlur() {
		setLastNameInputActive(false);
	}
	function handlePasswordInputFocus() {
		setPasswordInputActive(true);
	}
	function handlePasswordInputBlur() {
		setPasswordInputActive(false);
	}
	function handleConfirmPasswordInputFocus() {
		setConfirmPasswordInputActive(true);
	}
	function handleConfirmPasswordInputBlur() {
		setConfirmPasswordInputActive(false);
	}
	return (
		<div className="register">
			<div className="register__container">
				<header className="register__header">
					<img className="register__logo-img" src={logo} alt="Логотип" />
					<h1 className="register__title">Motivation System</h1>
				</header>
				<main className="register__main">
					<h2 className="register__subtitle">
						Создайте учётную запись, чтобы получить доступ к приложению
					</h2>
					<form
						className="register__form"
						onSubmit={handleSubmit(onSubmit)}
						noValidate
					>
						{watch('email') || isEmailInputActive ? (
							<span className="register__input-span">E-mail</span>
						) : (
							<div className="register__input-space">{}</div>
						)}
						<input
							className={`register__input ${
								errors.email && !isValid && isDirty
									? 'register__input_no-valid'
									: ''
							}`}
							placeholder="E-mail"
							{...register('email', { required: true })}
							onFocus={handleEmailInputFocus}
							onBlur={handleEmailInputBlur}
						/>
						{errors.email ? (
							<div className="register__error-area">
								<img
									className="register__alarm-logo"
									src={alarmLogo}
									alt="уведомление"
								/>
								<p className="register__error-message">
									{errors.email.message}
								</p>
							</div>
						) : (
							<div className="register__input-space"> </div>
						)}

						{watch('lastName') || isLastNameInputActive ? (
							<span className="register__input-span">Фамилия</span>
						) : (
							<div className="register__input-space">{}</div>
						)}
						<input
							className={`register__input ${
								errors.lastName && !isValid && isDirty
									? 'register__input_no-valid'
									: ''
							}`}
							placeholder="Фамилия"
							{...register('lastName', { required: true })}
							onFocus={handleLastNameInputFocus}
							onBlur={handleLastNameInputBlur}
						/>
						{errors.lastName ? (
							<div className="register__error-area">
								<img
									className="register__alarm-logo"
									src={alarmLogo}
									alt="уведомление"
								/>
								<p className="register__error-message">
									{errors.lastName.message}
								</p>
							</div>
						) : (
							<div className="register__input-space"> </div>
						)}

						{watch('firstName') || isFirstNameInputActive ? (
							<span className="register__input-span">Имя</span>
						) : (
							<div className="register__input-space">{}</div>
						)}
						<input
							className={`register__input ${
								errors.firstName && !isValid && isDirty
									? 'register__input_no-valid'
									: ''
							}`}
							placeholder="Имя"
							{...register('firstName', { required: true })}
							onFocus={handleFirstNameInputFocus}
							onBlur={handleFirstNameInputBlur}
						/>

						{errors.firstName ? (
							<div className="register__error-area">
								<img
									className="register__alarm-logo"
									src={alarmLogo}
									alt="уведомление"
								/>
								<p className="register__error-message">
									{errors.firstName.message}
								</p>
							</div>
						) : (
							<div className="register__input-space"> </div>
						)}

						{watch('password') || isPasswordInputActive ? (
							<span className="register__input-span">Пароль</span>
						) : (
							<div className="register__input-space">{}</div>
						)}

						<div className="register__pass-input">
							<input
								className={`register__input ${
									errors.password && !isValid && isDirty
										? 'register__input_no-valid'
										: ''
								}`}
								placeholder="Пароль"
								{...register('password', { required: true })}
								type={isPasswordHidden ? 'password' : 'text'}
								onFocus={handlePasswordInputFocus}
								onBlur={handlePasswordInputBlur}
							/>
							{watch('password') ? (
								<button
									className="register__eye-button"
									type="button"
									onClick={handlePasswordHidden}
								>
									<img src={eyeButton} alt="скрыть пароль" />
								</button>
							) : null}
						</div>
						{errors.password ? (
							<div className="register__error-area">
								<img
									className="register__alarm-logo"
									src={alarmLogo}
									alt="уведомление"
								/>
								<p className="register__error-message">
									{errors.password.message}
								</p>
							</div>
						) : (
							<div className="register__input-space"> </div>
						)}

						{watch('password') || isConfirmPasswordInputActive ? (
							<span className="register__input-span">Повторите пароль</span>
						) : (
							<div className="register__input-space">{}</div>
						)}
						<div className="register__pass-input">
							<input
								className={`register__input ${
									errors.confirmPassword && !isValid && isDirty
										? 'register__input_no-valid'
										: ''
								}`}
								type={isConfirmPasswordHidden ? 'password' : 'text'}
								name="confirmPassword"
								placeholder="Повторите пароль"
								{...register('confirmPassword', { required: true })}
								onFocus={handleConfirmPasswordInputFocus}
								onBlur={handleConfirmPasswordInputBlur}
							/>

							{watch('confirmPassword') ? (
								<button
									className="register__eye-button"
									type="button"
									onClick={handleConfirmPasswordHidden}
								>
									<img src={eyeButton} alt="скрыть пароль" />
								</button>
							) : null}
						</div>

						{errors.confirmPassword ? (
							<div className="register__error-area">
								<img
									className="register__alarm-logo"
									src={alarmLogo}
									alt="уведомление"
								/>
								<p className="register__error-message">
									{errors.confirmPassword.message}
								</p>
							</div>
						) : (
							<div className="register__input-space"> </div>
						)}

						<button
							className={
								isValid && !isError
									? 'register__submit-button'
									: 'register__submit-button_disabled'
							}
							type="submit"
							disabled={!isValid || !isDirty || isError}
						>
							Зарегистрироваться
						</button>
					</form>
					<NavLink to="/signin" className="register__caption-link">
						У меня есть аккаунт.&#8194;Войти
					</NavLink>
				</main>
			</div>
		</div>
	);
}

export default Register;
