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

const Email = inject('store')(
	observer(({ store, state, handleChange, error }) => {
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
					id="email"
					name="email"
					type="email"
					label="E-mail"
					className={classes.textField}
					value={state.email}
					onChange={handleChange}
					fullWidth
					autoComplete={'email'}
					helperText={error.email}
					error={error.email ? true : false}
				/>
			</ThemeProvider>
		);
	})
);

export default Email;
