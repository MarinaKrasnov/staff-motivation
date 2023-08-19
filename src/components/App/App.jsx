import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Modal from '../Modal/Modal';


function Main() {
  return (
    <div>
      <h1>Cтраница входа</h1>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Modal />} />
        <Route path="/signin" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;

