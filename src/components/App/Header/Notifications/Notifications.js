import './Notifications.scss';
import { React, useEffect } from 'react';
import PropTypes from 'prop-types';

function Notifications({ onClose, notificationsData }) {
	const pushesCount = notificationsData.length;

	const handleEscClose = (event) => {
		if (event.key === 'Escape') {
			onClose();
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleEscClose);
		return () => {
			window.removeEventListener('keydown', handleEscClose);
		};
	});

	function formatDate(dateString) {
		const dateObject = new Date(dateString);
		const day = dateObject.getDate();
		const month = dateObject.getMonth() + 1;
		const year = dateObject.getFullYear();
		const formattedDay = day < 10 ? `0${day}` : day;
		const formattedMonth = month < 10 ? `0${month}` : month;
		return `${formattedDay}.${formattedMonth}.${year}`;
	}

	return (
		<div className="notifications" onClick={onClose} aria-hidden="true">
			<div
				className="notifications__container"
				aria-hidden="true"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="notifications__pointer" />
				<h1 className="notifications__title">Уведомления</h1>
				<div className="notifications__tasks-container">
					{pushesCount === 0 ? (
						<div className="notifications__task">
							<p className="notifications__task-status">
								У Вас нет уведомлений
							</p>
						</div>
					) : (
						<>
							{notificationsData.map((notification) => (
								<div className="notifications__task" key={notification.id}>
									<p className="notifications__data">
										{formatDate(notification.created_at)}
									</p>
									<p className="notifications__task-status">
										{notification.message}
									</p>
								</div>
							))}
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default Notifications;

Notifications.propTypes = {
	onClose: PropTypes.func.isRequired,
	notificationsData: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			message: PropTypes.string.isRequired,
			created_at: PropTypes.string.isRequired,
			read: PropTypes.bool.isRequired,
			user: PropTypes.number.isRequired,
		})
	).isRequired,
};
