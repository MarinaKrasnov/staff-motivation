import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from '../Register/Register'; // Аня - страница регистрации

function App() {
	return (
		// Аня - добавлен модуль регистрации (начало кода)
		<div className="App">
			<Routes>
				<Route path="/signup" element={<Register />} />
			</Routes>
		</div>
		// Аня - добавлен модуль регистрации (конец кода)
	);
}

export default App;
