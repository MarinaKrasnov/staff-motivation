import './WorkExperience.scss';
import React from 'react';

function WorkExperience() {
	return (
		<section className="section">
			<h2 className="section__title">Рaбочий стаж</h2>
			<p className="section__text">Общий рабочий стаж: 5 лет 8 месяцев</p>
			<p className="section__text">Рабочий стаж в компании: 3 года 2 месяца</p>
			<h2 className="section__title">HardSkills</h2>
			<ul className="section__hardskills-list">
				<li className="section__hardskills-item">Python</li>
				<li className="section__hardskills-item">Django</li>
				<li className="section__hardskills-item">PostgreSQL</li>
				<li className="section__hardskills-item">MySQL</li>
				<li className="section__hardskills-item">Docker</li>
				<li className="section__hardskills-item">Swagger</li>
			</ul>
		</section>
	);
}

export default WorkExperience;
