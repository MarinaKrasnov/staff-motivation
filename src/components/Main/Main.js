import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.scss';
import Header from '../Header/Header'; // Егор -- верхнее меню
import SideNavbar from '../SideNavbar/SideNavbar'; // Егор -- боковое меню
import MyTasks from '../MyTasks/MyTasks';
import Achievements from '../Achievements/Achievements';
import ModalConfirm from '../ModalConfirm/ModalConfirm'; // Егор - модальное окно подтверждения выхода
import DinamicWork from '../DinamicWork/DinamicWork';

function Main() {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	const handleLogOut = () => {
		setIsOpen(true);
		localStorage.clear();
		navigate('/signin');
	};
	const handleClose = () => setIsOpen(false);

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
