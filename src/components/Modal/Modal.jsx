import { useState } from 'react';

import logo from '../../images/CircleWavyCheck.png';
import styles from './Modal.module.scss';

function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <section className={styles.back}>
      {isOpen && (
        <section className={styles.ModulePort}>
          <div className={styles.Module}>
            <img src={logo} className="App-logo" alt="logo" />
            <h2 className={styles.Message}>Мы отправили ссылку для создания нового пароля на вашу электронную почту</h2>
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
