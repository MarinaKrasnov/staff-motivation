import './Main.scss';
import Header from '../Header/Header'; // Егор -- верхнее меню
import SideNavbar from '../SideNavbar/SideNavbar'; // Егор -- боковое меню
import MyTasks from '../MyTasks/MyTasks';

function Main() {
	return (
		<main className="main-page">
			{/* Егор - верхнее меню и левое боковое меню (начало кода) */}
			<Header />
			<SideNavbar />
			{/* Егор - верхнее меню и левое боковое меню (конец кода) */}
			<section className="main-page__section">
				<MyTasks />
			</section>
		</main>
	);
}

export default Main;
