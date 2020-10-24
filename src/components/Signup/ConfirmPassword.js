import React from 'react';
import TextField from '@material-ui/core/TextField';
import {
	ThemeProvider,
	createMuiTheme,
	makeStyles,
} from '@material-ui/core/styles';
import { lightGreen } from '@material-ui/core/colors';
import { inject, observer } from 'mobx-react';

const useStyles = makeStyles(() => ({
	textField: {
		display: 'block',
		margin: '0 auto',
		marginBottom: 20,
		maxWidth: 300,
	},
}));

const ConfirmPassword = inject('store')(
	observer(({ store, state, handleChange, error, autoComplete }) => {
		const classes = useStyles();

		const theme = createMuiTheme({
			palette: {
				type: store.themeType,
				primary: {
					main: lightGreen[500],
				},
			},
		});

		return (
			<ThemeProvider theme={theme}>
				<TextField
					id="confirmPassword"
					name="confirmPassword"
					type="password"
					label="Подтвердите пароль"
					className={classes.textField}
					value={state.confirmPassword}
					onChange={handleChange}
					fullWidth
					autoComplete={autoComplete}
					helperText={error.confirmPassword}
					error={error.confirmPassword ? true : false}
				/>
			</ThemeProvider>
		);
	})
);

export default ConfirmPassword;
