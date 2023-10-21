import './Main.scss';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import MyTasks from './MyTasks/MyTasks';
import Achievements from './Achievements/Achievements';
import DinamicWork from './DinamicWork/DinamicWork';
import { getUsersProgress } from '../../utils/MainApi';

function Main({ tasksArray }) {
	const navigate = useNavigate();
	const [userProgressData, setUserProgressData] = useState([]);

	const { department_progress, personal_progress, progress_for_deadline } =
		userProgressData;

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
			<MyTasks tasksArrayData={tasksArray} />
		</section>
	);
}

export default Main;

Main.propTypes = {
	tasksArray: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string,
			status: PropTypes.string,
			reward_points: PropTypes.number,
			deadline: PropTypes.string,
			id: PropTypes.number,
		})
	).isRequired,
};
