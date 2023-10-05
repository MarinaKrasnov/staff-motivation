import './DepartmentTasks.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CaretDown from '../../../images/CaretDown.svg';
import CaretUp from '../../../images/CaretUp.svg';
import DepartmentTask from '../DepartmentTask/DepartmentTask';

function DepartmentTasks({ name, array, handlePopupOpen }) {
	const [isOpenTasksList, setOpenTasksList] = useState(false);

	function handleTasksOpen() {
		if (isOpenTasksList) {
			setOpenTasksList(false);
			return;
		}
		setOpenTasksList(true);
	}

	return (
		<ul className="department-tasks__departments">
			<button
				className={
					!isOpenTasksList
						? 'department-tasks__department'
						: 'department-tasks__department department-tasks__department-open'
				}
				onClick={handleTasksOpen}
			>
				<div className="department-tasks__department-title">{name}</div>
				<img
					className="department-tasks__department-caret"
					src={isOpenTasksList ? CaretUp : CaretDown}
					alt="стрелочка открыть/закрыть"
				/>
			</button>
			{isOpenTasksList ? (
				<>
					<button className="department-tasks__add-task">
						Добавить задачу
					</button>
					<div className="tasks__list">
						{array.map((task) => (
							<DepartmentTask
								onClick={handlePopupOpen}
								task={task}
								key={task.id}
							/>
						))}
					</div>
				</>
			) : null}
		</ul>
	);
}

export default DepartmentTasks;

DepartmentTasks.propTypes = {
	name: PropTypes.string.isRequired,
	array: PropTypes.node.isRequired,
	handlePopupOpen: PropTypes.func.isRequired,
};
