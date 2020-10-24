import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Drawer from './Drawer.js';
import MenuButton from './MenuButton';
import AddTransactionButton from './AddTransactionButton';
import TopWallets from './TopWallets';

const useStyles = makeStyles((theme) => ({
	toolbarMargin: {
		...theme.mixins.toolbar,
	},
	appbar: {
		zIndex: theme.zIndex.modal + 1,
	},
	toolbar1: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: 8,
		paddingRight: 8,
		minWidth: 360,
	},
	toolbar2: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 0,
		minWidth: 500,
	},
	tabs1: {
		maxWidth: 1000,
		position: 'relative',
		margin: '0 auto',
	},
	tabs2: {
		width: '100%',
		// maxWidth: 1000,
		position: 'relative',
		margin: '0 auto',
	},
}));

const Header = inject('store')(
	observer(({ store }) => {
		const classes = useStyles();

		const matches = useMediaQuery('(min-width:600px)');

		const appBar = createMuiTheme({
			palette: {
				type: store.themeType,
				primary: {
					main: store.themeType === 'light' ? '#4d87bd' : '#14405a',
				},
			},
		});

		const getToolbarClassName = () => {
			if (matches) return classes.toolbar2;
			else return classes.toolbar1;
		};

		return (
			<>
				<ThemeProvider theme={appBar}>
					<div style={{ position: 'relative', minWith: 360 }}>
						<AppBar className={classes.appbar}>
							<div className={matches ? classes.tabs1 : classes.tabs2}>
								<Toolbar className={`${getToolbarClassName()}`}>
									<MenuButton />
									<TopWallets />
									<AddTransactionButton />
									<Drawer />
								</Toolbar>
							</div>
						</AppBar>
					</div>
				</ThemeProvider>
				<div className={classes.toolbarMargin}></div>
			</>
		);
	})
);

export default Header;
