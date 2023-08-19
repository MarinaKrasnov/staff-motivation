import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Modal from '../Modal/Modal';

// Пример компонента на который должен осуществиться переход (Нужно будет удалить)
function Signup() {
  return (
    <div>
      <h1>Cтраница входа</h1>
    </div>
  );
}
// Виталий - добавил компонент Modal (уведомление об успешном изменении пароля)
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Modal />} />
        <Route path="/Signin" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;

