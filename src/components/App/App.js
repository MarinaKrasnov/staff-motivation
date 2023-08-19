import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from '../Register/Register';

function App() {
	return (
		// Аня - добавлен модуль регистрации
		<div className="App">
			<Routes>
				<Route path="/signup" element={<Register />} />
			</Routes>
		</div>
	);
}

export default App;
