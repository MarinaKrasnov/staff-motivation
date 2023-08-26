import './MyTasks.scss';
import React, { useState } from 'react';
import MyTask from '../MyTask/MyTask';
import { tasksList } from '../../utils/constants';
import iconFilter from '../../images/filter-Funnel.svg';

function MyTasks() {
	const todayDate = new Date().toLocaleDateString();
	const tomorrowDate = new Date(
		new Date().getTime() + 24 * 60 * 60 * 1000
	).toLocaleDateString();

	const [tasksArray, setTasksArray] = useState(tasksList);
	const [showPopup, setShowPopup] = useState(false);
	const [todaySortButton, setTodaySortButton] = useState(false);
	const [tomorrowSortButton, setTomorrowSortButton] = useState(false);
	const [sprintSortButton, setSprintSortButton] = useState(false);
	const [statusFilters, setStatusFilters] = useState({
		'новая задача': false,
		'на выполнении': false,
		'истёк срок задачи': false,
		'на подтверждении': false,
	});

	const handleStatusFilterChange = (event) => {
		const { name, checked } = event.target;
		setStatusFilters((prevFilters) => ({
			...prevFilters,
			[name]: checked,
		}));
	};

	const sortedTasks = tasksList.filter((task) => statusFilters[task.status]);

	function handleSortSubmit() {
		if (Object.values(statusFilters).every((filter) => filter === false)) {
			setTasksArray(tasksList);
			setShowPopup(false);
		} else {
			setTasksArray(sortedTasks);
			setShowPopup(false);
		}
	}

	function showSortPopup() {
		setShowPopup(true);
	}
	function hideSortPopup() {
		setShowPopup(false);
		setTasksArray(tasksList);
	}

	function handleTodaySort() {
		if (todaySortButton) {
			setTodaySortButton(false);
			setTasksArray(tasksList);
		} else {
			setTodaySortButton(true);
			setTomorrowSortButton(false);
			setSprintSortButton(false);
			const filteredTasks = tasksList.filter(
				(task) => task.sortData === todayDate
			);
			setTasksArray(filteredTasks);
		}
	}

	function handleTomorrowSort() {
		if (tomorrowSortButton) {
			setTomorrowSortButton(false);
			setTasksArray(tasksList);
		} else {
			setTomorrowSortButton(true);
			setTodaySortButton(false);
			setSprintSortButton(false);
			const filteredTasks = tasksList.filter(
				(task) => task.sortData === tomorrowDate
			);
			setTasksArray(filteredTasks);
		}
	}

	function handleSprintSort() {
		if (sprintSortButton) {
			setSprintSortButton(false);
		} else {
			setSprintSortButton(true);
			setTodaySortButton(false);
			setTomorrowSortButton(false);
			setTasksArray(tasksList);
		}
	}

	return (
		<section className="tasks">
			<h2 className="tasks__title">Мои задачи</h2>
			<nav className="tasks__nav">
				<button
					className={
						todaySortButton
							? 'tasks__sort-button tasks__sort-button-active'
							: 'tasks__sort-button'
					}
					onClick={handleTodaySort}
				>
					Сегодня
				</button>
				<button
					className={
						tomorrowSortButton
							? 'tasks__sort-button tasks__sort-button-active'
							: 'tasks__sort-button'
					}
					onClick={handleTomorrowSort}
				>
					Завтра
				</button>
				<button
					className={
						sprintSortButton
							? 'tasks__sort-button tasks__sort-button-active'
							: 'tasks__sort-button'
					}
					onClick={handleSprintSort}
				>
					Текущий спринт
				</button>
				<button className="tasks__filter" onClick={showSortPopup}>
					<div className="tasks__filter-title">Фильтр</div>
					<img
						className="tasks__filter-img"
						src={iconFilter}
						alt="Изображение воронки"
					/>
				</button>
			</nav>
			{showPopup ? (
				<div className="tasks__sort-popup">
					<div className="tasks__popup-header">
						<h3 className="tasks__popup-title">Фильтр</h3>
						<button className="tasks__close-popup" onClick={hideSortPopup}>
							{}{' '}
						</button>
					</div>
					<ul className="tasks__popup-list">
						<li className="tasks__checkbox-item">
							<label className="tasks__checkbox" htmlFor="checkbox">
								<input
									type="checkbox"
									id="checkbox"
									className="tasks__checkbox-input"
									name="новая задача"
									checked={statusFilters['новая задача']}
									onChange={handleStatusFilterChange}
								/>
								<span className="tasks__checkbox-title">Новые</span>
							</label>
						</li>
						<li className="tasks__checkbox-item">
							<label className="tasks__checkbox" htmlFor="checkbox">
								<input
									type="checkbox"
									id="checkbox"
									className="tasks__checkbox-input"
									name="на выполнении"
									checked={statusFilters['на выполнении']}
									onChange={handleStatusFilterChange}
								/>
								<span className="tasks__checkbox-title">В работе</span>
							</label>
						</li>
						<li className="tasks__checkbox-item">
							<label className="tasks__checkbox" htmlFor="checkbox">
								<input
									type="checkbox"
									id="checkbox"
									className="tasks__checkbox-input"
									name="на подтверждении"
									checked={statusFilters['на подтверждении']}
									onChange={handleStatusFilterChange}
								/>
								<span className="tasks__checkbox-title">На подтверждении</span>
							</label>
						</li>
						<li className="tasks__checkbox-item">
							<label className="tasks__checkbox" htmlFor="checkbox">
								<input
									type="checkbox"
									id="checkbox"
									className="tasks__checkbox-input"
									name="истёк срок задачи"
									checked={statusFilters['истёк срок задачи']}
									onChange={handleStatusFilterChange}
								/>
								<span className="tasks__checkbox-title">Просроченные</span>
							</label>
						</li>
					</ul>
					<button className="tasks__popup-button" onClick={handleSortSubmit}>
						Применить
					</button>
				</div>
			) : null}
			<div className="tasks__list">
				{tasksArray.map((task) => (
					<MyTask task={task} key={task.id} />
				))}
			</div>
		</section>
	);
}
export default MyTasks;
