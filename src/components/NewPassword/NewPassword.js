import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NewPasswordSchema } from '../../utils/ValidationShemes';
import * as MainApi from '../../utils/MainApi';
import './NewPassword.scss';
import errorIcon from '../../images/error-icon.svg';

function NewPassword() {
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);
	const [passwordDirty, setPasswordDirty] = useState(false);
	const [repeatPasswordDirty, setRepeatPasswordDirty] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isValid },
	} = useForm({
		// mode: 'onChange',
		mode: 'onTouched',
		resolver: yupResolver(NewPasswordSchema),
	});

	const handleChange = (e) => {
		setValue('password', e.target.value);
		setPasswordDirty(true);
	};

	const handleChangeRepeat = (e) => {
		setValue('repeatPassword', e.target.value);
		setRepeatPasswordDirty(true);
	};

	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};

	const toggleRepeatPasswordVisibility = () => {
		setRepeatPasswordVisible(!repeatPasswordVisible);
	};

	// запрос на смену пароля
	const onSubmit = (data) => {
		MainApi.changePassword(data.oldPassword, data.password)
			.then(() => {
				console.log('Пароль успешно изменен');
				// здесь будет открываться Виталин компонент (попап с кнопкой)
			})
			.catch((error) => {
				console.log('Ошибка при смене пароля:', error);
				// что-то будет происходит, если возникнут ошибки при смене пароля
			});
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
				<form className="new-password__form" onSubmit={handleSubmit(onSubmit)}>
					<div className="new-password__input-container">
						<input
							className={`new-password__input ${
								errors.password ? 'new-password__input_no-valid' : ''
							}`}
							type={passwordVisible ? 'text' : 'password'}
							placeholder="Пароль"
							{...register('password')}
							onChange={handleChange}
						/>
						<div className="new-password__error-container">
							{errors.password && (
								<div className="new-password__error-message">
									<img
										src={errorIcon}
										alt="Error Icon"
										className="new-password__error-icon"
									/>
									{errors.password.message}
								</div>
							)}
						</div>
						{passwordDirty && (
							<div className="new-password__btn-container">
								<button
									className={`new-password__hide-btn ${
										passwordVisible ? 'new-password__hide-btn_visible' : ''
									}`}
									onClick={togglePasswordVisibility}
									type="button"
								>
									Hide
								</button>
							</div>
						)}
					</div>
					<div className="new-password__input-container">
						<input
							className={`new-password__input ${
								errors.repeatPassword ? 'new-password__input_no-valid' : ''
							}`}
							type={repeatPasswordVisible ? 'text' : 'password'}
							placeholder="Повторите пароль"
							{...register('repeatPassword')}
							onChange={handleChangeRepeat}
						/>
						<div className="new-password__error-container">
							{errors.repeatPassword && (
								<div className="new-password__error-message">
									<img
										src={errorIcon}
										alt="Предупреждение"
										className="new-password__error-icon"
									/>
									{errors.repeatPassword.message}
								</div>
							)}
						</div>
						{repeatPasswordDirty && (
							<div className="new-password__btn-container">
								<button
									className={`new-password__hide-btn ${
										repeatPasswordVisible
											? 'new-password__hide-btn_visible'
											: ''
									}`}
									onClick={toggleRepeatPasswordVisibility}
									type="button"
								>
									Hide
								</button>
							</div>
						)}
					</div>
					<button
						className="new-password__submit-btn"
						type="submit"
						disabled={!isValid}
					>
						Изменить пароль
					</button>
				</form>
			</div>
		</section>
	);
}

export default NewPassword;
