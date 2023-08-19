import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ModalMessage from '../Modal/Modal';

// Виталий - добавил компонент ModalMessage (уведомление о ссылке)
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ModalMessage />} />
      </Routes>
    </Router>
  );
}

export default App;
