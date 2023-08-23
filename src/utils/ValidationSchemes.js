import * as yup from 'yup';
// Егор - новый пароль (начало)
export const NewPasswordSchema = yup.object().shape({
	password: yup
		.string()
		.required('Пароль обязателен для заполнения')
		.min(6, 'Пароль должен содержать минимум 6 символов')
		.max(30, 'Пароль должен содержать не более 30 символов'),
	repeatPassword: yup
		.string()
		.required('Повторение пароля обязательно для заполнения')
		.oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
});
// Егор - новый пароль (конец)
