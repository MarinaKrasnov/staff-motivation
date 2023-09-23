import './MyTasks.scss';
import React, { useState, useEffect, useCallback } from 'react';
import MyTask from '../MyTask/MyTask';
import { tasksList } from '../../utils/constants';
import iconFilter from '../../images/SortAscending.png';

function MyTasks() {
	/* const todayDate = new Date().toLocaleDateString();
	const tomorrowDate = new Date(
		new Date().getTime() + 24 * 60 * 60 * 1000
	).toLocaleDateString(); */

	const [tasksArray, setTasksArray] = useState(tasksList);
	const [isArray, setArray] = useState(true);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [allTasksButton, setAllTasksButton] = useState(true);
	const [activeTasksButton, setActiveTaskstButton] = useState(false);
	const [inApproveTasksButton, setInApproveTasksButton] = useState(false);
	const [timeOutTasksButton, setTimeOutTasksButton] = useState(false);
	const [popupInfo, setPopupInfo] = useState([]);
	const [statusName, setStatusName] = useState('');

	const { status, reward_points, title, description, created_at, deadline } =
		popupInfo;

	const dateDeadline = new Date(deadline);
	const dateCreated = new Date(created_at);
	const options = { day: 'numeric', month: 'numeric' };
	const formattedDateDeadline = dateDeadline.toLocaleDateString(
		'ru-RU',
		options
	);
	const formattedDateCreated = dateCreated.toLocaleDateString('ru-RU', options);

	useEffect(() => {
		if (tasksArray.length === 0 || null) {
			setArray(false);
		} else if (tasksArray === undefined) {
			setArray(false);
		} else {
			setArray(true);
		}
	}, [tasksArray]);

	useEffect(() => {
		if (status === 'created') {
			setStatusName('на выполнении');
		}
		if (status === 'is_overdue') {
			setStatusName('истёк срок задачи');
		}
		if (status === 'approve') {
			setStatusName('подтверждено');
		}
		if (status === 'sent_for_review') {
			setStatusName('на подтверждении');
		}
		if (status === 'rejected') {
			setStatusName('на доработке');
		}
	}, [status]);

	function handleAllTasksSort() {
		setAllTasksButton(true);
		setTimeOutTasksButton(false);
		setInApproveTasksButton(false);
		setActiveTaskstButton(false);
		setTasksArray(tasksList);
	}

	function handleActiveTasksSort() {
		setAllTasksButton(false);
		setActiveTaskstButton(true);
		setTimeOutTasksButton(false);
		setInApproveTasksButton(false);
		const filteredTasks = tasksList.filter(
			(task) => task.status === 'created' || task.status === 'rejected'
		);
		setTasksArray(filteredTasks);
	}

	function handleInApproveSort() {
		setInApproveTasksButton(true);
		setActiveTaskstButton(false);
		setAllTasksButton(false);
		setTimeOutTasksButton(false);
		const filteredTasks = tasksList.filter(
			(task) => task.status === 'sent_for_review'
		);
		setTasksArray(filteredTasks);
	}

	function handleTimeOutSort() {
		setTimeOutTasksButton(true);
		setInApproveTasksButton(false);
		setActiveTaskstButton(false);
		setAllTasksButton(false);
		const filteredTasks = tasksList.filter(
			(task) => task.status === 'is_overdue'
		);
		setTasksArray(filteredTasks);
	}

	function handleDeadlineSort() {
		setTasksArray(tasksArray);
		console.log('click-click');
	}

	const handlePopupOpen = useCallback((id, disablePopup) => {
		const itemData = tasksList.find((item) => item.id === id);
		setPopupInfo(itemData);
		if (disablePopup) {
			setIsPopupOpen(false);
			return;
		}
		setIsPopupOpen(true);
	}, []);

	function closePopupOverlay(event) {
		if (event.target.classList.contains('popup')) {
			setIsPopupOpen(false);
		}
	}

	function closePopupButton() {
		setIsPopupOpen(false);
	}

	function confirmTaskPopup() {
		setIsPopupOpen(false);
	}

	return (
		<section className="tasks">
			<h2 className="tasks__title">Мои задачи</h2>
			<nav className="tasks__nav">
				<button
					className={
						allTasksButton
							? 'tasks__sort-button tasks__sort-button-active'
							: 'tasks__sort-button'
					}
					onClick={handleAllTasksSort}
				>
					Все задачи
				</button>
				<button
					className={
						activeTasksButton
							? 'tasks__sort-button tasks__sort-button-active'
							: 'tasks__sort-button'
					}
					onClick={handleActiveTasksSort}
				>
					В работе
				</button>
				<button
					className={
						inApproveTasksButton
							? 'tasks__sort-button tasks__sort-button-active'
							: 'tasks__sort-button'
					}
					onClick={handleInApproveSort}
				>
					На подтверждении
				</button>

				<button
					className={
						timeOutTasksButton
							? 'tasks__sort-button tasks__sort-button-active'
							: 'tasks__sort-button'
					}
					onClick={handleTimeOutSort}
				>
					Просроченные
				</button>

				<button className="tasks__filter" onClick={handleDeadlineSort}>
					<div className="tasks__filter-title">
						Сортировать по дате дедлайна
					</div>
					<img
						className="tasks__filter-img"
						src={iconFilter}
						alt="значок сортировки"
					/>
				</button>
			</nav>
			{isArray ? (
				<div className="tasks__list">
					{tasksArray.map((task) => (
						<MyTask onClick={handlePopupOpen} task={task} key={task.id} />
					))}
				</div>
			) : (
				<p className="tasks__empty">Здесь будут ваши задачи</p>
			)}
			{isPopupOpen ? (
				<div
					className="popup"
					onClick={closePopupOverlay}
					role="button"
					tabIndex={0}
					onKeyDown={null}
				>
					<div className="popup__container">
						<div className="popup__header">
							<h3 className="popup__title">{title}</h3>
							<button
								className="popup__close-button"
								onClick={closePopupButton}
							>
								{}
							</button>
						</div>
						<p className="popup__status">Создана: {formattedDateCreated}</p>
						<p className="popup__status">Статус: {statusName}</p>
						<p className="popup__description-title">Описание</p>
						<p className="popup__description-text">{description}</p>
						<p className="popup__description">
							Срок исполнения: {formattedDateDeadline}
						</p>
						<p className="popup__description">
							Баллы за выполнение: {reward_points}
						</p>
						<button className="popup__button" onClick={confirmTaskPopup}>
							Подтвердить выполнение
						</button>
					</div>
				</div>
			) : null}
		</section>
	);
}
export default MyTasks;
