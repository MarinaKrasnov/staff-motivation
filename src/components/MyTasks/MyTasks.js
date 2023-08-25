import './MyTasks.scss';
import React, { useState } from 'react';
import MyTask from '../MyTask/MyTask';
import { tasksList } from '../../utils/constants';
import iconFilter from '../../images/filter-Funnel.svg';

function MyTasks() {
	const [tasksArray, setTasksArray] = useState(tasksList);
	const todayDate = new Date().toLocaleDateString();
	const tomorrowDate = new Date(
		new Date().getTime() + 24 * 60 * 60 * 1000
	).toLocaleDateString();

	const todaySortButton = document.getElementById('today-sort-button');
	const tomorrowSortButton = document.getElementById('tomorrow-sort-button');
	const sprintSortButton = document.getElementById('sprint-sort-button');

	function showSortPopup() {
		document
			.querySelector('.tasks__sort-popup')
			.classList.add('tasks__show-popup');
	}
	function hideSortPopup() {
		document
			.querySelector('.tasks__sort-popup')
			.classList.remove('tasks__show-popup');
	}

	function handleTodaySort() {
		if (todaySortButton.classList.contains('tasks__sort-button-active')) {
			todaySortButton.classList.remove('tasks__sort-button-active');
			setTasksArray(tasksList);
		} else {
			sprintSortButton.classList.remove('tasks__sort-button-active');
			tomorrowSortButton.classList.remove('tasks__sort-button-active');
			todaySortButton.classList.add('tasks__sort-button-active');
			const filteredTasks = tasksList.filter(
				(task) => task.sortData === todayDate
			);
			setTasksArray(filteredTasks);
		}
	}

	function handleTomorrowSort() {
		if (tomorrowSortButton.classList.contains('tasks__sort-button-active')) {
			tomorrowSortButton.classList.remove('tasks__sort-button-active');
			setTasksArray(tasksList);
		} else {
			sprintSortButton.classList.remove('tasks__sort-button-active');
			todaySortButton.classList.remove('tasks__sort-button-active');
			tomorrowSortButton.classList.add('tasks__sort-button-active');
			const filteredTasks = tasksList.filter(
				(task) => task.sortData === tomorrowDate
			);
			setTasksArray(filteredTasks);
		}
	}

	function handleSprintSort() {
		if (sprintSortButton.classList.contains('tasks__sort-button-active')) {
			sprintSortButton.classList.remove('tasks__sort-button-active');
		} else {
			tomorrowSortButton.classList.remove('tasks__sort-button-active');
			todaySortButton.classList.remove('tasks__sort-button-active');
			sprintSortButton.classList.add('tasks__sort-button-active');
			setTasksArray(tasksList);
		}
	}

	return (
		<section className="tasks">
			<h2 className="tasks__title">Мои задачи</h2>
			<nav className="tasks__nav">
				<button
					id="today-sort-button"
					className="tasks__sort-button"
					onClick={handleTodaySort}
				>
					Сегодня
				</button>
				<button
					id="tomorrow-sort-button"
					className="tasks__sort-button"
					onClick={handleTomorrowSort}
				>
					Завтра
				</button>
				<button
					id="sprint-sort-button"
					className="tasks__sort-button"
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
			<div className="tasks__sort-popup">
				<div className="tasks__popup-header">
					<h3 className="tasks__popup-title">Фильтр</h3>
					<button className="tasks__close-popup" onClick={hideSortPopup}>
						{}
					</button>
				</div>
				<ul className="tasks__popup-list">
					<li className="tasks__checkbox-item">
						<label className="tasks__checkbox" htmlFor="checkbox">
							<input
								type="checkbox"
								id="checkbox"
								className="tasks__checkbox-input"
							/>
							<span className="tasks__checkbox-title">Новые задачи</span>
						</label>
					</li>
					<li className="tasks__checkbox-item">
						<label className="tasks__checkbox" htmlFor="checkbox">
							<input
								type="checkbox"
								id="checkbox"
								className="tasks__checkbox-input"
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
							/>
							<span className="tasks__checkbox-title">Просроченные</span>
						</label>
					</li>
				</ul>
				<button className="tasks__popup-button">Применить</button>
			</div>
			<div className="tasks__list">
				{tasksArray.map((task) => (
					<MyTask task={task} key={task.id} />
				))}
			</div>
		</section>
	);
}
export default MyTasks;
