import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ResetPassword from '../ResetPassword/ResetPassword';
import NewPassword from '../NewPassword/NewPassword';
import Modal from '../Modal/Modal';
import ModalMessage from '../ModalMessage/ModalMessage';
import Main from '../Main/Main'; // Егор - добавил компонент для сборки главной страницы

function App() {
	/* проверка токена будет производиться сразу после загрузки приложения
	useEffect(() => {
		const jwt = localStorage.getItem('jwt');
		if (jwt) {
		  checkToken(jwt)
			.then((res) => {
			  if (res) {
				setLoggedIn(true);
			  }
			  console.log('token is OK')
			}).catch((res) => {
			  setIsPopupErrorOpen(true)
			  setPopupError('При проверке токена произошла ошибка')
			  console.log('token is not OK ', res)
			})
		}
	  }, [loggedIn]) */

	return (
		<div className="App">
			<Routes>
				<Route path="/main" element={<Main />} />
				{/* модальное окно открывается при успешном изменении пароля */}
				<Route path="/modal" element={<Modal />} />
				<Route path="/signup" element={<Register />} />
				<Route path="/new-password" element={<NewPassword />} />
				<Route path="/signin" element={<Login />} />
				{/* уведомление об отправке ссылки для создания нового пароля на почту */}
				<Route path="/message" element={<ModalMessage />} />
				<Route path="/reset-password" element={<ResetPassword />} />
			</Routes>
		</div>
	);
}

export default App;
