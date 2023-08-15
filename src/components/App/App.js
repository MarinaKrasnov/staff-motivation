import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import Login from '../Login/Login';
import * as MainApi from '../../utils/MainApi';

function App() {
	// @TODO: автор Андрей, компонент Login
	// стейт логина
	// const [isLoggedIn, setIsLoggedIn] = useState(false);
	// чекбокс для "Запомнить меня"
	const [isRememberMePressed, setIsRememberMePressed] = useState(false);
	const handleIsRememberMePressed = () => {
		setIsRememberMePressed(!isRememberMePressed);
	};
	// стейт скрытого пароля
	const [isPasswordHidden, setIsPasswordHidden] = useState(true);
	const handleisPasswordHidden = () => {
		setIsPasswordHidden(!isPasswordHidden);
	};

	const checkToken = () => {
		const token = localStorage.getItem('token');
		if (token) {
			MainApi.checkToken(token)
				.then((res) => {
					if (res) {
						// setIsLoggedIn(true); // включить, когда будет использован isLoggedIn
						// нужно ли сохранять состояние логина в localStorage ?
					}
				})
				.catch((error) => {
					console.log(`Ошибка: ${error}`);
				});
		}
	};

	const handleLogin = (email, password) => {
		MainApi.login(email, password)
			.then((data) => {
				if (data.token && isRememberMePressed) {
					// пока не совсем понимаю, как будет работать чекбокс, но надеюсь я на правлином пути
					localStorage.setItem('token', data.token); // пока не понятно, что будет присылать api
					checkToken();
				}
			})
			.catch((error) => {
				console.log(`Ошибка: ${error}`);
			});
	};

	return (
		<div className="App">
			<Routes>
				<Route
					path="/signin"
					element={
						<Login
							isRememberMePressed={isRememberMePressed}
							handleIsRememberMePressed={handleIsRememberMePressed}
							onSignIn={handleLogin}
							isPasswordHidden={isPasswordHidden}
							onHidePasswordClick={handleisPasswordHidden}
						/>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
