import './TrackRecordDiagram.scss';
import React from 'react';
import diagram from '../../../images/profile/Loader 8.png';

function TrackRecordDiagram() {
	return (
		<section className="section">
			<div className="section__header">
				<h2 className="section__title">Успехи за месяц</h2>
				<p className="section__data">01.09.2023-30.09.2023</p>
			</div>
			<div className="section__diagram">
				<img
					className="section__diagram-image"
					src={diagram}
					alt="диаграмма достижений"
				/>
				<div className="section__diagram-caption">
					<p className="section__text">Заданий выполнено: 23</p>
					<p className="section__text">Осталось до выполнения плана: 27</p>
				</div>
			</div>
		</section>
	);
}

export default TrackRecordDiagram;
