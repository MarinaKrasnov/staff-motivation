// import { useForm } from 'react-hook-form';
import './PersonalData.scss';
import chagePhoto from '../../images/change-photo.svg';
import logoLamp from '../../images/logo.svg';

function PersonalData() {
	const profile = {
		// временно, заменить на данные от бэка
		photo: logoLamp, // затычка
		name: 'Вася Вася Вася',
		job: 'Маркетолог',
		department: 'Отдел контент-маркетинга',
		level: 'Middle',
		phone: '+7 915 999-99-99',
		telegram: '@ivanov879.ivan',
		email: 'i.ivanov@yandex.ru',
		github: '@ivanov.marketing',
		linkedin: 'Вася',
		birthday: '01.01.1999',
	};
	/*
	const {
		register,
		handleSubmit,
		// getValues,
		watch, // для отслеживания input value
		formState: { errors, isValid, isDirty },
	} = useForm({
		mode: 'onTouched',
		resolver: yupResolver(LoginSchema),
	});
  */
	/*
	function onSubmit(data, evt) {
		evt.preventDefault();
		handlePersonalData(
			data.phone,
			data.telegram,
			data.email,
			data.github,
			data.linkedin,
			data.birthday,
		);
	}
	*/
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
				<form className="personal-data__form">
					<label
						className="personal-data__label personal-data__label_phone"
						htmlFor="phone"
					>
						Телефон
						<input
							className="personal-data__input "
							placeholder={profile.phone}
							value=""
							type="text"
							name="phone"
							id="phone"
						/>
					</label>
					<label
						className="personal-data__label personal-data__label_telegram"
						htmlFor="telegram"
					>
						Telegram
						<input
							className="personal-data__input"
							placeholder={profile.telegram}
							value=""
							type="text"
							name="telegram"
							id="telegram"
						/>
					</label>
					<label
						className="personal-data__label personal-data__label_email"
						htmlFor="email"
					>
						Электронная почта
						<input
							className="personal-data__input "
							placeholder={profile.email}
							value=""
							type="email"
							name="email"
							id="email"
						/>
					</label>
					<label
						className="personal-data__label personal-data__label_github"
						htmlFor="github"
					>
						GitHub
						<input
							className="personal-data__input "
							placeholder={profile.github}
							value=""
							type="text"
							name="github"
							id="github"
						/>
					</label>
					<label
						className="personal-data__label personal-data__label_linkedin"
						htmlFor="linkedin"
					>
						LinkedIn
						<input
							className="personal-data__input "
							placeholder={profile.linkedin}
							value=""
							type="text"
							name="linkedin"
							id="linkedin"
						/>
					</label>
					<label
						className="personal-data__label personal-data__label_birthday"
						htmlFor="birthday"
					>
						Дата рождения
						<input
							className="personal-data__input "
							placeholder={profile.birthday}
							value=""
							type="text"
							name="birthday"
							id="birthday"
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
					>
						Не сохранять
					</button>
				</form>
			</div>
		</section>
	);
}

export default PersonalData;
