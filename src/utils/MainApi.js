import { BASE_URL } from './constants';

const token = localStorage.getItem('token');

const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(res.status);
};

// регистрация
export function signup(data) {
	const newData = {
		first_name: data.firstName,
		last_name: data.lastName,
		password: data.password,
		email: data.email,
		password_confirmation: data.confirmPassword,
	};
	return fetch(`${BASE_URL}/api/users/`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newData),
	}).then(checkResponse);
}
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

// вход/авторизация
export function login(email, password) {
	return fetch(`${BASE_URL}/api/token/login/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	}).then(checkResponse);
}

// запрос на смену пароля
export function changePassword(email) {
	return fetch(`${BASE_URL}/api/users/reset_password/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify(email),
	}).then(checkResponse);
}

// новый пароль
const getResponseData = (response) => {
	if (!response.ok) {
		return Promise.reject(response.status);
	}
	return response.json();
};

function request(url, options) {
	return fetch(`${BASE_URL}${url}`, options).then(getResponseData);
}

export function setPassword(data) {
	const currentData = {
		new_password: data.password,
		current_password: data.confirmPassword,
	};
	return request(`/api/users/set_password/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`,
		},
		body: JSON.stringify({ currentData }),
	});
}
