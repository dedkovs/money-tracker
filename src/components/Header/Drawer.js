import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import DrawerSwitchTheme from './DrawerSwitchTheme';
import DrawerSwitchComments from './DrawerSwitchComments';
import DrawerSwitchCents from './DrawerSwitchCents';
import { inject, observer } from 'mobx-react';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
	toolbarMargin: {
		...theme.mixins.toolbar,
	},
	drawer: {
		minWidth: 280,
	},
}));

const Drawer1 = inject('store')(
	observer(({ store }) => {
		const classes = useStyles();

		const logOut = () => {
			store.setOpenDrawer(false);
			store.logOutUser();
		};

		const switchColor = createMuiTheme({
			palette: {
				type: store.themeType,
				primary: {
					main: blue[200],
				},
			},
		});

		return (
			<Drawer
				open={store.openDrawer}
				onClose={() => store.setOpenDrawer(false)}
				classes={{ paper: classes.drawer }}
			>
				<div className={classes.toolbarMargin} />
				<List disablePadding>
					<ThemeProvider theme={switchColor}>
						<DrawerSwitchTheme />
						<ListItem
							onClick={() => {
								store.setOpenDrawer(false);
							}}
							divider
							button
							component={Link}
							to="/data"
						>
							<ListItemText>Графики</ListItemText>
						</ListItem>
						<DrawerSwitchComments />
						<DrawerSwitchCents />
						<ListItem
							onClick={() => {
								store.setOpenDialogRenameWallet(false);
								store.setOpenDrawer(false);
								store.setOpenEditWalletsForm(true);
							}}
							divider
							button
							component={Link}
							to="/data/edit-wallets"
						>
							<ListItemText>Редактировать кошельки</ListItemText>
						</ListItem>
						<ListItem onClick={logOut} divider button component={Link} to="/">
							<ListItemText>Выйти</ListItemText>
						</ListItem>
					</ThemeProvider>
				</List>
			</Drawer>
		);
	})
);

export default Drawer1;
