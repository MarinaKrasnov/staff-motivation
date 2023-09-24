import './Register.scss';
import React, { useState, useEffect, useRef} from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema } from '../../utils/ValidationSchemes';
import { signup } from '../../utils/MainApi';
import { ERROR_MESSAGES } from '../../utils/Config';
import logo1 from '../../images/CircleWavyCheck.svg';
import styles from '../Modal/Modal.module.scss';
import logo from '../../images/M-check.svg';
import eyeButton from '../../images/Icon-hidden-pass.svg';
import Modal from '../Modal/Modal';
import ClaudSlash from '../../CloudSlash.svg';

function Register() {
	// поменяй  false на true, что бы посмтореть на модалку
	const [isOpen, setIsOpen] = useState(false);
	const [isServerErrorOpen, setIsServerErrorOpen] = useState(false);
	const modalRef = useRef(null);
  
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid, isDirty },
	  } = useForm({
		mode: 'onChange',
		resolver: yupResolver(RegisterSchema),
	  });

	const [isError, setIsError] = useState(false);
  	const [error, setError] = useState(null);
  	const [isPasswordHidden, setPasswordHidden] = useState(false);
  	const [isConfirmPasswordHidden, setConfirmPasswordHidden] = useState(false);
  
	  function onRegister(data) {
		signup(data)
		  .then(() => {
			setIsOpen(true);
			console.log('Пользователь зарегистрирован');
		  })
		  .catch((err) => {
			if (err === 400) {
			  setIsError(true);
			  setError(ERROR_MESSAGES.SERVER.REGISTER);
			} else if (err === 500) {
				setIsServerErrorOpen(true);
			} else {
			  setIsError(true);
			  setError(ERROR_MESSAGES.SERVER.ELSE);
			}
		  });
	  }
	 
	function onSubmit(data, evt) {
		evt.preventDefault();
		onRegister(data);
	}

	function handlePasswordHidden() {
		setPasswordHidden(!isPasswordHidden);
	  }
	
	  function handleConfirmPasswordHidden() {
		setConfirmPasswordHidden(!isConfirmPasswordHidden);
	  }
	
	  useEffect(() => {
		const handleKeyDown = (event) => {
		  if (event.key === 'Escape') {
			setIsOpen(false);
			setIsServerErrorOpen(false);
		  }
		};
	
		const handleMouseDown = (event) => {
		  if (!modalRef.current || modalRef.current.contains(event.target)) {
			return;
		  }
	
		  setIsOpen(false);
		  setIsServerErrorOpen(false);
		};
	
		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('mousedown', handleMouseDown);
	
		return () => {
		  document.removeEventListener('keydown', handleKeyDown);
		  document.removeEventListener('mousedown', handleMouseDown);
		};
	  }, []);
	  
	  useEffect(() => {
		if (
		  errors.email ||
		  errors.lastName ||
		  errors.firstName ||
		  errors.password ||
		  errors.confirmPassword
		) {
		  setIsError(true);
		  setError(
			errors.email?.message ||
			  errors.lastName?.message ||
			  errors.firstName?.message ||
			  errors.password?.message ||
			  errors.confirmPassword?.message
		  );
		} else {
		  setIsError(false);
		  setError(null);
		}
	  }, [
		errors.email,
		errors.lastName,
		errors.firstName,
		errors.password,
		errors.confirmPassword,
	  ]);
	
	
	return (
		<div className="form">
			<div className="form__container">
				<header className="form__header">
					<img className="form__logo" src={logo} alt="Логотип" />
					<h1 className="form__title">Motivation System</h1>
				</header>
				<main className="form__main">
					{isError ? (
						<h2 className="form__error">{error}</h2>
					) : (
						<h2 className="form__subtitle">
							Создайте учётную запись, чтобы получить доступ к приложению
						</h2>
					)}
					<form
						className="form__form"
						onSubmit={handleSubmit(onSubmit)}
						noValidate
					>
						<label className="form__label" htmlFor="email">
							Email
							<input
								id="email"
								name="email"
								className={`form__input ${
									errors.email && !isValid && isDirty
										? 'form__input_no-valid'
										: ''
								} ${watch('email') ? 'form__input_filled' : ''}`}
								{...register('email', { required: true })}
							/>
						</label>

						<label className="form__label" htmlFor="lastName">
							Фамилия
							<input
								id="lastName"
								name="lastName"
								className={`form__input ${
									errors.lastName && !isValid && isDirty
										? 'form__input_no-valid'
										: ''
								} ${watch('lastName') ? 'form__input_filled' : ''}`}
								{...register('lastName', { required: true })}
							/>
						</label>

						<label className="form__label" htmlFor="firstName">
							Имя
							<input
								id="firstName"
								name="firstName"
								className={`form__input ${
									errors.firstName && !isValid && isDirty
										? 'form__input_no-valid'
										: ''
								} ${watch('firstName') ? 'form__input_filled' : ''}`}
								{...register('firstName', { required: true })}
							/>
						</label>

						<div className="form__pass-input">
							<label className="form__label" htmlFor="password">
								Пароль
								<input
									id="password"
									name="password"
									type={isPasswordHidden ? 'password' : 'text'}
									className={`form__input ${
										errors.password && !isValid && isDirty
											? 'form__input_no-valid'
											: ''
									} ${watch('password') ? 'form__input_filled' : ''}`}
									{...register('password', { required: true })}
								/>
								{watch('password') ? (
									<button
										className="form__eye-button"
										type="button"
										onClick={handlePasswordHidden}
									>
										<img src={eyeButton} alt="скрыть пароль" />
									</button>
								) : null}
							</label>
						</div>

						<div className="form__pass-input">
							<label className="form__label" htmlFor="confirmPassword">
								Повторите пароль
								<input
									id="confirmPassword"
									name="confirmPassword"
									type={isPasswordHidden ? 'password' : 'text'}
									className={`form__input ${
										errors.confirmPassword && !isValid && isDirty
											? 'form__input_no-valid'
											: ''
									} ${watch('confirmPassword') ? 'form__input_filled' : ''}`}
									{...register('confirmPassword', { required: true })}
								/>
								{watch('confirmPassword') ? (
									<button
										className="form__eye-button"
										type="button"
										onClick={handleConfirmPasswordHidden}
									>
										<img src={eyeButton} alt="скрыть пароль" />
									</button>
								) : null}
							</label>
						</div>

						<button
						className="form__submit-button"
  						type="submit"
  						disabled={!isValid || !isDirty || isError}
						>
  						Зарегистрироваться
						</button>
			
					</form>
					<NavLink to="/signin" className="form__caption-link">
						У меня есть аккаунт.&#8194;Войти
					</NavLink>
					<Modal isOpen={isOpen}>
      <section className={styles.ModalPort} ref={modalRef}>
					<div className={styles.Module}>
						<img src={logo1} className="App-logo" alt="logo" />
						<h2 className={styles.Message}>
            После активации аккаунта мы отправим вам электронное письмо. В нём будет ссылка на вашу страницу в приложении.
						</h2>
					</div>
				</section>
      </Modal>
	  <Modal isOpen={isServerErrorOpen}>
      <section className={styles.ModalPort} ref={modalRef}>
					<div className={styles.Module}>
						<img src={ClaudSlash} className="App-logo" alt="logo" />
                        <h1 className={styles.Text1}>Сервер временно не доступен</h1>
						<h2 className={styles.Text2}>
                        Мы делаем всё возможное, чтобы возобновить работу приложения. Приносим извинения за доставленные неудобства.
						</h2>
					</div>
				</section>
      </Modal>
				</main>
			</div>
		</div>
	);
}

export default Register;



