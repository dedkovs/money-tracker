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
	spinnerContainer: {
		paddingTop: '3em',
	},
	spinner: {
		position: 'absolute',
		left: 0,
		right: 0,
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: '2em',
	},
}));

const BigSpinner = inject('store')(
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
				<div className={classes.spinnerContainer}>
					<CircularProgress className={classes.spinner} />
				</div>
			</ThemeProvider>
		);
	})
);

export default BigSpinner;
