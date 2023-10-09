import './WorkExperience.scss';
import React from 'react';

function WorkExperience() {
	const skills = [
		'Python',
		'Django',
		'PostgreSQL',
		'MySQL',
		'Docker',
		'Swagger',
	];
	return (
		<section className="section">
			<h2 className="section__title">Рaбочий стаж</h2>
			<p className="section__text">Общий рабочий стаж: 5 лет 8 месяцев</p>
			<p className="section__text">Рабочий стаж в компании: 3 года 2 месяца</p>
			<h2 className="section__title">HardSkills</h2>
			<ul className="section__hardskills-list">
				{skills.map((skill) => (
					<li className="section__hardskills-item" key={skill}>
						{skill}
					</li>
				))}
			</ul>
		</section>
	);
}

export default WorkExperience;
