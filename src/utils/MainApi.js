// Аня - страница регистрации, отправка данных (начало кода)
import { BASE_URL } from './constants';

const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(res.status);
};

export function signup(data) {
	const newData = {
		first_name: data.firstName,
		last_name: data.lastName,
		password: data.password,
		email: data.email,
		password_confirmation: data.confirmPassword,
	};
	console.log(newData);

	return fetch(`${BASE_URL}/api/users/`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newData),
	}).then(checkResponse);
}
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
	return fetch(`${BASE_URL}/api/token/login/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	}).then(checkResponse);
}
// Андрей, логин, checkToken - конец

// Егор - новый пароль (начало)

const getResponseData = (response) => {
	if (!response.ok) {
		return Promise.reject(response.status);
	}
	return response.json();
};

function request(url, options) {
	return fetch(`${BASE_URL}${url}`, options).then(getResponseData);
}

export function changePassword(oldPassword, newPassword) {
	const token = localStorage.getItem('token');

	return request(`/api/users/reset_password/`, {
		// надо определиться new-password или password-recovery ?
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ oldPassword, newPassword }),
	});
}

// Егор - новый пароль (конец)
