import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Header.scss';
import photoProfile from '../../images/plug.svg';
import { getUserData } from '../../utils/MainApi';

function Header({
	notificationsData,
	handleOpenModalConfirm,
	handleOpenPushesModal,
	// handleOpenUploadModal, // временное решение
}) {
	const [userData, setUserData] = useState({
		first_name: '',
		last_name: '',
		image: '',
		reward_points_for_current_month: '0',
		reward_points: '',
		rating: '',
	});
	// const [pushes, setPushes] = useState([]);
	const pushesCount = notificationsData.length;

	const firstNameInitial = userData.first_name
		? userData.first_name.charAt(0).toUpperCase()
		: '';
	const lastNameInitial = userData.last_name
		? userData.last_name.charAt(0).toUpperCase()
		: '';
	const initials = `${firstNameInitial}${lastNameInitial}`;
	const fullName = `${userData.first_name} ${userData.last_name}`;

	// анимация тени хедера при скролле
	useEffect(() => {
		const headerContainer = document.querySelector('.header');
		window.addEventListener('scroll', () => {
			if (window.scrollY >= 25) {
				headerContainer.classList.add('header_scrolling');
			} else {
				headerContainer.classList.remove('header_scrolling');
			}
		});
	}, []);

	useEffect(() => {
		getUserData()
			.then((data) => {
				if (data.length > 0) {
					setUserData(data[0]);
					console.log(data[0]);
				} else {
					console.log('Ответ сервера не содержит данных пользователя.');
				}
			})
			.catch((error) => {
				console.log('Ошибка получения данных:', error);
			});
	}, []);

	return (
		<header className="header">
			{/* //временная кнопка открытия модального окна */}
			{/* <button className='button-photo' onClick={handleOpenUploadModal}>Upload</button> */}
			<div className="header__container">
				<div className="header__logo">Motivation System</div>
				<div className="header__user-info">
					{userData.image === null ? (
						<div className="header__plug">{initials}</div>
					) : (
						<img
							className="header__photo"
							src={userData.photo || photoProfile}
							alt="Фотография сотрудника"
						/>
					)}
					<div className="header__details">
						<div className="header__name">{fullName}</div>
						<div className="header__position">{userData.department}</div>
					</div>
				</div>
				<div className="header__user-points">
					<div className="header__points-container">
						<div className="header__points">{`${userData.reward_points_for_current_month} Б`}</div>
						<div className="header__points-text">за месяц</div>
					</div>
					{userData.reward_points_for_current_month > 0 ? (
						<>
							<div className="header__points-container">
								<div className="header__points header__points_rating">{`${userData.reward_points} Б`}</div>
								<div className="header__points-text header__points-text_rating">
									рейтинг
								</div>
							</div>
							<div className="header__points-container">
								<div className="header__points header__points_place">{`${userData.rating}-й`}</div>
								<div className="header__points-text header__points-text_place">
									в рейтинге
								</div>
							</div>
						</>
					) : null}
				</div>
				<div className="header__user-buttons">
					<div className="header__bell-container">
						<button
							className="header__bell-btn"
							aria-label="Уведомления"
							onClick={handleOpenPushesModal}
						/>
						{pushesCount > 0 ? (
							<div className="header__push-number">{pushesCount}</div>
						) : null}
					</div>
					<button
						className="header__exit-btn"
						aria-label="Выход"
						onClick={handleOpenModalConfirm}
					/>
				</div>
			</div>
		</header>
	);
}

export default Header;

Header.propTypes = {
	handleOpenModalConfirm: PropTypes.func.isRequired,
	handleOpenPushesModal: PropTypes.func.isRequired,
	// handleOpenUploadModal: PropTypes.func.isRequired,
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
