import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';
import { inject, observer } from 'mobx-react';
import DarkModeSwitcher from '../DarkModeSwitcher';
import Email from '../Signin/Email';
import Password from '../Signin/Password';
import LinkToSigninAndSignup from '../Signin/LinkToSigninAndSignup';
import SubmitButton from '../Signin/SubmitButton';
import Logo from '../Signin/Logo';
import handleSubmit from './handleSubmit';
import ConfirmPassword from './ConfirmPassword';

const useStyles = makeStyles(() => ({
	form: {
		display: 'block',
		width: '80%',
		margin: '0 auto',
		marginTop: 20,
	},
}));

const Signup = inject('store')(
	observer(({ store }) => {
		const history = useHistory();

		const classes = useStyles();

		const [state, setState] = useState({
			email: '',
			password: '',
			confirmPassword: '',
		});

		const [error, setError] = useState({});

		const handleChange = (event) => {
			if (error !== '') setError({});
			setState({
				...state,
				[event.target.name]: event.target.value,
			});
		};

		return (
			<div>
				<DarkModeSwitcher />

				<Logo />

				<div>
					<form
						noValidate
						className={classes.form}
						autoComplete="on"
						onSubmit={(e) => handleSubmit(e, store, state, history)}
					>
						<Email state={state} handleChange={handleChange} error={error} />

						<Password
							state={state}
							handleChange={handleChange}
							error={error}
							autoComplete={'off'}
						/>

						<ConfirmPassword
							state={state}
							handleChange={handleChange}
							error={error}
							autoComplete={'off'}
						/>

						{error.general && (
							<Typography align={'center'} variant="body1" color={'error'}>
								{error.general}
							</Typography>
						)}

						<SubmitButton text={'Зарегистрироваться'} />

						<LinkToSigninAndSignup text={'У меня уже есть аккаунт'} to={'/'} />
					</form>
				</div>
			</div>
		);
	})
);

export default Signup;
