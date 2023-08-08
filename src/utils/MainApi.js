const BASE_URL = ''; // пока не понятен адрес апи

const getResponseData = (response) => {
	if (!response.ok) {
		return Promise.reject(response.status);
	}
	return response.json();
};

function request(url, options) {
	return fetch(`${BASE_URL}${url}`, options).then(getResponseData);
}

/* 
function getToken() {
  const token = localStorage.getItem("jwt");
  return token;
}
*/

export function login(email, password) {
	return request(`/token/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});
}

export function checkToken(token) {
	return request(`/users/me`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`, // не знаю используют ли джанго/пайтон беки Бирера
		},
	});
}
