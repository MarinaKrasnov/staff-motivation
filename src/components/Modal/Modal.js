import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';

function Modal({ children }) {
	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modal}>{children}</div>
		</div>
	);
}

Modal.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Modal;

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import logo from '../../images/CircleWavyCheck.svg';
// import styles from './Modal.module.scss';

// function Modal() {
// 	// Добавляем состояние isOpen
// 	const [isOpen, setIsOpen] = useState(false);

// 	const navigate = useNavigate();

// 	// Устанавливаем значение isOpen в true
// 	const handleOpenModal = () => {
// 		setIsOpen(true);
// 	};
// 	// Используем navigate для перенаправления на страницу Signin
// 	const handleLogin = () => {
// 		navigate('/Signin');
// 	};

// 	return (
// 		<section className={styles.back}>
// 			{isOpen && ( // Проверяем значение isOpen для отображения модального окна
// 				<section className={styles.ModulePort}>
// 					<div className={styles.Module}>
// 						<img src={logo} className="App-logo" alt="logo" />
// 						<h2 className={styles.Message}>Ваш пароль успешно изменен!</h2>
// 						<button className={styles.button} onClick={handleLogin}>
// 							Войти
// 						</button>
// 					</div>
// 				</section>
// 			)}
// 			{!isOpen && ( // Проверяем значение isOpen для отображения кнопки открытия модального окна
// 				<button className={styles.openButton} onClick={handleOpenModal}>
// 					Открыть модальное окно
// 				</button>
// 			)}
// 		</section>
// 	);
// }

// export default Modal;
