// Аня - страница регистрации, отправка данных (начало кода)
import { BASE_URL } from './constants';

const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(res.status);
};

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
// Аня - страница регистрации(конец кода)

// Андрей, запросы к api - логин, checkToken(если понадобится), getTocken(если понадобится) - начало
/* 
function getToken() {
  const token = localStorage.getItem("jwt");
  return token;
}

export function checkToken(token) {
	return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`, // не знаю используют ли джанго/пайтон беки Бирера
		},
	})
	.then(checkResponse)
}
*/

export function login(email, password) {
	return fetch(`${BASE_URL}/token/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	}).then(checkResponse);
}
// Андрей, логин, checkToken - конец
