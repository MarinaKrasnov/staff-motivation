import './PopupEditTask.scss';
import React, { useState /* useEffect */ } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { editTask } from '../../../../utils/MainApi';

function PopupEditTask({ setPopupEditTaskOpen, users, popupInfo }) {
	const navigate = useNavigate();

	const {
		assigned_to,
		status,
		reward_points,
		title,
		description,
		created_at,
		deadline,
		id,
	} = popupInfo;

	function findUserById(userId) {
		const userName = users.find((user) => user.id === userId);
		return userName ? `${userName.last_name} ${userName.first_name}` : null;
	}

	const userName = findUserById(assigned_to);

	const [executor, setExecutor] = useState(userName);
	const [isAreaBorder, setAreaBorder] = useState(false);
	const [selectedUserId, setSelectedUserId] = useState();

	console.log(selectedUserId);

	const {
		register,
		handleSubmit,
		// getValues,
		watch,
		// formState: { errors, isValid, isDirty },
	} = useForm({
		mode: 'onTouched',
		// resolver: yupResolver(LoginSchema),
	});

	const dateDeadline = new Date(deadline);
	const dateCreated = new Date(created_at);
	const options = { day: 'numeric', month: 'numeric' };
	const formattedDateDeadline = dateDeadline.toLocaleDateString(
		'ru-RU',
		options
	);
	const formattedDateCreated = dateCreated.toLocaleDateString('ru-RU', options);

	function closePopupOverlay(event) {
		if (event.target.classList.contains('popup')) {
			setPopupEditTaskOpen(false);
		}
	}

	function closePopupButton() {
		setPopupEditTaskOpen(false);
	}

	const handleClick = (name, userId) => {
		setSelectedUserId(userId);
		setExecutor(name);
	};

	function setAreaStyle() {
		setAreaBorder(true);
	}

	function onSubmit(data, evt) {
		evt.preventDefault();
		editTask(id, data)
			.then(() => {
				setPopupEditTaskOpen(false);
			})
			.catch((res) => {
				if (res === 500) {
					navigate('/server-error');
				} else {
					console.log(res);
				}
			});
	}

	return (
		<div
			className="popup"
			onClick={closePopupOverlay}
			role="button"
			tabIndex={0}
			onKeyDown={null}
		>
			<div className="popup-teamlead">
				<div className="popup__header">
					<h3 className="popup-addtask">{title}</h3>
					<button className="popup__close-button" onClick={closePopupButton}>
						{}
					</button>
				</div>
				<div className="popup-addtask__info">
					<p className="popup-addtask__created">
						Создана {formattedDateCreated}
					</p>
					<p className="popup-addtask__status">Статус: {status}</p>
				</div>

				<form className="popup-addtask__form" onSubmit={handleSubmit(onSubmit)}>
					<div
						className={
							isAreaBorder || watch('discription')
								? 'popup-addtask__input-area-filled'
								: 'popup-addtask__input-area'
						}
					>
						<textarea
							className="popup-addtask__input-text"
							defaultValue={description || ''}
							placeholder="Добавьте описание задачи"
							type="text"
							name="discription"
							id="discription"
							onFocus={setAreaStyle}
							{...register('discription', { required: false })}
						/>
					</div>

					<div className="popup-addtask__executors">
						<p className="popup-addtask__executor">Исполнитель:&nbsp;</p>
						<div className="popup-addtask__executor-block">
							<p className="popup-addtask__executor-name">{executor}</p>
						</div>
					</div>

					<div className="popup-addtask__executors-element">
						<ul className="popup-addtask__executors-list">
							{users.map((name) => (
								<li key={name.id}>
									<button
										type="button"
										className="popup-addtask__executors-name"
										onClick={() =>
											handleClick(
												`${name.last_name} ${name.first_name}`,
												name.id
											)
										}
									>
										{name.last_name} {name.first_name}
									</button>
								</li>
							))}
						</ul>
					</div>

					<label className="popup-addtask__label-bottom" htmlFor="data">
						Срок исполнения
						<input
							className={
								watch('deadline')
									? 'popup-addtask__input-bottom-filled'
									: 'popup-addtask__input-bottom '
							}
							defaultValue={formattedDateDeadline || ''}
							placeholder="дд.мм"
							type="text"
							name="deadline"
							id="deadline"
							{...register('deadline', { required: false })}
						/>
					</label>

					<label className="popup-addtask__label-bottom" htmlFor="balls">
						Баллы за выполнение
						<input
							className={
								watch('reward_points')
									? 'popup-addtask__input-bottom-filled'
									: 'popup-addtask__input-bottom '
							}
							defaultValue={reward_points || ''}
							type="text"
							name="reward_points"
							id="reward_points"
							{...register('reward_points', { required: false })}
						/>
					</label>

					<label
						className="popup-edit__checkbox-container"
						htmlFor="task-checkbox"
					>
						<input
							className="popup-edit__checkbox"
							id="task-checkbox"
							type="checkbox"
							name="task-checkbox"
						/>
						<span />
						<p className="popup-edit__checkbox-message">Отклонить задачу</p>
					</label>

					<button className="popup-addtask__button" type="submit">
						Сохранить изменения
					</button>
				</form>
			</div>
		</div>
	);
}
export default PopupEditTask;

PopupEditTask.propTypes = {
	setPopupEditTaskOpen: PropTypes.func.isRequired,
	popupInfo: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			status: PropTypes.string.isRequired,
			reward_points: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			created_at: PropTypes.string.isRequired,
			deadline: PropTypes.string.isRequired,
			assigned_to: PropTypes.number.isRequired,
			department: PropTypes.string.isRequired,
		})
	),
	users: PropTypes.arrayOf(
		PropTypes.shape({
			first_name: PropTypes.string,
			last_name: PropTypes.string,
			id: PropTypes.number,
		})
	).isRequired,
};

PopupEditTask.defaultProps = {
	popupInfo: {
		id: 101,
		status: 'created',
		reward_points: 10,
		title: 'Составить контент план',
		description: 'Описание в разработке',
		created_at: '2023-09-23T12:26:38.755Z',
		deadline: '2023-09-29T12:26:38.755Z',
		assigned_to: 0,
		department: 'Маркетинг',
	},
};
