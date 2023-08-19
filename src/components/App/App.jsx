import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Modal from '../Modal/Modal';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Modal />} />
      </Routes>
    </Router>
  );
}

export default App;
