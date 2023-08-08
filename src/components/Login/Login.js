import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import lampLogo from '../../images/lamp-logo.svg';
import alarmLogo from '../../images/alarm-logo.svg';

function Login({ isRememberMePressed, handleIsRememberMePressed }) {
	return (
		<section className="login">
			<div className="login__container">
				<div className="login__title-container">
					<img className="login__lamp-logo" src={lampLogo} alt="лампочка" />
					<h2 className="login__title">Motivation System</h2>
				</div>

				<p className="login__message">
					Войдите в аккаунт, чтобы получить доступ к приложению
				</p>
				<form className="login__form">
					<input className="login__input login__input_type_email" />

					<div className="login__error-area login__error-area_type_email">
						<img
							className="login__alarm-logo"
							src={alarmLogo}
							alt="уведомление"
						/>
						<span className="login__error-message">
							Такой пользователь не зарегистрирован
						</span>
					</div>

					<input className="login__input login__input_type_password" />

					<div className="login__error-area login__error-area_type_password">
						<img
							className="login__alarm-logo"
							src={alarmLogo}
							alt="уведомление"
						/>
						<span className="login__error-message">Неверный пароль</span>
					</div>

					<div className="login__checkbox-container">
						<input
							className="login__checkbox"
							checked={isRememberMePressed}
							onChange={handleIsRememberMePressed}
							id="remember-checkbox"
							type="checkbox"
							name="remember-checkbox"
						/>
						<span className="login__checkbox-label">Запомнить меня</span>
						<NavLink
							className="login__link login__link_type_recovery"
							to="/password-recovery"
						>
							Забыли пароль?
						</NavLink>
					</div>

					<button className="login__button">Войти</button>
				</form>
				<NavLink
					className="login__link login__link_type_register"
					to="/password-recovery"
				>
					У меня нет аккаунта, зарегистрироваться
				</NavLink>
			</div>
		</section>
	);
}

Login.propTypes = {
	isRememberMePressed: PropTypes.bool.isRequired,
	handleIsRememberMePressed: PropTypes.func.isRequired,
};

export default Login;
