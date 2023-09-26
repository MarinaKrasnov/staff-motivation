import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes /* useLocation, useNavigate */ } from 'react-router-dom';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ResetPassword from '../ResetPassword/ResetPassword';
import NewPassword from '../NewPassword/NewPassword';
import Main from '../Main/Main';
import ServerError from '../ServerError/ServerError';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	// const [isCheckboxPressed, setCheckboxPressed] = useState(false)

	/* function removeToken() {
		if(!isCheckboxPressed){
		localStorage.removeItem('token');
	  }
	}
	  window.addEventListener('unload', removeToken) */

	const token = localStorage.getItem('token');

	useEffect(() => {
		if (token) {
			setLoggedIn(!!token);
		}
	}, [loggedIn, token, isLoading]);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 50);
	}, []);

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
				<Route
					path="/main"
					element={
						<ProtectedRoute
							component={Main}
							loggedIn={loggedIn}
							isLoading={isLoading}
							key={loggedIn}
						/>
					}
				/>
				{/* роут для страницы профиля */}
				<Route path="/signup" element={<Register />} />
				<Route path="/new-password" element={<NewPassword />} />
				<Route path="/signin" element={<Login />} />
				<Route path="/reset-password" element={<ResetPassword />} />
				<Route path="/server-error" element={<ServerError />} />
				{/* роут для ошибки 404 */}
			</Routes>
		</div>
	);
}

export default App;
