import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import './PersonalData.scss';
import chagePhoto from '../../images/change-photo.svg';
import logoLamp from '../../images/logo.svg';
import { getUsersInfo, setUsersInfo } from '../../utils/MainApi';

function PersonalData() {
	const [userData, setUserData] = useState([]);

	const profile = {
		photo: logoLamp,
		name: 'Вася Вася Вася',
		job: 'Маркетолог',
		department: 'Отдел контент-маркетинга',
		level: 'Middle',

		phone: '+7 915 999-99-99',
		telegram: '@ivanov879.ivan',
		email: 'i.ivanov@yandex.ru',
		github: '@ivanov.marketing',
		linkedin: 'Вася',
		birthday: userData.birthday,
	};

	// console.log(first_name);

	// console.log(last_name);
	console.log(profile.birthday);
	// console.log(email);

	function getInfo() {
		getUsersInfo()
			.then((data) => {
				console.log(data);
				setUserData(data[0]);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	useEffect(() => {
		getInfo();
	}, []);

	const {
		register,
		handleSubmit,
		// getValues,
		// watch, // для отслеживания input value
		// formState: { errors, isValid, isDirty },
	} = useForm({
		mode: 'onTouched',
		// resolver: yupResolver(LoginSchema),
	});

	function handlePersonalData(data) {
		setUsersInfo(data)
			.then((newdata) => {
				console.log(newdata);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function onSubmit(data, evt) {
		evt.preventDefault();
		handlePersonalData(data);
	}

	return (
		<section className="personal-data">
			<div className="personal-data__photo-container">
				<img
					className="personal-data__photo"
					src={profile.photo}
					alt="фотография профиля"
				/>
				<h1 className="personal-data__name">{profile.name}</h1>
				<p className="personal-data__job">{profile.job}</p>
				<p className="personal-data__department">{profile.department}</p>
				<p className="personal-data__level">{`Уровень: ${profile.level}`}</p>
				<button className="personal-data__change-photo-button" type="button">
					<img
						className="personal-data__change-photo-logo"
						src={chagePhoto}
						alt="изменить фото"
					/>
				</button>
			</div>
			<div className="personal-data__data-container">
				<form className="personal-data__form" onSubmit={handleSubmit(onSubmit)}>
					<label
						className="personal-data__label personal-data__label_phone"
						htmlFor="phone"
					>
						Телефон
						<input
							className="personal-data__input "
							defaultValue={profile.phone}
							type="text"
							name="phone"
							id="phone"
							{...register('phone', { required: true })}
						/>
					</label>
					<label
						className="personal-data__label personal-data__label_telegram"
						htmlFor="telegram"
					>
						Telegram
						<input
							className="personal-data__input"
							defaultValue={profile.telegram}
							type="text"
							name="telegram"
							id="telegram"
							{...register('telegram', { required: true })}
						/>
					</label>
					<label
						className="personal-data__label personal-data__label_email"
						htmlFor="email"
					>
						Электронная почта
						<input
							className="personal-data__input "
							defaultValue={profile.email}
							type="email"
							name="email"
							id="email"
							{...register('email', { required: true })}
						/>
					</label>
					<label
						className="personal-data__label personal-data__label_github"
						htmlFor="github"
					>
						GitHub
						<input
							className="personal-data__input "
							defaultValue={profile.github}
							type="text"
							name="github"
							id="github"
							{...register('github', { required: true })}
						/>
					</label>
					<label
						className="personal-data__label personal-data__label_linkedin"
						htmlFor="linkedin"
					>
						LinkedIn
						<input
							className="personal-data__input "
							defaultValue={profile.linkedin}
							type="text"
							name="linkedin"
							id="linkedin"
							{...register('linkedin', { required: true })}
						/>
					</label>
					<label
						className="personal-data__label personal-data__label_birthday"
						htmlFor="birthday"
					>
						Дата рождения
						<input
							className="personal-data__input "
							defaultValue={profile.birthday}
							type="text"
							name="birthday"
							id="birthday"
							{...register('birthday', { required: true })}
						/>
					</label>
					<button
						className="personal-data__submit-button personal-data__submit-button_save"
						type="submit"
					>
						Сохранить изменения
					</button>
					<button
						className="personal-data__submit-button personal-data__submit-button_dont-save"
						type="button"
						onClick={getInfo}
					>
						Не сохранять
					</button>
				</form>
			</div>
		</section>
	);
}

export default PersonalData;
