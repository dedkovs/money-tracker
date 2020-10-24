import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';
import { inject, observer } from 'mobx-react';
import DarkModeSwitcher from '../DarkModeSwitcher';
import BigSpinner from './Spinner';
import Email from './Email';
import Password from './Password';
import LinkToSigninAndSignup from './LinkToSigninAndSignup';
import LinkToForgotPassword from './LinkToForgotPassword';
import SubmitButton from './SubmitButton';
import Logo from './Logo';
import handleSubmit from './handleSubmit';

const useStyles = makeStyles(() => ({
	'@keyframes animation1': {
		from: { opacity: 0 },
		to: { opacity: 1 },
	},
	container2: {
		opacity: 0,
		animationName: '$animation1',
		animationDuration: '2s',
		animationDelay: '0.3s',
		animationIterationCount: 1,
		animationFillMode: 'forwards',
	},
	container: {
		opacity: 1,
	},
	form: {
		display: 'block',
		width: '80%',
		margin: '0 auto',
		marginTop: 20,
	},
}));

const Signin = inject('store')(
	observer(({ store }) => {
		const history = useHistory();

		const classes = useStyles();

		const [state, setState] = useState({
			email: 'aaa@aaa.aaa',
			password: 'aaaaaa',
		});

		const [error, setError] = useState({});

		const { animated, logoLoaded } = store;

		const handleChange = (event) => {
			if (error !== '') setError({});
			setState({
				...state,
				[event.target.name]: event.target.value,
			});
		};

		return (
			<div>
				{animated === true && logoLoaded === false ? <BigSpinner /> : null}

				{logoLoaded === true ? <DarkModeSwitcher /> : null}

				<Logo />

				{logoLoaded === true ? (
					<div
						className={
							animated === true ? classes.container2 : classes.container
						}
					>
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
								autoComplete={'current-password'}
							/>

							{error.general && (
								<Typography align={'center'} variant="body1" color={'error'}>
									{error.general}
								</Typography>
							)}

							<SubmitButton text={'Войти'} />

							<LinkToSigninAndSignup
								text={'Зарегистрироваться'}
								to={'/signup'}
							/>

							<LinkToForgotPassword />
						</form>
					</div>
				) : null}
			</div>
		);
	})
);

export default Signin;
