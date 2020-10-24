import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import {
	ThemeProvider,
	createMuiTheme,
	makeStyles,
} from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { inject, observer } from 'mobx-react';

const useStyles = makeStyles(() => ({
	link2: {
		textDecoration: 'none',
		marginBottom: '2em',
		opacity: 0.7,
	},
	linkContainer: {
		display: 'flex',
		justifyContent: 'center',
	},
}));

const LinkToForgotPassword = inject('store')(
	observer(({ store }) => {
		const classes = useStyles();

		const theme = createMuiTheme({
			palette: {
				type: store.themeType,
				primary: {
					main: grey[500],
				},
			},
			typography: {
				body1: {
					fontWeight: 100,
				},
			},
		});

		return (
			<ThemeProvider theme={theme}>
				<div className={classes.linkContainer}>
					<Typography
						className={classes.link2}
						component={Link}
						to="/"
						align={'center'}
						variant="body1"
						color={'primary'}
					>
						Забыл пароль
					</Typography>
				</div>
			</ThemeProvider>
		);
	})
);

export default LinkToForgotPassword;
