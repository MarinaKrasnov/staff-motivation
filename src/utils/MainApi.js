const BASE_URL = ''; // адрес апи

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

	return request(`/users/new-password`, {
		// надо определиться new-password или password-recovery ?
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ oldPassword, newPassword }),
	});
}
