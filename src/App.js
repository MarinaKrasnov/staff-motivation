import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import Login from './components/Login/Login';

function App() {
	// @TODO: автор Андрей, компонент Login
	// чекбокс для Login - запомеить меня

	const [isRememberMePressed, setIsRememberMePressed] = useState(false);

	const handleIsRememberMePressed = () => {
		setIsRememberMePressed(true);
	};

	return (
		<div className="App">
			<Routes>
				<Route
					path="/signin"
					element={
						<Login
							isRemembered={isRememberMePressed}
							handleIsRemembered={handleIsRememberMePressed}
						/>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
