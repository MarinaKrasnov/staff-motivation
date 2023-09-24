import './NewPassword.scss';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NewPasswordSchema } from '../../utils/ValidationSchemes';
import { changePassword } from '../../utils/MainApi';
import { ERROR_MESSAGES } from '../../utils/Config';
import logo1 from '../../images/CircleWavyCheck.svg';
import logo from '../../images/M-check.svg';
import eyeButton from '../../images/Icon-hidden-pass.svg';
import Modal from '../Modal/Modal';
import styles from '../Modal/Modal.module.scss';
import ClaudSlash from '../../CloudSlash.svg';

function NewPassword() {
	const navigate = useNavigate();
	// поменяй  false на true, что бы посмтореть на модалку
	const [isOpen, setIsOpen] = useState(false);
	const [isServerErrorOpen, setIsServerErrorOpen] = useState(false);
	const modalRef = useRef(null);
	// Используем navigate для перенаправления на страницу Signin
	const handleLogin = () => {
		navigate('/Signin');
	};

	const [isError, setIsError] = useState(false);
	const [error, setError] = useState(null);
	const [isPasswordHidden, setPasswordHidden] = useState(false);
	const [isConfirmPasswordHidden, setConfirmPasswordHidden] = useState(false);

	const {
		register,
		handleSubmit,
		// setValue,
		watch,
		formState: { errors, isValid, isDirty },
	} = useForm({
		mode: 'onChange',
		// mode: 'onTouched',
		resolver: yupResolver(NewPasswordSchema),
	});

	useEffect(() => {
		if (errors.password) {
			setIsError(true);
			setError(errors.password.message);
		} else if (errors.confirmPassword) {
			setIsError(true);
			setError(errors.confirmPassword.message);
		} else if (isValid) {
			setIsError(false);
		} else {
			setIsError(false);
		}
	}, [errors.password, errors.confirmPassword, isValid]);

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
	useEffect(() => {
		const handleKeyDown = (event) => {
		  if (event.key === 'Escape') {
			setIsServerErrorOpen(false);
		  }
		};
	
		const handleMouseDown = (event) => {
		  if (!modalRef.current || modalRef.current.contains(event.target)) {
			return;
		  }
		  setIsServerErrorOpen(false);
		};
	
		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('mousedown', handleMouseDown);
	
		return () => {
		  document.removeEventListener('keydown', handleKeyDown);
		  document.removeEventListener('mousedown', handleMouseDown);
		};
	  }, []);

	const onSubmit = (data, evt) => {
		evt.preventDefault();
		changePassword(data.oldPassword, data.password)
			.then(() => {
				setIsOpen(true);
				console.log('Пароль успешно изменен');
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
	};

	return (
		<div className="form">
			<div className="new-password">
				<header className="form__header">
					<img className="form__logo" src={logo} alt="Логотип" />
					<h1 className="form__title">Motivation System</h1>
				</header>
				<main className="form__main">
					{isError ? (
						<h2 className="new-password__error">{error}</h2>
					) : (
						<h2 className="form__subtitle">
							Войдите в аккаунт, чтобы получть доступ к приложению
						</h2>
					)}
					<form
						className="form__form"
						onSubmit={handleSubmit(onSubmit)}
						noValidate
					>
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
									type={isConfirmPasswordHidden ? 'password' : 'text'}
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
							Изменить пароль
						</button>
					</form>
					<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  					<section className={styles.ModulePort}>
   					 <div className={styles.Module}>
     				 <img src={logo1} className="App-logo" alt="logo" />
     				 <h2 className={styles.Text3}>Ваш пароль успешно изменен!</h2>
     				 <button className={styles.button} onClick={handleLogin}>
       				Войти
      				</button>
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

export default NewPassword;
