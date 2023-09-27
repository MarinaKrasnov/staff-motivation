import React, { useState, useEffect } from 'react';
import './Main.scss';
import Header from '../Header/Header';
import SideNavbar from '../SideNavbar/SideNavbar';
import MyTasks from '../MyTasks/MyTasks';
import Achievements from '../Achievements/Achievements';
import ModalConfirm from '../ModalConfirm/ModalConfirm';
import Notifications from '../Notifications/Notifications';
import DinamicWork from '../DinamicWork/DinamicWork';
import { getNotification } from '../../utils/MainApi';

function Main() {
	const [isOpenModalConfirm, setIsOpenModalconfirm] = useState(false);
	const [isOpenPushesModal, setIsPushesModal] = useState(false);
	const [notificationsData, setNotificationsData] = useState([]);

	const handleOpenModalConfirm = () => setIsOpenModalconfirm(true);
	const handleCloseModalConfirm = () => setIsOpenModalconfirm(false);
	const handleOpenPushesModal = () => setIsPushesModal(true);
	const handleClosePushesModal = () => setIsPushesModal(false);

	// useEffect(() => {
	// 	getNotification()
	// 		.then((data) => {
	// 			setNotificationsData(data);
	// 			console.log(data);
	// 		})
	// 		.catch((error) => {
	// 			console.log('Ошибка получения данных:', error);
	// 		});
	// }, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getNotification();
				setNotificationsData(data);
				console.log(data);
			} catch (error) {
				console.log('Ошибка получения данных:', error);
			}
		};

		fetchData();
	}, []);

	return (
		<main className="main-page">
			<Header
				handleOpenModalConfirm={handleOpenModalConfirm}
				handleOpenPushesModal={handleOpenPushesModal}
				notificationsData={notificationsData}
			/>
			<SideNavbar />
			<section className="main-page__section">
				<div className="main-page__block">
					<Achievements />
					<DinamicWork />
				</div>
				<MyTasks />
				{isOpenModalConfirm && (
					<ModalConfirm onClose={handleCloseModalConfirm} />
				)}
				{isOpenPushesModal && (
					<Notifications
						onClose={handleClosePushesModal}
						notificationsData={notificationsData}
					/>
				)}
			</section>
		</main>
	);
}

export default Main;
