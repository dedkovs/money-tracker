import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { inject, observer } from 'mobx-react';

const useStyles = makeStyles(() => ({
	menuIcon: {
		color: 'white',
	},
}));

const MenuButton2 = inject('store')(
	observer(({ store }) => {
		const classes = useStyles();
		return (
			<IconButton
				onClick={() => {
					store.setOpenDrawer(!store.openDrawer);
					store.setAnchorEl(null);
				}}
			>
				<MenuIcon className={classes.menuIcon} />
			</IconButton>
		);
	})
);

export default MenuButton2;
