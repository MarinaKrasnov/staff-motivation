import React from 'react';
import './SideNavbar.scss';
import { NavLink } from 'react-router-dom';

function SideNavbar() {
	return (
		<nav className="side-navbar">
			<div className="side-navbar__title-container">
				<div className="side-navbar__logo">logo</div>
				<h1 className="side-navbar__title">Motivation System</h1>
			</div>
			<ul className="side-navbar__navigation">
				<li className="side-navbar__navigation-item">
					<div className="side-navbar__navigation-icon side-navbar__navigation-icon-house" />
					<NavLink className="side-navbar__navigation-link" to="/main">
						Главная
					</NavLink>
				</li>
				<li className="side-navbar__navigation-item">
					<div className="side-navbar__navigation-icon side-navbar__navigation-icon-newspaper" />
					<NavLink className="side-navbar__navigation-link" to="/news">
						Новости
					</NavLink>
				</li>
				<li className="side-navbar__navigation-item">
					<div className="side-navbar__navigation-icon side-navbar__navigation-icon-database" />
					<NavLink className="side-navbar__navigation-link" to="/database">
						База данных
					</NavLink>
				</li>
			</ul>
			<div className="side-navbar__profile-link">
				<ul className="side-navbar__navigation">
					<li className="side-navbar__navigation-item">
						<div className="side-navbar__navigation-icon side-navbar__navigation-icon-gear" />
						<NavLink className="side-navbar__navigation-link" to="/profile">
							Профиль
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default SideNavbar;
