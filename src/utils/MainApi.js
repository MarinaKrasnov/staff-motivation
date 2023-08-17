import { BASE_URL } from './constants';

const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(res.status);
};

/* user */

export const signup = (data) => {
	const requestData = [
		data.firstName,
		data.lastName,
		data.email,
		data.password,
	];
	if (data.middleName) {
		requestData.middleName = data.middleName;
	}

	console.log(data); // проверяю какие данные уходят на бэк

	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}).then(checkResponse);
};
