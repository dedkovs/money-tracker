import React from 'react';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
	menuItem: {
		fontSize: '1rem',
		minHeight: 'unset',
		'&:hover': {
			backgroundColor: 'rgba(0,0,0,0.1)',
		},
		lineHeight: '1.2',
	},
	menu: {
		zIndex: '1400 !important',
	},
}));

const Menu1 = inject('store')(
	observer(({ store }) => {
		const classes = useStyles();

		// const menu = ['Перевести в другой кошелёк', 'Редактировать кошельки'];
		// создать
		// удалить
		// переименовать
		// изменить начальную сумму
		// скрыть

		return (
			<Menu
				anchorEl={store.anchorEl2}
				open={Boolean(store.anchorEl2)}
				onClose={() => store.setAnchorEl2(null)}
				PaperProps={{
					style: {
						boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
						transform: 'translate(0px, 20px)',
					},
				}}
				PopoverClasses={{ root: classes.menu }}
			>
				<MenuItem
					classes={{ root: classes.menuItem }}
					onClick={() => {
						store.setOpenDialogRemoveWallet(false);
						store.setOpenDialogRenameWallet(false);
						store.setAnchorEl2(null);
						store.setOpenBetweenWalletsForm(true);
						// store.setOpenEditWalletsForm(true);
					}}
					component={Link}
					to="/data/between-wallets"
				>
					Перевести в другой кошелёк
					{/* Перевести в другой кошелёк */}
				</MenuItem>
				<MenuItem
					classes={{ root: classes.menuItem }}
					onClick={() => {
						store.setOpenDialogRemoveWallet(false);
						store.setOpenDialogRenameWallet(false);
						store.setAnchorEl2(null);
						store.setOpenEditWalletsForm(true);
					}}
					component={Link}
					to="/data/edit-wallets"
				>
					Редактировать кошельки
					{/* Перевести в другой кошелёк */}
				</MenuItem>
				<MenuItem
					classes={{ root: classes.menuItem }}
					onClick={() => {
						store.setOpenDialogRenameWallet(false);
						store.setAnchorEl2(null);
						// store.setOpenEditWalletsForm(true);
					}}
					// component={Link}
					// to="/data/edit-wallets"
				>
					Создать кошелёк
					{/* Перевести в другой кошелёк */}
				</MenuItem>
			</Menu>
		);
	})
);

export default Menu1;
