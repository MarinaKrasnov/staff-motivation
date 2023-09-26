import React from 'react';
import Modal from '../Modal/Modal';
import ClaudSlash from '../../images/CloudSlash.svg';
import styles from '../Modal/Modal.module.scss';

function ServerError() {
	return (
		<Modal>
			<section className={styles.ModalPort}>
				<div className={styles.Module}>
					<img src={ClaudSlash} className="App-logo" alt="logo" />
					<h1 className={styles.Text1}>Сервер временно не доступен</h1>
					<h2 className={styles.Text2}>
						Мы делаем всё возможное, чтобы возобновить работу приложения.
						Приносим извинения за доставленные неудобства.
					</h2>
				</div>
			</section>
		</Modal>
	);
}
export default ServerError;
