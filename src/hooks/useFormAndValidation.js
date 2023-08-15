import { useState, useCallback } from 'react';
import validator from 'validator';

export function useFormAndValidation() {
	const nameRegex = /^[\s\-a-zA-Zа-яА-Я]+$/;
	const [values, setValues] = useState({});
	const [errors, setErrors] = useState({});
	const [isValid, setIsValid] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
		setIsValid(false);
		if (name === 'firstName' || name === 'lastName' || name === 'middleName') {
			if (!nameRegex.test(value)) {
				setErrors({ ...errors, [name]: 'Введите правильное имя' });
			} else if (!value) {
				setErrors({ ...errors, [name]: 'Введите имя' });
			} else {
				setErrors({ ...errors, [name]: '' });
			}
		}
		if (name === 'email') {
			if (!validator.isEmail(value)) {
				setErrors({
					...errors,
					[name]: 'Введите правильный адрес электронной почты',
				});
			} else if (!value) {
				setErrors({ ...errors, [name]: 'Введите адрес электронной почты' });
			} else {
				setErrors({ ...errors, [name]: '' });
			}
		}
		setIsValid(e.target.closest('form').checkValidity());
	};

	const resetForm = useCallback(
		(newValues = {}, newErrors = {}, newIsValid = false) => {
			setValues(newValues);
			setErrors(newErrors);
			setIsValid(newIsValid);
		},
		[setValues, setErrors, setIsValid]
	);

	return {
		values,
		handleChange,
		errors,
		isValid,
		resetForm,
		setValues,
		setIsValid,
		setErrors,
	};
}
