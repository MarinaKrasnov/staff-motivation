import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Preloader from '../Preloader/Preloader';

function ProtectedRoute({
	component: Component,
	isLoading,
	loggedIn,
	...props
}) {
	useEffect(() => {}, [isLoading, loggedIn]);

	if (isLoading) {
		return <Preloader />;
	}
	if (loggedIn) {
		return <Component {...props} />;
	}
	return <Navigate to="/signin" replace />;
}

export default ProtectedRoute;

ProtectedRoute.propTypes = {
	loggedIn: PropTypes.bool.isRequired,
	component: PropTypes.node.isRequired,
	isLoading: PropTypes.bool.isRequired,
};

/* ProtectedRoute.defaultProps = {
	component: null,
}; */
