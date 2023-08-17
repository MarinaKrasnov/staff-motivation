import './App.css';
import React from 'react';
// Аня - страница регистрации (начало кода)
import { Route, Routes } from 'react-router-dom';
import Register from '../Register/Register';

function App() {
	return (
		<div className="page">
			<Routes>
				<Route path="/signup" element={<Register />} />
			</Routes>
		</div>
	);
}
// Аня - страница регистрации (конец кода)

export default App;
