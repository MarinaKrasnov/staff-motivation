import './TrackRecord.scss';
import React from 'react';
import master from '../../images/profile/image 25.jpg';

function TrackRecord() {
	return (
		<section className="trackRecord">
			<h2 className="tasks__title">Мои задачи</h2>
			<nav className="tasks__nav">
				<button className="tasks__sort-button tasks__sort-button-active">
					Все
				</button>
				<button className="tasks__sort-button">Активные</button>
				<button className="tasks__sort-button">Выполненные</button>
			</nav>
			<ul className="trackrecord__items">
				<li className="trackrecord__item">
					<img className="trackrecord__image" src={master} alt="на русском" />
					<div className="trackrecord__info">
						<p className="trackrecord__title">Мастер своего дела</p>
						<div className="trackrecord__progress">
							<p className="trackrecord__subtitle">Middle</p>
							<p className="trackrecord__procent">100%</p>
						</div>
						<div className="trackrecord__diagram">{}</div>
					</div>
				</li>
			</ul>
		</section>
	);
}

export default TrackRecord;
