import './App.scss';
import React from 'react';
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

export default App;
