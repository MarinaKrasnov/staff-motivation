<<<<<<< HEAD
import { useState, useEffect, useRef } from 'react';
import logo from '../../images/CircleWavyCheck.svg';
import styles from './Modal.module.scss';

// Компонент ModalMessage
// Реализовано окрытие попапа через handleOpenModal
// Реализовано закрытия попапа нажатием на escape 
// Реализовано закрытие попапа если пользователь нажмет мимо попапа

function ModalMessage() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleMouseDown = (event) => {
      if (!modalRef.current || modalRef.current.contains(event.target)) {
        return;
      }
      
      setIsOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <section className={styles.back}>
      {isOpen && (
        <section className={styles.ModulePort} ref={modalRef}>
          <div className={styles.Module}>
            <img src={logo} className="App-logo" alt="logo" />
            <h2 className={styles.Message}>
              Мы отправили ссылку для создания нового пароля на вашу электронную почту
            </h2>
          </div>
        </section>
      )}
      {!isOpen && (
=======
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/CircleWavyCheck.svg';
import styles from './Modal.module.scss';

function Modal() {
  // Добавляем состояние isOpen
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

// Устанавливаем значение isOpen в true
  const handleOpenModal = () => {
    setIsOpen(true);
  };
// Используем navigate для перенаправления на страницу Signin
  const handleLogin = () => {
    navigate('/Signin');
  };

  return (
    <section className={styles.back}>
      {isOpen && ( // Проверяем значение isOpen для отображения модального окна
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
      {!isOpen && ( // Проверяем значение isOpen для отображения кнопки открытия модального окна
>>>>>>> ab413abdf12a20acd00f551bdaea9691a29fcb75
        <button className={styles.openButton} onClick={handleOpenModal}>
          Открыть модальное окно
        </button>
      )}
    </section>
  );
}

<<<<<<< HEAD
export default ModalMessage;

=======
export default Modal;
>>>>>>> ab413abdf12a20acd00f551bdaea9691a29fcb75

