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
	const [currentUser, setCurrentUser] = useState({
		name: '',
		email: '',
		id: '',
	});
	const [loggedIn, setLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	console.log(setCurrentUser);
	const CurrentUserContext = React.createContext();
	/* const location = useLocation();
	const locationSingin = location.pathname.endsWith('/signin')


	const navigate = useNavigate(); */
	/* function removeToken() {
		if(!isCheckboxPressed){
		localStorage.removeItem('token');
	  }
	}
	  window.addEventListener('unload', removeToken); */
	const token = localStorage.getItem('token');

	useEffect(() => {
		if (token) {
			setLoggedIn(!!token);
			setIsLoading(false);
			console.log(isLoading);
		}
	}, [loggedIn, token, isLoading]);

	/* useEffect(() => {
		if (locationSingin && loggedIn) {
			navigate('/main')
		}
	}) */

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
	console.log(loggedIn);
	return (
		<CurrentUserContext.Provider value={currentUser}>
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
		</CurrentUserContext.Provider>
	);
}

export default App;
