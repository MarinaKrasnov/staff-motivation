import './DepartmentTasks.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CaretDown from '../../../images/CaretDown.svg';
import CaretUp from '../../../images/CaretUp.svg';
import MyTask from '../../Main/MyTask/MyTask';

function DepartmentTasks({ name, isArray }) {
	const [isOpenTasksList, setOpenTasksList] = useState(false);

	function handleTasksOpen() {
		if (isOpenTasksList) {
			setOpenTasksList(false);
		}
		setOpenTasksList(true);
	}

	return (
		<ul className="teamlead-tasks__departments">
			<button className="tasks__filter" onClick={handleTasksOpen}>
				<div className="tasks__filter-title">{name}</div>
				<img
					className="tasks__filter-img"
					src={isOpenTasksList ? CaretDown : CaretUp}
					alt="значок сортировки"
				/>
			</button>
			{isOpenTasksList ? (
				<div className="tasks__list">
					{isArray.map((task) => (
						<MyTask task={task} key={task.id} />
					))}
				</div>
			) : null}
		</ul>
	);
}

export default DepartmentTasks;

DepartmentTasks.propTypes = {
	name: PropTypes.string.isRequired,
	isArray: PropTypes.string.isRequired,
};
