import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from '../Register/Register'; // Аня - страница регистрации
import Login from '../Login/Login';
import ResetPassword from '../ResetPassword/ResetPassword';
import NewPassword from '../NewPassword/NewPassword';
import Modal from '../Modal/Modal';

function App() {
	return (
		<div className="App">
			<Routes>
				{/* Виталий - модальное окно открывается при успешном изменении пароля */}
				<Route path="/" element={<Modal />} />
				{/* Аня - добавлен модуль регистрации (начало кода) */}
				<Route path="/signup" element={<Register />} />
				{/* Аня - добавлен модуль регистрации (конец кода) */}
				{/* Егор - новый пароль (начало кода) */}
				<Route path="/new-password" element={<NewPassword />} />
				{/* Егор - новый пароль (конец кода) */}
				{/* Андрей - логин, ресет - начало */}
				<Route path="/signin" element={<Login />} />
				<Route path="/reset-password" element={<ResetPassword />} />
				{/* Андрей - логин, ресет - конец */}
			</Routes>
		</div>
	);
}

export default App;
