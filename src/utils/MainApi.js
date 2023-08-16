import { BASE_URL } from './constants';

const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(res.status);
};

/* user */

export const signup = (data) =>
	fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ data }),
	}).then(checkResponse);