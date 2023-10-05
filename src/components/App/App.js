import './App.scss';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ResetPassword from '../ResetPassword/ResetPassword';
import NewPassword from '../NewPassword/NewPassword';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import ServerError from '../ServerError/ServerError';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from './Header/Header';
import SideNavbar from './SideNavbar/SideNavbar';
import ModalConfirm from './ModalConfirm/ModalConfirm';
import ModalUpload from './ModalUpload/ModalUpload';
import Notifications from './Header/Notifications/Notifications';
import Teamleader from '../Teamleader/TeamleadTasks/TeamleadTasks';
import { getUserData, getNotification } from '../../utils/MainApi';

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isOpenModalConfirm, setIsOpenModalconfirm] = useState(false);
	const [isOpenPushesModal, setIsPushesModal] = useState(false);
	const [isUploadModal, setIsUploadModal] = useState(false);
	const [notificationsData, setNotificationsData] = useState([]);

	const navigate = useNavigate();

	const token = localStorage.getItem('token');

	const [userData, setUserData] = useState({
		first_name: '',
		last_name: '',
		image: '',
		reward_points_for_current_month: '0',
		reward_points: '',
		rating: '',
	});

	useEffect(() => {
		if (loggedIn) {
			getUserData()
				.then((data) => {
					if (data.length > 0) {
						setUserData(data[0]);
					} else {
						console.log('Ответ сервера не содержит данных пользователя.');
					}
				})
				.catch((res) => {
					if (res === 500) {
						navigate('/server-error');
					}
					console.log(res);
				});
		}
	}, [navigate, loggedIn]);

	const handleLogOut = () => {
		setLoggedIn(false);
		setIsOpenModalconfirm(false);
		localStorage.clear();
		navigate('/signin');
	};

	const handleOpenModalConfirm = () => setIsOpenModalconfirm(true);
	const handleCloseModalConfirm = () => {
		setIsOpenModalconfirm(false);
	};
	const handleOpenPushesModal = () => setIsPushesModal(true);
	const handleClosePushesModal = () => setIsPushesModal(false);
	const handleOpenUploadModal = () => setIsUploadModal(true);
	const handleCloseUploadModal = () => setIsUploadModal(false);

	useEffect(() => {
		if (token) {
			setLoggedIn(!!token);
		}
	}, [token]);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 50);
	}, []);

	useEffect(() => {
		if (loggedIn) {
			const fetchData = async () => {
				try {
					const data = await getNotification();
					setNotificationsData(data);
				} catch (res) {
					if (res === 500) {
						navigate('/server-error');
					}
					console.log(res);
				}
			};
			fetchData();
		}
	}, [navigate, loggedIn]);

	return (
		<div className="App">
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedRoute
							loggedIn={loggedIn}
							isLoading={isLoading}
							key={loggedIn}
						>
							<Header
								handleOpenModalConfirm={handleOpenModalConfirm}
								handleOpenPushesModal={handleOpenPushesModal}
								handleOpenUploadModal={handleOpenUploadModal}
								notificationsData={notificationsData}
								userData={userData}
								onExit={handleLogOut}
							/>
							<SideNavbar />
							<Main />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/profile"
					element={
						<ProtectedRoute
							loggedIn={loggedIn}
							isLoading={isLoading}
							key={loggedIn}
						>
							<Header
								handleOpenModalConfirm={handleOpenModalConfirm}
								handleOpenPushesModal={handleOpenPushesModal}
								handleOpenUploadModal={handleOpenUploadModal}
								notificationsData={notificationsData}
								userData={userData}
								onExit={handleLogOut}
							/>
							<SideNavbar />
							<Profile />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/teamleader"
					element={
						<ProtectedRoute
							loggedIn={loggedIn}
							isLoading={isLoading}
							key={loggedIn}
						>
							<Header
								handleOpenModalConfirm={handleOpenModalConfirm}
								handleOpenPushesModal={handleOpenPushesModal}
								handleOpenUploadModal={handleOpenUploadModal}
								notificationsData={notificationsData}
								userData={userData}
								onExit={handleLogOut}
							/>
							<SideNavbar />
							<Teamleader />
						</ProtectedRoute>
					}
				/>
				<Route path="/signup" element={<Register />} />
				<Route path="/new-password" element={<NewPassword />} />
				<Route path="/signin" element={<Login setLoggedIn={setLoggedIn} />} />
				<Route path="/reset-password" element={<ResetPassword />} />
				<Route path="/server-error" element={<ServerError />} />
				{/* роут для ошибки 404 */}
			</Routes>
			{isOpenModalConfirm && (
				<ModalConfirm onClose={handleCloseModalConfirm} onExit={handleLogOut} />
			)}
			{isOpenPushesModal && (
				<Notifications
					onClose={handleClosePushesModal}
					notificationsData={notificationsData}
				/>
			)}
			{isUploadModal && <ModalUpload onClose={handleCloseUploadModal} />}
		</div>
	);
}

export default App;

/* const [isCheckboxPressed, setCheckboxPressed] = useState(false)
 function removeToken() {
	if(!isCheckboxPressed){
	localStorage.removeItem('token');
  }
}
  window.addEventListener('unload', removeToken) */
