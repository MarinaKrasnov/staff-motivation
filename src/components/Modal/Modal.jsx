import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/CircleWavyCheck.png';
import styles from './Modal.module.scss';

function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleLogin = () => {
    navigate('/main');
  };

  return (
    <section className={styles.back}>
      {isOpen && (
        <section className={styles.ModulePort}>
          <div className={styles.Module}>
            <img src={logo} className="App-logo" alt="logo" />
            <h2 className={styles.Message}>Ваш пароль успешно изменен!</h2>
            <button className={styles.button} onClick={handleLogin}>
              Войти
            </button>
          </div>
        </section>
      )}
      {!isOpen && (
        <button className={styles.openButton} onClick={handleOpenModal}>
          Открыть модальное окно
        </button>
      )}
    </section>
  );
}

export default Modal;

