import './PopupAddTask.scss';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { addTask } from '../../../../utils/MainApi';

function PopupAddTask({ setPopupAddTaskOpen, users, departmentName }) {
	const navigate = useNavigate();
	const [executor, setExecutor] = useState('');
	const [isAreaBorder, setAreaBorder] = useState(false);
	const [selectedUserId, setSelectedUserId] = useState();
	const [departmentData, setDepartmentData] = useState('');

	console.log(selectedUserId);
	console.log(departmentData);

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

	useEffect(() => {
		if (departmentName === 'Фронтенд') {
			setDepartmentData('frontend');
		} else if (departmentName === 'Бэкенд') {
			setDepartmentData('backend');
		} else if (departmentName === 'Quality Assurance') {
			setDepartmentData('QA');
		} else if (departmentName === 'UX/UI дизайн') {
			setDepartmentData('UX_UI');
		} else {
			setDepartmentData('other');
		}
	}, [departmentName]);

	function closePopupOverlay(event) {
		if (event.target.classList.contains('popup')) {
			setPopupAddTaskOpen(false);
		}
	}

	function closePopupButton() {
		setPopupAddTaskOpen(false);
	}

	function onSubmit(data, evt) {
		const date = new Date(data.deadline);
		const formattedDate = date.toISOString();
		evt.preventDefault();
		setPopupAddTaskOpen(false);
		const newData = {
			status: 'created',
			deadline: formattedDate,
			description: data.description,
			title: data.title,
			reward_points: data.reward_points,
			department: departmentData,
			assigned_to: 6 /* selectedUserId */,
		};
		console.log(newData);
		addTask(newData)
			.then(() => {
				setPopupAddTaskOpen(false);
			})
			.catch((res) => {
				if (res === 500) {
					navigate('/server-error');
				} else {
					console.log(res);
				}
			});
	}

	const handleClick = (name, id) => {
		setSelectedUserId(id);
		setExecutor(name);
	};

	function handleRemoveExecutor() {
		setExecutor(null);
	}

	function setAreaStyle() {
		setAreaBorder(true);
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
					<h3 className="popup-addtask">Новая задача</h3>
					<button className="popup__close-button" onClick={closePopupButton}>
						{}
					</button>
				</div>

				<form className="popup-addtask__form" onSubmit={handleSubmit(onSubmit)}>
					<label className="popup-addtask__label" htmlFor="title">
						Название задачи
						<input
							className={
								watch('title')
									? 'popup-addtask__input-filled'
									: 'popup-addtask__input '
							}
							type="text"
							name="title"
							id="title"
							{...register('title', { required: false })}
						/>
					</label>
					<div
						className={
							isAreaBorder || watch('discription')
								? 'popup-addtask__input-area-filled'
								: 'popup-addtask__input-area'
						}
					>
						<textarea
							className="popup-addtask__input-text"
							placeholder="Добавьте описание задачи"
							type="text"
							name="description"
							id="description"
							onFocus={setAreaStyle}
							{...register('description', { required: false })}
						/>
					</div>

					<div className="popup-addtask__executors">
						<p className="popup-addtask__executor">Исполнитель:&nbsp;</p>
						<div className="popup-addtask__executor-block">
							<p className="popup-addtask__executor-name">{executor}</p>
							{executor ? (
								<button
									type="button"
									className="popup-addtask__executor-delete"
									onClick={() => handleRemoveExecutor(executor)}
								>
									{}
								</button>
							) : null}
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
							placeholder="дд.мм"
							type="date"
							name="dealine"
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
							type="number"
							name="reward_points"
							id="reward_points"
							{...register('reward_points', { required: false })}
						/>
					</label>

					<button className="popup-addtask__button" type="submit">
						Добавить задачу
					</button>
				</form>
			</div>
		</div>
	);
}
export default PopupAddTask;

PopupAddTask.propTypes = {
	setPopupAddTaskOpen: PropTypes.func.isRequired,
	departmentName: PropTypes.string.isRequired,
	users: PropTypes.arrayOf(
		PropTypes.shape({
			first_name: PropTypes.string,
			last_name: PropTypes.string,
			id: PropTypes.number,
		})
	).isRequired,
};
