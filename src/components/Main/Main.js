import './Main.scss';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import SideNavbar from '../SideNavbar/SideNavbar';
import MyTasks from '../MyTasks/MyTasks';
import Achievements from '../Achievements/Achievements';
import ModalConfirm from '../ModalConfirm/ModalConfirm';
import ModalUpload from '../ModalUpload/ModalUpload';
import Notifications from '../Notifications/Notifications';
import DinamicWork from '../DinamicWork/DinamicWork';
import {
	getNotification,
	getUsersProgress,
	getUserData,
} from '../../utils/MainApi';

function Main() {
	const navigate = useNavigate();
	// const [isOpen, setIsOpen] = useState(false);

	const [isOpenModalConfirm, setIsOpenModalconfirm] = useState(false);
	const [isOpenPushesModal, setIsPushesModal] = useState(false);
	const [isUploadModal, setIsUploadModal] = useState(false);
	const [notificationsData, setNotificationsData] = useState([]);

	const [userProgressData, setUserProgressData] = useState([]);
	const { department_progress, personal_progress, progress_for_deadline } =
		userProgressData;

	const [userData, setUserData] = useState({
		first_name: '',
		last_name: '',
		image: '',
		reward_points_for_current_month: '0',
		reward_points: '',
		rating: '',
	});

	const handleLogOut = () => {
		localStorage.clear();
		navigate('/signin');
	};

	const handleOpenModalConfirm = () => setIsOpenModalconfirm(true);
	const handleCloseModalConfirm = () => {
		setIsOpenModalconfirm(false);
		handleLogOut();
	};
	const handleOpenPushesModal = () => setIsPushesModal(true);
	const handleClosePushesModal = () => setIsPushesModal(false);
	const handleOpenUploadModal = () => setIsUploadModal(true);
	const handleCloseUploadModal = () => setIsUploadModal(false);

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

	useEffect(() => {
		getUserData()
			.then((data) => {
				if (data.length > 0) {
					setUserData(data[0]);
					console.log(data[0]);
				} else {
					console.log('Ответ сервера не содержит данных пользователя.');
				}
			})
			.catch((error) => {
				console.log('Ошибка получения данных:', error);
			});
	}, []);

	// const handleClose = () => setIsOpen(false); */

	return (
		<main className="main-page">
			<Header
				handleOpenModalConfirm={handleOpenModalConfirm}
				handleOpenPushesModal={handleOpenPushesModal}
				handleOpenUploadModal={handleOpenUploadModal}
				notificationsData={notificationsData}
				userData={userData}
				// onLogout={handleLogOut}
			/>
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
				{isOpenModalConfirm && (
					<ModalConfirm onClose={handleCloseModalConfirm} />
				)}
				{isOpenPushesModal && (
					<Notifications
						onClose={handleClosePushesModal}
						notificationsData={notificationsData}
					/>
				)}
				{isUploadModal && <ModalUpload onClose={handleCloseUploadModal} />}
			</section>
		</main>
	);
}

export default Main;
