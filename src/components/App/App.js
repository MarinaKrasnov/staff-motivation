import { Route, Routes } from 'react-router-dom';
import './App.css';
import NewPassword from '../NewPassword/NewPassword';
// Егор - новый пароль (начало)
function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/new-password" element={<NewPassword />} />
			</Routes>
		</div>
	);
}

export default App;
// Егор - новый пароль (конец)
