import * as yup from 'yup';
import emailRegex from './RegExps';
import { ERROR_MESSAGES } from './Config';

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
