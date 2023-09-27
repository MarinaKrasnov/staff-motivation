import './Achievements.scss';
import React from 'react';
import achieveLogo from '../../images/achieve-mark.svg';

export default function Achievements() {
	const score = 30; // временно
	const completion = 75; // временно
	return (
		<section className="achievements">
			<h2 className="achievements__title">Достижения</h2>
			<ul className="achievements__stats-container">
				<li className="achievements__achieve">
					<p className="achievements__name">Качество работы</p>
					<div className="achievements__score-container">
						<img
							className="achievements__logo"
							src={achieveLogo}
							alt="достижение"
						/>
						<p className="achievements__score">{`+${score} Б`}</p>
					</div>
					<p className="achievements__completion">По итогам спринта</p>
				</li>

				<li className="achievements__achieve">
					<p className="achievements__name">Соблюдение дедлайна</p>
					<div className="achievements__score-container">
						<p className="achievements__score">{`+${score} Б`}</p>
					</div>
					<p className="achievements__completion">{`Выполнено на: ${completion}%`}</p>
				</li>
			</ul>
		</section>
	);
}
