import './PopupAddTask.scss';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

function PopupAddTask({ setPopupAddTaskOpen }) {
	const [executors, setExecutors] = useState([]);
	const names = [
		'Иванов Иван',
		'Петров Петр',
		'Сергеев Сергей',
		'Андреев Андрей',
		'Кирилов Кирил',
	];

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

	function closePopupOverlay(event) {
		if (event.target.classList.contains('popup')) {
			setPopupAddTaskOpen(false);
		}
	}

	function closePopupButton() {
		setPopupAddTaskOpen(false);
	}

	function onSubmit(/* data, */ evt) {
		evt.preventDefault();
		setPopupAddTaskOpen(false);
	}

	const handleClick = (name) => {
		if (!executors.includes(name)) {
			// setExecutors(executors.filter(executor => executor !== name));
			setExecutors([...executors, name]);
		}
	};

	function handleRemoveExecutor(name) {
		setExecutors(executors.filter((i) => i !== name));
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
							className="popup-addtask__input "
							type="text"
							name="title"
							id="title"
							{...register('title', { required: false })}
						/>
					</label>

					<textarea
						className="popup-addtask__input-text"
						placeholder="Добавьте описание задачи"
						type="text"
						name="discription"
						id="discription"
						{...register('discription', { required: false })}
					/>

					<div className="popup-addtask__executors">
						<p className="popup-addtask__executor">Исполнитель:&nbsp;</p>
						{executors.map((executor) => (
							<div className="popup-addtask__executor-block">
								<p className="popup-addtask__executor-name">{executor}</p>
								<button
									type="button"
									className="popup-addtask__executor-delete"
									onClick={() => handleRemoveExecutor(executor)}
								>
									{}
								</button>
								<span>,&nbsp;</span>
							</div>
						))}
					</div>

					<div className="popup-addtask__executors-element">
						<ul className="popup-addtask__executors-list">
							{names.map((name) => (
								<li>
									<button
										type="button"
										className="popup-addtask__executors-name"
										key={name}
										onClick={() => handleClick(name)}
									>
										{name}
									</button>
								</li>
							))}
						</ul>
					</div>

					<label className="popup-addtask__label-bottom" htmlFor="data">
						Срок исполнения
						<input
							className="popup-addtask__input-bottom "
							placeholder="дд.мм"
							type="text"
							name="data"
							id="data"
							{...register('data', { required: false })}
						/>
					</label>

					<label className="popup-addtask__label-bottom" htmlFor="balls">
						Баллы за выполнение
						<input
							className="popup-addtask__input-bottom"
							type="text"
							name="balls"
							id="balls"
							{...register('balls', { required: false })}
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
};
