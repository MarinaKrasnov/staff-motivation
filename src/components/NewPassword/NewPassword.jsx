import './NewPassword.scss';
import { useState } from 'react';

function NewPassword() {
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');

	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};

	const toggleRepeatPasswordVisibility = () => {
		setRepeatPasswordVisible(!repeatPasswordVisible);
	};

	const handleChange = (e) => {
		setPassword(e.target.value);
	};

	const handleChangeRepeat = (e) => {
		setRepeatPassword(e.target.value);
	};

	const handleResetPassword = () => {
		setPassword('');
	};

	const handleResetRepeatPassword = () => {
		setRepeatPassword('');
	};

	return (
		<section className="new-password">
			<div className="new-password__container">
				<div className="new-password__title-container">
					<div className="new-password__logo" />
					<h2 className="new-password__title">Motivation System</h2>
				</div>
				<p className="new-password__subtitle">
					Войдите в аккаунт, чтобы получить доступ к приложению
				</p>
				<form className="new-password__form">
					<div className="new-password__input-container">
						<input
							className="new-password__input"
							type={passwordVisible ? 'text' : 'password'}
							placeholder="Пароль"
							value={password}
							onChange={handleChange}
							autoComplete="new-password"
						/>
						{password && (
							<div className="new-password__btn-container">
								<button
									className="new-password__delete-btn"
									onClick={handleResetPassword}
									type="button"
								>
									delete
								</button>
								<button
									className="new-password__hide-btn"
									onClick={togglePasswordVisibility}
									type="button"
								>
									hide
								</button>
							</div>
						)}
					</div>
					<div className="new-password__input-container">
						<input
							type={repeatPasswordVisible ? 'text' : 'password'}
							placeholder="Повторите пароль"
							className="new-password__input"
							value={repeatPassword}
							onChange={handleChangeRepeat}
							autoComplete="new-password"
						/>
						{repeatPassword && (
							<div className="new-password__btn-container">
								<button
									className="new-password__delete-btn"
									onClick={handleResetRepeatPassword}
									type="button"
								>
									reset
								</button>
								<button
									className="new-password__hide-btn"
									onClick={toggleRepeatPasswordVisibility}
									type="button"
								>
									hide
								</button>
							</div>
						)}
					</div>
				</form>
				<button className="new-password__submit-btn">Изменить пароль</button>
			</div>
		</section>
	);
}

export default NewPassword;
