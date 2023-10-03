import './TrackRecord.scss';
import React from 'react';
import master from '../../../images/profile/image 25.jpg';
import hands from '../../../images/profile/image 26.jpg';
import darts from '../../../images/profile/Image.jpg';
import rocket from '../../../images/profile/image 32.svg';
import list from '../../../images/profile/image 31.jpg';
import arrow from '../../../images/profile/image 30.jpg';

function TrackRecord() {
	return (
		<section className="trackrecord">
			<h2 className="trackrecord__main-title">Задания</h2>
			<nav className="trackrecord__nav">
				<button className="tasks__sort-button tasks__sort-button-active">
					Все
				</button>
				<button className="tasks__sort-button">Активные</button>
				<button className="tasks__sort-button">Выполненные</button>
			</nav>
			<ul className="trackrecord__items">
				<li className="trackrecord__item">
					<img
						className="trackrecord__image"
						src={master}
						alt="символическое изображение задания"
					/>
					<div className="trackrecord__info">
						<p className="trackrecord__title">Мастер своего дела</p>
						<div className="trackrecord__progress">
							<p className="trackrecord__subtitle">Получить уровень Middle</p>
							<p className="trackrecord__procent">100%</p>
						</div>
						<div className="trackrecord__diagram">{}</div>
					</div>
				</li>

				<li className="trackrecord__item">
					<img
						className="trackrecord__image"
						src={hands}
						alt="символическое изображение задания"
					/>
					<div className="trackrecord__info">
						<p className="trackrecord__title">Git Гуру</p>
						<div className="trackrecord__progress">
							<p className="trackrecord__subtitle">Сделать 100 коммитов</p>
							<p className="trackrecord__procent trackrecord__procent">100%</p>
						</div>
						<div className="trackrecord__diagram">{}</div>
					</div>
				</li>

				<li className="trackrecord__item">
					<img
						className="trackrecord__image"
						src={darts}
						alt="символическое изображение задания"
					/>
					<div className="trackrecord__info">
						<p className="trackrecord__title">Прямо в цель</p>
						<div className="trackrecord__progress">
							<p className="trackrecord__subtitle">Запустить 6 проектов</p>
							<p className="trackrecord__procent">100%</p>
						</div>
						<div className="trackrecord__diagram">{}</div>
					</div>
				</li>

				<li className="trackrecord__item">
					<img
						className="trackrecord__image"
						src={rocket}
						alt="символическое изображение задания"
					/>
					<div className="trackrecord__info">
						<p className="trackrecord__title">Просто космос</p>
						<div className="trackrecord__progress">
							<p className="trackrecord__subtitle">Получить новый Hard Skill</p>
							<p className="trackrecord__procent">100%</p>
						</div>
						<div className="trackrecord__diagram">{}</div>
					</div>
				</li>

				<li className="trackrecord__item">
					<img
						className="trackrecord__image"
						src={list}
						alt="символическое изображение задания"
					/>
					<div className="trackrecord__info">
						<p className="trackrecord__title">Как Лев Толстой</p>
						<div className="trackrecord__progress">
							<p className="trackrecord__subtitle">
								Написать 2 статьи для сайта
							</p>
							<p className="trackrecord__procent">100%</p>
						</div>
						<div className="trackrecord__diagram">{}</div>
					</div>
				</li>

				<li className="trackrecord__item">
					<img
						className="trackrecord__image"
						src={arrow}
						alt="символическое изображение задания"
					/>
					<div className="trackrecord__info">
						<p className="trackrecord__title">Социальная сеть</p>
						<div className="trackrecord__progress">
							<p className="trackrecord__subtitle">
								Найти 5 новых друзей в сфере IT
							</p>
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
