import Header from '../Header/Header'; // Егор -- верхнее меню
import SideNavbar from '../SideNavbar/SideNavbar'; // Егор -- боковое меню
import Achievements from '../Achievements/Achievements';

function Main() {
	return (
		<main className="main-page">
			{/* Егор - верхнее меню и левое боковое меню (начало кода) */}
			<Header />
			<SideNavbar />
			{/* Егор - верхнее меню и левое боковое меню (конец кода) */}
			{/* Андрей, достижения, начало */}
			<Achievements />
			{/* Андрей, достижения, конец */}
		</main>
	);
}

export default Main;
