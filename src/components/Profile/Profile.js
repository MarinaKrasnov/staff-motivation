import './Profile.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsersInfo } from '../../utils/MainApi';
import PersonalData from './PersonalData/PersonalData';
import WorkExperience from './WorkExperience/WorkExperience';
import ProgressDiagram from './ProgressDiagram/ProgressDiagram';
import TrackRecord from './TrackRecord/TrackRecord';

function Profile() {
	const navigate = useNavigate();

	const [personalData, setPersonalData] = useState([]);
	const [contacts, setContacts] = useState([]);
	const [hardSkills, setHardSkills] = useState([]);

	useEffect(() => {
		getUsersInfo()
			.then((data) => {
				setContacts(data.contacts);
				setPersonalData(data);
				setHardSkills(data.hardskills);
			})
			.catch((res) => {
				if (res === 500) {
					navigate('/server-error');
				}
				console.log(res);
			});
	}, [navigate]);

	return (
		<main className="main-page">
			<section className="main-page__section">
				<div className="profile">
					<div className="profile__data">
						<PersonalData personalData={personalData} contacts={contacts} />
						<div className="profile__sections">
							<WorkExperience hardSkills={hardSkills} />
							<ProgressDiagram />
						</div>
					</div>
					<TrackRecord />
				</div>
			</section>
		</main>
	);
}

export default Profile;
