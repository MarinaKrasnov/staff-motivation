import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from '../../utils/ValidationSchemes';
// логотипы должны быть в самом низу
import greyCircleLogo from '../../images/grey-circle-logo.svg';
import alarmLogo from '../../images/alarm-logo.svg';
import hiddenEyeLogo from '../../images/hidden-eye-logo.svg';
import deletePasswordLogo from '../../images/delete-password.svg';

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
		onSignIn(data.email, data.password);
	};
	// toggle для отображения скрытых символов или отображения вводимого
	const handlePasswordHidden = () => {
		onHidePasswordClick();
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
				<div className="title-container">
					<img className="title-logo" src={greyCircleLogo} alt="лампочка" />
					<h2 className="title">Motivation System</h2>
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
						className={`login__input-button login__input-button_type_clear-password
							${isIputPasswordButtonsVisible()}`}
						type="button"
						onClick={() => setValue('password', '')}
					>
						<img src={deletePasswordLogo} alt="удалить пароль" />
					</button>
					<button
						className={`login__input-button login__input-button_type_hide-password
						  ${isIputPasswordButtonsVisible()}`}
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
