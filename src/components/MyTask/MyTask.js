import './MyTask.scss';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function MyTask({ task }) {
	const { name, status, data, button, balls } = task;
	const [disadledButton, setDisadledButton] = useState(false);
	const [titleClassName, setTitleClassName] = useState('mytask__title');
	const [statusClassName, setStatusClassName] = useState('mytask__status');
	const [ballsClassName, setBallsClassName] = useState('mytask__score');
	useEffect(() => {
		if (data === 'Выполнено') {
			setDisadledButton(true);
			setTitleClassName('mytask__title mytask__title-done');
		}
	}, [data]);

	useEffect(() => {
		if (status === 'истёк срок задачи') {
			setTitleClassName('mytask__title mytask__title-missed');
			setStatusClassName('mytask__status mytask__status-missed');
			setBallsClassName('mytask__score mytask__score-missed');
		}
	}, [status]);

	useEffect(() => {
		if (status === 'подтверждено') {
			setStatusClassName('mytask__status mytask__status-prove');
			setBallsClassName('mytask__score mytask__score-done');
		}
	}, [status]);

	return (
		<div className="mytask">
			<div className="mytask__discription">
				<h3 className={titleClassName}>{name}</h3>
				<p className={ballsClassName}>{balls}</p>
				<p className={statusClassName}>{status}</p>
			</div>
			<div className="mytask__datas">
				<div className="mytask__data">{data}</div>
				<button className="mytask__button" disabled={disadledButton}>
					{button}
				</button>
			</div>
		</div>
	);
}
export default MyTask;

MyTask.propTypes = {
	task: PropTypes.shape({
		name: PropTypes.string,
		status: PropTypes.string,
		data: PropTypes.string,
		button: PropTypes.string,
		balls: PropTypes.string,
	}).isRequired,
};
