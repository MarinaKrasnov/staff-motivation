import PropTypes from 'prop-types';
import lampLogo from '../../images/lamp-logo.svg';

function Login({ isRememberMePressed, handleIsRememberMePressed }) {
	return (
		<section className="login">
			<img src={lampLogo} alt="логотип лампочки" />
			<h2 className="login__title">Motivation System</h2>
			<p className="login__message">
				Войдите в аккаунт, чтобы получить доступ к приложению
			</p>
			<form className="login__form">
				<input className="login__input" />
				<input className="login__input" />
				<input
					className="login__checkbox"
					checked={isRememberMePressed}
					onChange={handleIsRememberMePressed}
					id="remember-checkbox"
					type="checkbox"
					name="remember-checkbox"
				/>
			</form>
		</section>
	);
}

Login.propTypes = {
	isRememberMePressed: PropTypes.bool.isRequired,
	handleIsRememberMePressed: PropTypes.func.isRequired,
};

export default Login;
