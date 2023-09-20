import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Header.scss';
import photoProfile from '../../images/profile-photo.png';

function Header({ onLogout }) {
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
	});

	return (
		<header className="header">
			<div className="header__container">
				<div className="header__logo">Motivation System</div>
				<div className="header__user-info">
					<img
						className="header__photo"
						src={photoProfile}
						alt="Фотография сотрудника"
					/>
					<div className="header__details">
						<div className="header__name">Иванов Иван</div>
						<div className="header__position">Маркетолог</div>
					</div>
				</div>
				<div className="header__user-points">
					<div className="header__points-container">
						<div className="header__points">35 Б</div>
						<div className="header__points-text">за месяц</div>
					</div>
					<div className="header__points-container">
						<div className="header__points header__points_rating">485 Б</div>
						<div className="header__points-text header__points-text_rating">
							рейтинг
						</div>
					</div>
					<div className="header__points-container">
						<div className="header__points header__points_place">2</div>
						<div className="header__points-text header__points-text_place">
							в рейтинге
						</div>
					</div>
				</div>
				<div className="header__user-buttons">
					<button className="header__bell-btn" aria-label="Уведомления" />
					<button
						className="header__exit-btn"
						aria-label="Выход"
						onClick={onLogout}
					/>
				</div>
			</div>
		</header>
	);
}

export default Header;

Header.propTypes = {
	onLogout: PropTypes.func.isRequired,
};
