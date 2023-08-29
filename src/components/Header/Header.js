import './Header.scss';
import photoProfile from '../../images/profile-photo.png';

function Header() {
	return (
		<header className="header">
			<div className="header__container">
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
						<div className="header__points-text">за спринт</div>
					</div>
					<div className="header__points-container">
						<div className="header__points header__points_rating">485 Б</div>
						<div className="header__points-text header__points-text_rating">
							рейтинг
						</div>
					</div>
				</div>
				<div className="header__vertical-line" />
				<div className="header__points-container">
					<div className="header__points header__points_place">2</div>
					<div className="header__points-text header__points-text_place">
						место в рейтинге
					</div>
				</div>
				<div className="header__user-buttons">
					<button className="header__bell-btn" aria-label="Уведомления" />
					<button className="header__exit-btn" aria-label="Выход" />
				</div>
			</div>
		</header>
	);
}

export default Header;
