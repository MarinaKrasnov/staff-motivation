import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from '../Register/Register'; // Аня - страница регистрации
import Login from '../Login/Login';
import ResetPassword from '../ResetPassword/ResetPassword';
import Modal from '../Modal/Modal';
import ModalMessage from '../ModalMessage/ModalMessage';

function App() {
	return (
		<div className="App">
			<Routes>
				{/* Виталий - модальное окно открывается при успешном изменении пароля */}
				<Route path="/" element={<Modal />} />
				{/* Аня - добавлен модуль регистрации (начало кода) */}
				<Route path="/signup" element={<Register />} />
				{/* Аня - добавлен модуль регистрации (конец кода) */}

				{/* Андрей - логин, ресет - начало */}
				<Route path="/signin" element={<Login />} />
				<Route path="/" element={<ModalMessage />} />
				<Route path="/reset-password" element={<ResetPassword />} />
				{/* Андрей - логин, ресет - конец */}
			</Routes>
		</div>
	);
}

export default App;
