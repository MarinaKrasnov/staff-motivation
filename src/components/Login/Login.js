import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import emailRegex from '../../utils/RegExps';
// логотипы должны быть в самом низу
import greyCircleLogo from '../../images/grey-circle-logo.svg';
import alarmLogo from '../../images/alarm-logo.svg';
import hiddenEyeLogo from '../../images/hidden-eye-logo.svg';
import deletePasswordLogo from '../../images/delete-password.svg';

const LoginSchema = yup.object().shape({
	email: yup
		.string()
		.email('Некорректный формат электронной почты.')
		.required('Электронная почта не указана.')
		.test(
			'Validate Email',
			'Некорректный формат электронной почты.',
			(value) => {
				const RegEx = emailRegex;
				return RegEx.test(String(value).toLowerCase());
			}
		),
	password: yup
		.string()
		.min(4, 'Пароль должен содержать не менее 4 символов.')
		.max(20, 'Пароль должен содержать не более 20 символов.')
		.required('Пароль не указан.'),
});

export default function Login({
	isRememberMePressed,
	handleIsRememberMePressed,
	onSignIn,
	isPasswordHidden,
	onHidePasswordClick,
}) {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isValid, isDirty },
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(LoginSchema),
	});

	const handleRememberButton = () => {
		handleIsRememberMePressed();
	};

	const onSubmit = (values) => {
		onSignIn(values.email, values.password);
	};

	const handlePasswordHidden = () => {
		onHidePasswordClick();
	};

	const emptyText = '';

	return (
		<section className="login">
			<div className="login__container">
				<div className="login__title-container">
					<img
						className="login__circle-logo"
						src={greyCircleLogo}
						alt="лампочка"
					/>
					<h2 className="login__title">Motivation System</h2>
				</div>
				<p className="login__message">
					Войдите в аккаунт, чтобы получить доступ к приложению
				</p>
				<form
					className="login__form"
					onSubmit={handleSubmit(onSubmit)}
					noValidate
				>
					<input
						className="login__input login__input_type_email"
						placeholder="E-mail"
						{...register('email', { required: true })}
					/>
					<div
						className={`login__error-area login__error-area_type_email ${
							!errors.email ? 'login__error-area_hidden' : ''
						}`}
					>
						<img
							className="login__alarm-logo"
							src={alarmLogo}
							alt="уведомление"
						/>
						<p className="login__error-message">{errors.email?.message}</p>
					</div>
					<input
						className="login__input login__input_type_password"
						placeholder="Пароль"
						{...register('password', { required: true })}
						type={isPasswordHidden ? 'password' : 'text'}
						autoComplete="new-password"
					/>
					<button
						className="login__clear-input-button"
						type="button"
						onClick={() => setValue('password', '')}
					>
						<img src={deletePasswordLogo} alt="удалить пароль" />
					</button>
					<button
						className="login__hide-password-button"
						type="button"
						onClick={handlePasswordHidden}
					>
						<img src={hiddenEyeLogo} alt="скрыть пароль" />
					</button>
					<div
						className={`login__error-area login__error-area_type_password ${
							!errors.password ? 'login__error-area_hidden' : ''
						}`}
					>
						<img
							className="login__alarm-logo"
							src={alarmLogo}
							alt="уведомление"
						/>
						<p className="login__error-message">{errors.password?.message}</p>
					</div>

					<label
						className="login__checkbox-container"
						htmlFor="remember-checkbox"
					>
						<input
							className="login__checkbox"
							checked={isRememberMePressed}
							onChange={handleRememberButton}
							id="remember-checkbox"
							type="checkbox"
							name="remember-checkbox"
						/>
						<span>{emptyText}</span>
						<p className="login__checkbox-message">Запомнить меня</p>
						<NavLink
							className="login__link login__link_type_recovery"
							to="/password-recovery"
						>
							Забыли пароль?
						</NavLink>
					</label>

					<button
						className="login__button"
						type="submit"
						disabled={!isDirty || !isValid}
					>
						Войти
					</button>
				</form>
				<NavLink className="login__link login__link_type_register" to="/signup">
					У меня нет аккаунта, зарегистрироваться
				</NavLink>
			</div>
		</section>
	);
}

Login.propTypes = {
	isRememberMePressed: PropTypes.bool.isRequired,
	handleIsRememberMePressed: PropTypes.func.isRequired,
	onSignIn: PropTypes.func.isRequired,
	isPasswordHidden: PropTypes.bool.isRequired,
	onHidePasswordClick: PropTypes.func.isRequired,
};
