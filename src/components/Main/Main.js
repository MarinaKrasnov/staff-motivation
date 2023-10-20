import './Main.scss';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyTasks from './MyTasks/MyTasks';
import Achievements from './Achievements/Achievements';
import DinamicWork from './DinamicWork/DinamicWork';
import { getUsersProgress } from '../../utils/MainApi';

function Main({ taskArray }) {
	const navigate = useNavigate();
	const [userProgressData, setUserProgressData] = useState([]);

	const { department_progress, personal_progress, progress_for_deadline } =
		userProgressData;

	const tasksToTeamlead = taskArray.filter((task) => task.assigned_to === 27);

	useEffect(() => {
		getUsersProgress()
			.then((data) => {
				setUserProgressData(data[0]);
			})
			.catch((res) => {
				if (res === 500) {
					navigate('/server-error');
				}
				console.log(res);
			});
	}, [navigate]);

	return (
		<section className="main-page__section">
			<div className="main-page__block">
				<Achievements progressForDeadline={progress_for_deadline} />
				<DinamicWork
					myDinamic={personal_progress}
					departmentDinamic={department_progress}
				/>
			</div>
			<MyTasks tasksToTeamlead={tasksToTeamlead} />
		</section>
	);
}

export default Main;

Main.propTypes = {
	taskArray: PropTypes.arrayOf(
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
	).isRequired,
};
