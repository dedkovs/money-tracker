const handleSubmit = (event, store, state, history) => {
	const { setLoading, setError, signUpUser } = store;

	event.preventDefault();

	setLoading(true);

	if (state.email.trim() === '') {
		setLoading(false);
		setError({ email: 'Поле не должно быть пустым' });
		return;
	}

	if (state.password.trim() === '') {
		setLoading(false);
		setError({ password: 'Поле не должно быть пустым' });
		return;
	}

	if (state.confirmPassword.trim() === '') {
		setLoading(false);
		setError({ confirmPassword: 'Поле не должно быть пустым' });
		return;
	}

	if (state.password !== state.confirmPassword) {
		setLoading(false);
		setError({ confirmPassword: 'Пароли не совпадают' });
		return;
	}

	const emailAndPasswords = {
		email: state.email,
		password: state.password,
		confirmPassword: state.confirmPassword,
	};

	signUpUser(emailAndPasswords, history);
};

export default handleSubmit;
