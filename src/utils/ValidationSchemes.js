import * as yup from 'yup';
import emailRegex, { nameRegex } from './RegExps'; // Аня - страница регистрации
import { ERROR_MESSAGES } from './Config';

// Андрей, схема логина, начало
export const LoginSchema = yup.object().shape({
	email: yup
		.string()
		.email(ERROR_MESSAGES.EMAIL.INCORRECT)
		.required(ERROR_MESSAGES.EMAIL.EMPTY)
		.test('Validate Email', ERROR_MESSAGES.EMAIL.INCORRECT, (value) => {
			const RegEx = emailRegex;
			return RegEx.test(String(value).toLowerCase()); // использую регулярное выражение для валидации е-мейла
		}),
	password: yup
		.string()
		.min(6, ERROR_MESSAGES.PASSWORD.TO_SHORT)
		.max(30, ERROR_MESSAGES.PASSWORD.TO_LONG)
		.required(ERROR_MESSAGES.PASSWORD.EMPTY),
});

export const ResetPassordSchema = yup.object().shape({
	email: yup
		.string()
		.email(ERROR_MESSAGES.EMAIL.INCORRECT)
		.required(ERROR_MESSAGES.EMAIL.EMPTY)
		.test('Validate Email', ERROR_MESSAGES.EMAIL.INCORRECT, (value) => {
			const RegEx = emailRegex;
			return RegEx.test(String(value).toLowerCase());
		}),
});
// Андрей, схема логина, конец

// Аня - валидация на странице регистрации(начало кода)
export const RegisterSchema = yup.object().shape({
	firstName: yup
		.string()
		.required(ERROR_MESSAGES.NAME.EMPTY_FIRSTNAME)
		.matches(nameRegex, ERROR_MESSAGES.NAME.INCORRECT),
	lastName: yup
		.string()
		.required(ERROR_MESSAGES.NAME.EMPTY_LASTNAME)
		.matches(nameRegex, ERROR_MESSAGES.NAME.INCORRECT),
	email: yup
		.string()
		.email(ERROR_MESSAGES.EMAIL.INCORRECT)
		.required(ERROR_MESSAGES.EMAIL.EMPTY)
		.test('Validate Email', ERROR_MESSAGES.EMAIL.INCORRECT, (value) => {
			const RegEx = emailRegex;
			return RegEx.test(String(value).toLowerCase());
		}),
	password: yup
		.string()
		.required(ERROR_MESSAGES.PASSWORD.EMPTY)
		.min(4, ERROR_MESSAGES.PASSWORD.TO_SHORT)
		.max(30, ERROR_MESSAGES.PASSWORD.TO_LONG)
		.oneOf(
			[yup.ref('confirmPassword'), null],
			ERROR_MESSAGES.PASSWORD.MUST_MATCH
		),

	confirmPassword: yup
		.string()
		.required(ERROR_MESSAGES.CONFIRM_PASSWORD.EMPTY)
		.oneOf(
			[yup.ref('password'), null],
			ERROR_MESSAGES.CONFIRM_PASSWORD.MUST_MATCH
		),
});
// Аня - валидация на странице регистрации (конец кода)
// Егор - новый пароль (начало)
export const NewPasswordSchema = yup.object().shape({
	password: yup
		.string()
		.required(ERROR_MESSAGES.PASSWORD.EMPTY)
		.min(6, ERROR_MESSAGES.PASSWORD.TO_SHORT)
		.max(30, ERROR_MESSAGES.PASSWORD.TO_LONG),
	repeatPassword: yup
		.string()
		.required(ERROR_MESSAGES.CONFIRM_PASSWORD.EMPTY)
		.oneOf([yup.ref('password'), null], ERROR_MESSAGES.PASSWORD.MUST_MATCH),
});
// Егор - новый пароль (конец)
