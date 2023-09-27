import './Main.scss';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import SideNavbar from '../SideNavbar/SideNavbar';
import MyTasks from '../MyTasks/MyTasks';
import Achievements from '../Achievements/Achievements';
import ModalConfirm from '../ModalConfirm/ModalConfirm';
import DinamicWork from '../DinamicWork/DinamicWork';
import { getUsersProgress } from '../../utils/MainApi';

function Main() {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const [userProgressData, setUserProgressData] = useState([]);
	const { department_progress, personal_progress, progress_for_deadline } =
		userProgressData;
	const handleLogOut = () => setIsOpen(true);
	const handleClose = () => setIsOpen(false);

	useEffect(() => {
		getUsersProgress()
			.then((data) => {
				setUserProgressData(data[0]);
				console.log(data);
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
			<Header onLogout={handleLogOut} />
			<SideNavbar />
			<section className="main-page__section">
				<div className="main-page__block">
					<Achievements progressForDeadline={progress_for_deadline} />
					<DinamicWork
						myDinamic={personal_progress}
						departmentDinamic={department_progress}
					/>
				</div>
				<MyTasks />
				{isOpen && <ModalConfirm onClose={handleClose} />}
			</section>
		</main>
	);
}

export default Main;
