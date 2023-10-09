import './ProgressDiagram.scss';
import React from 'react';
// import diagram from '../../../images/profile/Loader 8.png';

function ProgressDiagram() {
	const progress = 47;
	const today = new Date();
	const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
	const formattedLastDayOfMonth = lastDayOfMonth.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});
	const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
	const formattedFirstDayOfMonth = firstDayOfMonth.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});

	return (
		<section className="section">
			<div className="section__header">
				<h2 className="section__title">Успехи за месяц</h2>
				<p className="section__data">
					{formattedFirstDayOfMonth}-{formattedLastDayOfMonth}
				</p>
			</div>
			<div className="section__diagram">
				<div className="section__diagram-progress">{progress} %</div>
				{/* <img
					className="section__diagram-image"
					src={diagram}
					alt="диаграмма достижений"
	/> */}
				<div className="section__diagram-caption">
					<p className="section__text">Заданий выполнено: 23</p>
					<p className="section__text">Осталось до выполнения плана: 27</p>
				</div>
			</div>
		</section>
	);
}

export default ProgressDiagram;
