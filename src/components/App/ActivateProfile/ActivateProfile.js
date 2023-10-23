// import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate, /* useLocation, */ useParams } from 'react-router-dom';
import { activateRegister } from '../../../utils/MainApi';

function ActivateProfile() {
	const navigate = useNavigate();
	const { uid, token } = useParams();

	console.log(uid, token);
	// http://localhost:3000/activate/MTM/bwcmyz-1781c61a7b00f62103bcf44a10c2db7c

	useEffect(() => {
		activateRegister(uid, token)
			.then(() => {
				navigate('/signin');
				console.log('активация успешна');
			})
			.catch((res) => {
				if (res === 500) {
					navigate('/server-error');
				} else {
					console.log(res);
				}
			});
	}, [navigate, uid, token]);

	return <div>{}</div>;
}

export default ActivateProfile;

ActivateProfile.propTypes = {
	// uid: PropTypes.string.isRequired,
	// token: PropTypes.string.isRequired
};
