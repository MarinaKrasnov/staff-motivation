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
        <button className={styles.openButton} onClick={handleOpenModal}>
          Открыть модальное окно
        </button>
      )}
    </section>
  );
}

export default ModalMessage;

