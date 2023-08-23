import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ResetPassordSchema } from '../../utils/ValidationSchemes';
// svg's
import greyCircleLogo from '../../images/logo.svg';
import alarmLogo from '../../images/alarm-logo.svg';

export default function ResetPassword() {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isDirty },
	} = useForm({
		mode: 'onTouched',
		resolver: yupResolver(ResetPassordSchema),
	});
	// функция на сабмит
	const onSubmit = () => {
		// нужен api
	};
	return (
		<section className="reset-password">
			<div className="reset-password__container">
				<div className="reset-password__title-container">
					<img
						className="reset-password__circle-logo"
						src={greyCircleLogo}
						alt="лампочка"
					/>
					<h2 className="reset-password__title">Motivation System</h2>
				</div>
				<p className="reset-password__message">
					Укажите email, который вы использовали для регистрации
				</p>

				<form
					className="reset-password__form"
					onSubmit={handleSubmit(onSubmit)}
					noValidate
				>
					<input
						className={`reset-password__input ${
							errors.email && !isValid && isDirty
								? 'reset-password__input_no-valid'
								: ''
						}`}
						placeholder="E-mail"
						{...register('email', { required: true })}
					/>
					<div
						className={`reset-password__error-area ${
							!errors.email ? 'reset-password__error-area_hidden' : ''
						}`}
					>
						<img
							className="reset-password__alarm-logo"
							src={alarmLogo}
							alt="уведомление"
						/>
						<p className="reset-password__error-message">
							{errors.email?.message}
						</p>
					</div>

					<button
						className="reset-password__button"
						type="submit"
						disabled={!isDirty || !isValid}
					>
						Сбросить пароль
					</button>
				</form>

				<NavLink className="reset-password__link" to="/signin">
					Отменить
				</NavLink>
			</div>
		</section>
	);
}

/*
ResetPassword.propTypes = {
	onResetPassword: PropTypes.func.isRequired,
};
*/
