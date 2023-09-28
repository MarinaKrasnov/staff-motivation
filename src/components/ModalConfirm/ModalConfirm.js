import PropTypes from 'prop-types';
import './ModalConfirm.scss';

function ModalConfirm({ onClose, onExit }) {
	return (
		<div className="modal" aria-hidden="true" onClick={onClose}>
			<div
				className="modal-confirm"
				aria-hidden="true"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="modal-confirm__container">
					<div className="modal-confirm__logo" />
					<p className="modal-confirm__text">
						Вы уверены, что хотите выйти из профиля?
					</p>
					<div className="modal-confirm__button-container">
						<button className="modal-confirm__button" onClick={onClose}>
							Отменить
						</button>
						<button
							className="modal-confirm__button modal-confirm__button_confirm"
							to="/signin"
							onClick={onExit}
						>
							Да
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ModalConfirm;

ModalConfirm.propTypes = {
	onClose: PropTypes.func.isRequired,
	onExit: PropTypes.func.isRequired,
};
