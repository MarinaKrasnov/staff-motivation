import './Profile.scss';
import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import SideNavbar from '../SideNavbar/SideNavbar';
import ModalConfirm from '../ModalConfirm/ModalConfirm';
import ModalUpload from '../ModalUpload/ModalUpload';
import Notifications from '../Notifications/Notifications';
import PersonalData from '../PersonalData/PersonalData';
import { getNotification } from '../../utils/MainApi';

function Profile() {
	// const navigate = useNavigate();
	// const [isOpen, setIsOpen] = useState(false);

	const [isOpenModalConfirm, setIsOpenModalconfirm] = useState(false);
	const [isOpenPushesModal, setIsPushesModal] = useState(false);
	const [isUploadModal, setIsUploadModal] = useState(false);
	const [notificationsData, setNotificationsData] = useState([]);

	const handleOpenModalConfirm = () => setIsOpenModalconfirm(true);
	const handleCloseModalConfirm = () => setIsOpenModalconfirm(false);
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

	/* const handleLogOut = () => {
		setIsOpen(true);
		localStorage.clear();
		navigate('/signin');
	};
	const handleClose = () => setIsOpen(false); */

	return (
		<main className="main-page">
			<Header
				handleOpenModalConfirm={handleOpenModalConfirm}
				handleOpenPushesModal={handleOpenPushesModal}
				handleOpenUploadModal={handleOpenUploadModal}
				notificationsData={notificationsData}
				// onLogout={handleLogOut}
			/>
			<SideNavbar />
			<section className="main-page__section">
				<PersonalData />
			</section>
			{isOpenModalConfirm && <ModalConfirm onClose={handleCloseModalConfirm} />}
			{isOpenPushesModal && (
				<Notifications
					onClose={handleClosePushesModal}
					notificationsData={notificationsData}
				/>
			)}
			{isUploadModal && <ModalUpload onClose={handleCloseUploadModal} />}
		</main>
	);
}

export default Profile;
