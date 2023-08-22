import { Route, Routes } from 'react-router-dom';
import './App.css';
import NewPassword from '../NewPassword/NewPassword';

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
