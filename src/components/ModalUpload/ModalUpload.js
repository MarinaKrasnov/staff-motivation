import PropTypes from 'prop-types';
import './ModalUpload.scss';
import { React, useEffect } from 'react';
import folder from '../../images/folder.svg';

function ModalUpload({ onClose }) {
	const handleEscClose = (event) => {
		if (event.key === 'Escape') {
			onClose();
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleEscClose);
		return () => {
			window.removeEventListener('keydown', handleEscClose);
		};
	});

	return (
		<div
			className="modalUpload-background"
			aria-hidden="true"
			onClick={onClose}
		>
			<div
				className="modalUpload"
				aria-hidden="true"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					className="modalUpload__close-btn"
					aria-label="close-btn"
					onClick={onClose}
				/>
				<h2 className="modalUpload__title">Загрузка фотографии</h2>
				<img src={folder} alt="Папка" className="modalUpload__image" />
				<p className="modalUpload__text">
					Коллегам будет проще узнать вас, если вы загрузите свою <br />
					настоящую фотографию <br />
					Формат: JPG, PNG. Размер: не более 10 МБ. <br />
				</p>
				<button className="modalUpload__button">
					<div className="modalUpload__button-icon" />
					<p className="modalUpload__button-text">Выбрать файл</p>
				</button>
			</div>
		</div>
	);
}
export default ModalUpload;

ModalUpload.propTypes = {
	onClose: PropTypes.func.isRequired,
};
