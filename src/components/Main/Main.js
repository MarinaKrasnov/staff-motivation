import React, { useState, useEffect } from 'react';
import './Main.scss';
import Header from '../Header/Header'; // Егор -- верхнее меню
import SideNavbar from '../SideNavbar/SideNavbar'; // Егор -- боковое меню
import MyTasks from '../MyTasks/MyTasks';
import Achievements from '../Achievements/Achievements';
import ModalConfirm from '../ModalConfirm/ModalConfirm'; // Егор - модальное окно подтверждения выхода
import DinamicWork from '../DinamicWork/DinamicWork';
import { getUsersProgress } from '../../utils/MainApi';

function Main() {
	const [isOpen, setIsOpen] = useState(false);
	const [userProgressData, setUserProgressData] = useState([]);

	const handleLogOut = () => setIsOpen(true);
	const handleClose = () => setIsOpen(false);

	console.log(userProgressData);

	useEffect(() => {
		getUsersProgress()
			.then((data) => {
				setUserProgressData(data);
			})
			.catch((err) => {
				console.log(err);
			});
	});

	return (
		<main className="main-page">
			{/* Егор - верхнее меню и левое боковое меню (начало кода) */}
			<Header onLogout={handleLogOut} />
			<SideNavbar />
			{/* Егор - верхнее меню и левое боковое меню (конец кода) */}
			<section className="main-page__section">
				<div className="main-page__block">
					<Achievements />
					<DinamicWork />
				</div>
				<MyTasks />
				{isOpen && <ModalConfirm onClose={handleClose} />}
			</section>
		</main>
	);
}

export default Main;
