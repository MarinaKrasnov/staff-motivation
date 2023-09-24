import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ModalConfirm.scss';

function ModalConfirm({ onClose }) {
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
						Вы уверены, что хотите выйти из профиля
					</p>
					<div className="modal-confirm__button-container">
						<button className="modal-confirm__button" onClick={onClose}>
							Отменить
						</button>
						<NavLink
							className="modal-confirm__button modal-confirm__button_confirm"
							to="/signin"
						>
							Да
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ModalConfirm;

ModalConfirm.propTypes = {
	onClose: PropTypes.func.isRequired,
};
