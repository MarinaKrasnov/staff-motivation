import './ResetPassword.scss';
import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ResetPasswordSchema } from '../../utils/ValidationSchemes';
import { changePassword } from '../../utils/MainApi';
import { ERROR_MESSAGES } from '../../utils/Config';
import logo from '../../images/M-check.svg';
import Modal from '../Modal/Modal';
import logo1 from '../../images/CircleWavyCheck.svg';
import styles from '../Modal/Modal.module.scss';
import ClaudSlash from '../../CloudSlash.svg';

export default function ResetPassword() {
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
		mode: 'onTouched',
		resolver: yupResolver(ResetPasswordSchema),
	});

	const [isError, setIsError] = useState(false);
	const [error, setError] = useState(null);

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
		if (errors.email) {
			setIsError(true);
			setError(errors.email.message);
		} else if (isValid) {
			setIsError(false);
		} else {
			setIsError(false);
		}
	}, [errors.email, isValid]);

	const onSubmit = (data, evt) => {
		evt.preventDefault();
		changePassword(data.email)
		  .then(() => {
			setIsOpen(true);
		  })
		  .catch((err) => {
			if (err === 400) {
			  setIsError(true);
			  setError(ERROR_MESSAGES.SERVER.DATA);
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
			<div className="reset-password">
				<header className="form__header">
					<img className="form__logo" src={logo} alt="Логотип" />
					<h1 className="form__title">Motivation System</h1>
				</header>
				<main className="form__main">
					{isError ? (
						<h2 className="form__error">{error}</h2>
					) : (
						<h2 className="form__subtitle">
							Укажите email, который вы использовали для регистрации
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

						<button
							className="form__submit-button"
							type="submit"
							disabled={!isValid || !isDirty || isError}
						>
							Сбросить пароль
						</button>
					</form>
					<NavLink to="/signin" className="form__caption-link">
						Отменить
					</NavLink>
					<Modal isOpen={isOpen}>
      <section className={styles.ModalPort} ref={modalRef}>
					<div className={styles.Module}>
						<img src={logo1} className="App-logo" alt="logo" />
						<h2 className={styles.Message}>
							Мы отправили ссылку для создания нового пароля на вашу электронную
							почту
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

/*
ResetPassword.propTypes = {
	onResetPassword: PropTypes.func.isRequired,
};
*/
