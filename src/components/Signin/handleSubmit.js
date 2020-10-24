const handleSubmit = (event, store, state, history) => {
	const { setLoading, setError, logInUser } = store;

	event.preventDefault();

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

	const emailAndPassword = {
		email: state.email,
		password: state.password,
	};

	logInUser(emailAndPassword, history);
};

export default handleSubmit;
