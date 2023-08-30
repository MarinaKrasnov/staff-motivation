import './Main.scss';
import Header from '../Header/Header'; // Егор -- верхнее меню
import SideNavbar from '../SideNavbar/SideNavbar'; // Егор -- боковое меню
import MyTasks from '../MyTasks/MyTasks';
import Achievements from '../Achievements/Achievements';
import DinamicWork from '../DinamicWork/DinamicWork'

function Main() {
	return (
		<main className="main-page">
			{/* Егор - верхнее меню и левое боковое меню (начало кода) */}
			<Header />
			<SideNavbar />
			{/* Егор - верхнее меню и левое боковое меню (конец кода) */}
			<section className="main-page__section">
				<div className='main-page__section1'>
				<Achievements />
				<DinamicWork/>
				</div>
				<MyTasks />
			</section>

		</main>
	);
}

export default Main;
