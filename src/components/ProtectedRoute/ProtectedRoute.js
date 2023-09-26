import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// import Preloader from '../Preloader/Preloader';

/* function ProtectedRoute ({ component: Component, ...props  }) {
  if (props.isLoading) {
     <Preloader />
     return
  } if (props.loggedIn) {
     <Component {...props} />
     return
  } 
    <Navigate to="/signin" replace />;
} */

function ProtectedRoute({ component: Component, ...props }) {
	return !props.loggedIn ? (
		setTimeout(() => {
			<Navigate to="/signin" replace />;
		}, 1000)
	) : (
		<Component {...props} replace />
	);
}

export default ProtectedRoute;

ProtectedRoute.propTypes = {
	loggedIn: PropTypes.bool.isRequired,
	component: PropTypes.node.isRequired,
	isLoading: PropTypes.bool.isRequired,
};
