import React from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import ButtonSpinner from './ButtonSpinner';

const useStyles = makeStyles(() => ({
	dialog: {
		borderRadius: 10,
	},
	dialogActions: {
		display: 'flex',
		justifyContent: 'center',
		paddingBottom: 20,
		paddingTop: 0,
	},
	button: {
		margin: '0 10px',
	},
	paper1: {
		position: 'absolute',
		top: 135,
		margin: 0,
		borderRadius: 20,
		width: 330,
		height: 135,
		minWidth: 330,
	},
	paper2: {
		borderRadius: 20,
		width: 330,
		height: 135,
		minWidth: 330,
	},
}));

const DialogRemoveWallet = inject('store')(
	observer(({ store }) => {
		const classes = useStyles();
		const matches = useMediaQuery('(min-width:600px)');

		const { openDialogRemoveWallet: open, setOpenDialogRemoveWallet } = store;
		return (
			<Dialog
				style={{ zIndex: 1302 }}
				open={open}
				onClose={() => setOpenDialogRemoveWallet(false)}
				classes={{
					// root: classes.dialogRoot,
					// paperFullWidth: classes.paperFullWidth,
					// paperWidthSm: classes.paperWidthSm,
					paper: `${matches ? classes.paper1 : classes.paper2}`,
				}}
			>
				<DialogContent>
					<DialogContentText align={'center'}>
						Удалить кошелёк?
					</DialogContentText>
				</DialogContent>
				<DialogActions
					style={{ padding: 0, paddingBottom: 18, justifyContent: 'center' }}
					// className={classes.dialogActions}
				>
					<Button
						// className={classes.button}
						// variant={'contained'}
						variant={'outlined'}
						onClick={() => setOpenDialogRemoveWallet(false)}
						autoFocus
					>
						Нет
					</Button>
					<Button
						style={{ marginLeft: 15 }}
						// className={classes.button}
						// variant={'contained'}
						variant={'outlined'}
						onClick={() => {
							const x = store.user.transactions.filter(
								(trx) => trx.wallet === store.walletToEdit
							).length;
							const y = store.user.transactions.filter(
								(trx) => trx.wallet_from === store.walletToEdit
							).length;
							const z = store.user.transactions.filter(
								(trx) => trx.wallet_to === store.walletToEdit
							).length;

							if (x + y + z !== 0) {
								// console.log('UNABLE TO DELETE! ');
								store.setOpenDialogUnableToRemoveWallet(true);
								setOpenDialogRemoveWallet(false);
							}

							// console.log(x + y + z);

							if (x + y + z === 0) {
								store.deleteWallet({ wallet: store.walletToEdit });
								setOpenDialogRemoveWallet(false);
							}
						}}
					>
						Да
						{store.loading && <ButtonSpinner />}
					</Button>
				</DialogActions>
			</Dialog>
		);
	})
);

export default DialogRemoveWallet;
