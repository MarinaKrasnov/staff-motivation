import { useState } from 'react';
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types'; на слуйчай выноса пропсов в app.js
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from '../../utils/ValidationSchemes';
import * as MainApi from '../../utils/MainApi';
// логотипы должны быть в самом низу
import greyCircleLogo from '../../images/logo.svg';
import alarmLogo from '../../images/alarm-logo.svg';
import hiddenEyeLogo from '../../images/hidden-eye-logo.svg';

export default function Login() {
	// чекбокс для "Запомнить меня"
	const [isRememberMePressed, setIsRememberMePressed] = useState(false);
	const handleIsRememberMePressed = () => {
		setIsRememberMePressed(!isRememberMePressed);
	};
	// стейт скрытого пароля
	const [isPasswordHidden, setIsPasswordHidden] = useState(true);
	const handleIsPasswordHidden = () => {
		setIsPasswordHidden(!isPasswordHidden);
	};

	const handleLogin = (email, password) => {
		MainApi.login(email, password)
			.then((data) => {
				if (data.token && isRememberMePressed) {
					// пока не совсем понимаю, как будет работать чекбокс, но надеюсь я на правлином пути
					localStorage.setItem('token', data.token); // пока не понятно, что будет присылать api
					// checkToken(); // когда заработает api
				}
			})
			.catch((error) => {
				console.log(`Ошибка: ${error}`);
			});
	};

	// react-hook-form useForm
	const {
		register,
		handleSubmit,
		getValues,
		watch, // для отслеживания input value
		formState: { errors, isValid, isDirty },
	} = useForm({
		mode: 'onTouched',
		resolver: yupResolver(LoginSchema),
	});

	// toggle для кнопки "запонить меня"
	const handleRememberButton = () => {
		handleIsRememberMePressed();
	};

	// фунция, при нажатии на кнопку "Войти"
	const onSubmit = (data) => {
		handleLogin(data.email, data.password);
	};

	const emptyText = ''; // эслинт не дает поставить пустую строку в jsx, пришлось делать через пустую константу

	// проверка на пустую строку для скрытия кнопок
	const isIputPasswordButtonsVisible = () => {
		if (getValues('password') === undefined || getValues('password') === '') {
			return 'login__input-button_hidden';
		}
		return '';
	};

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
						className={`login__input login__input_type_email ${
							errors.email && !isValid && isDirty ? 'login__input_no-valid' : ''
						}`}
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
						className={`login__input login__input_type_password ${
							errors.password && !isValid ? 'login__input_no-valid' : ''
						}`}
						placeholder="Пароль"
						{...register('password', { required: true })}
						type={isPasswordHidden && watch('password') ? 'password' : 'text'}
					/>
					<button
						className={`login__input-button login__input-button_type_hide-password
						  ${isIputPasswordButtonsVisible()}`}
						type="button"
						onClick={handleIsPasswordHidden}
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
							to="/reset-password"
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
/* на случай выноса пропсов в app.js
Login.propTypes = {
	isRememberMePressed: PropTypes.bool.isRequired,
	handleIsRememberMePressed: PropTypes.func.isRequired,
	onSignIn: PropTypes.func.isRequired,
	isPasswordHidden: PropTypes.bool.isRequired,
	onHidePasswordClick: PropTypes.func.isRequired,
};
*/
