import './Profile.scss';
import React from 'react';
import PersonalData from './PersonalData/PersonalData';
import WorkExperience from './WorkExperience/WorkExperience';
import TrackRecordDiagram from './TrackRecordDiagram/TrackRecordDiagram';
import TrackRecord from './TrackRecord/TrackRecord';

function Profile() {
	return (
		<main className="main-page">
			<section className="main-page__section">
				<div className="profile">
					<div className="profile__data">
						<PersonalData />
						<div className="profile__sections">
							<WorkExperience />
							<TrackRecordDiagram />
						</div>
					</div>
					<TrackRecord />
				</div>
			</section>
		</main>
	);
}

export default Profile;
