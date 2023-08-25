import './MyTask.scss';
import React from 'react';
import PropTypes from 'prop-types';

function MyTask({ task }) {
	// const {task} = props;
	const { name, status, data, button } = task;
	return (
		<div className="mytask">
			<div className="mytask__discription">
				<h3 className="mytask__title">{name}</h3>
				<p className="mytask__status">{status}</p>
			</div>
			<div className="mytask__datas">
				<div className="mytask__data">{data}</div>
				<button className="mytask__button">{button}</button>
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
	}).isRequired,
};
