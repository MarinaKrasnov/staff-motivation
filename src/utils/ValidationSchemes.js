import * as yup from 'yup';
import emailRegex, { nameRegex } from './RegExps';
import { ERROR_MESSAGES } from './Config';

export const RegisterSchema = yup.object().shape({
	firstName: yup
		.string()
		.required(ERROR_MESSAGES.NAME.EMPTY_FIRSTNAME)
		.matches(nameRegex, ERROR_MESSAGES.NAME.INCORRECT),
	lastName: yup
		.string()
		.required(ERROR_MESSAGES.NAME.EMPTY_LASTNAME)
		.matches(nameRegex, ERROR_MESSAGES.NAME.INCORRECT),
	middleName: yup
		.string()
		.nullable()
		.notRequired()
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
		.min(4, ERROR_MESSAGES.PASSWORD.TO_SHORT)
		.max(30, ERROR_MESSAGES.PASSWORD.TO_LONG)
		.required(ERROR_MESSAGES.PASSWORD.EMPTY),
	confirmPassword: yup
		.string()
		.min(4, ERROR_MESSAGES.PASSWORD.TO_SHORT)
		.max(30, ERROR_MESSAGES.PASSWORD.TO_LONG)
		.required(ERROR_MESSAGES.PASSWORD.EMPTY)
		.oneOf([yup.ref('password'), null], ERROR_MESSAGES.PASSWORD.MUST_MATCH),
});
