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

const Password = inject('store')(
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
					id="password"
					name="password"
					type="password"
					label="Пароль"
					className={classes.textField}
					value={state.password}
					onChange={handleChange}
					fullWidth
					autoComplete={autoComplete}
					helperText={error.password}
					error={error.password ? true : false}
				/>
			</ThemeProvider>
		);
	})
);

export default Password;
