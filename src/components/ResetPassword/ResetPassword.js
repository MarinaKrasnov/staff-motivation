import './ResetPassword.scss';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ResetPasswordSchema } from '../../utils/ValidationSchemes';
import { changePassword } from '../../utils/MainApi';
import { ERROR_MESSAGES } from '../../utils/Config';

import logo from '../../images/M-check.svg';

export default function ResetPassword() {
	const navigate = useNavigate();
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
				navigate('/change-password-modal');
			})
			.catch((err) => {
				if (err === 400) {
					setIsError(true);
					setError(ERROR_MESSAGES.SERVER.DATA);
				} else if (err === 500) {
					navigate('/server-error');
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
