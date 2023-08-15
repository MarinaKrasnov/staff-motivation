import logo from '../images/CircleWavyCheck.png';
import styles from './Modal.module.scss';

function Modal() {
	return (
        <section className={styles.ModulePort}>
		<div className={styles.Module}>
				<img src={logo} className="App-logo" alt="logo" />
                <h2 className={styles.Message}>Ваш пароль успешно изменен!</h2>
				<button className={styles.button}>
					Войти
				</button>
		</div>
        </section>
	);
}

export default Modal;
