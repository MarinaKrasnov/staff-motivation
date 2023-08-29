import './Main.scss';
import Header from '../Header/Header'; // Егор -- верхнее меню
import SideNavbar from '../SideNavbar/SideNavbar'; // Егор -- боковое меню
import MyTasks from '../MyTasks/MyTasks';
import Achievements from '../Achievements/Achievements';
import ModalConfirm from '../ModalConfirm/ModalConfirm'; // Егор - попап подтверждения выхода;

function Main() {
	return (
		<main className="main-page">
			{/* Егор - верхнее меню и левое боковое меню (начало кода) */}
			<Header />
			<SideNavbar />
			{/* Егор - верхнее меню и левое боковое меню (конец кода) */}
			<section className="main-page__section">
				<Achievements />
				<MyTasks />
			</section>
			<ModalConfirm />
		</main>
	);
}

export default Main;
