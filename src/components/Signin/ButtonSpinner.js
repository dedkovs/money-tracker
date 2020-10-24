import React from 'react';
import {
	ThemeProvider,
	createMuiTheme,
	makeStyles,
} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { inject, observer } from 'mobx-react';
import { amber } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
	spinner2: {
		position: 'absolute',
		left: 0,
		right: 0,
		marginLeft: 'auto',
		marginRight: 'auto',
		top: 3,
	},
}));

const ButtonSpinner = inject('store')(
	observer(({ store }) => {
		const classes = useStyles();

		const spinnerColor = createMuiTheme({
			palette: {
				type: store.themeType,
				primary: {
					main: amber[500],
				},
			},
		});

		return (
			<ThemeProvider theme={spinnerColor}>
				<CircularProgress size={30} className={classes.spinner2} />
			</ThemeProvider>
		);
	})
);

export default ButtonSpinner;
