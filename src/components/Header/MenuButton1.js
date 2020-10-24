import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { inject, observer } from 'mobx-react';

const useStyles = makeStyles(() => ({
	tooltip: {
		fontSize: '0.9rem',
	},
	button: {
		minHeight: 56,
		minWidth: 45,
		'@media (min-width:600px)': { minHeight: 64, minWidth: 62 },
	},
	menuIcon: {
		color: 'white',
	},
}));

const MenuButton1 = inject('store')(
	observer(({ store }) => {
		const classes = useStyles();
		return (
			<Tooltip
				title={'Меню'}
				placement="bottom"
				classes={{ tooltip: classes.tooltip }}
				arrow
				enterDelay={500}
			>
				<Button
					className={classes.button}
					onClick={() => {
						store.setOpenDrawer(!store.openDrawer);
						store.setAnchorEl(null);
					}}
				>
					<MenuIcon className={classes.menuIcon} />
				</Button>
			</Tooltip>
		);
	})
);

export default MenuButton1;
