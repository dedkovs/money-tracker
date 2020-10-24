import React from 'react';
import { inject, observer } from 'mobx-react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { toJS } from 'mobx';
import ButtonSpinner from './ButtonSpinner';

const useStyles = makeStyles(() => ({
	dialog: {
		borderRadius: 20,
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
		height: 140,
		minWidth: 330,
	},
	paper2: {
		borderRadius: 20,
		width: 330,
		height: 140,
		minWidth: 330,
	},
	textField: {
		width: 280,
	},
}));

const DialogRenameWallet = inject('store')(
	observer(({ store }) => {
		const { openDialogRenameWallet: open, setOpenDialogRenameWallet } = store;
		// const { setOpenDialogRenameWallet } = store;
		const matches = useMediaQuery('(min-width:600px)');
		const classes = useStyles();
		const [error, setError] = React.useState(false);
		// let oldWalletName;

		// let x = [];

		// store.user.transactions
		// 	.filter((trx) => trx.wallet === store.tempWalletToEdit)
		// 	.map((trx) => x.push(store.user.transactions.indexOf(trx)));

		// console.log(x);

		// const [value, setValue] = React.useState('');

		// React.useEffect(() => {
		// oldWalletName = store.walletToEdit;
		// console.log(oldWalletName);
		// console.log('KKK');
		// setError(false);
		// }, []);

		// const [value, setValue] = React.useState(store.walletToEdit);

		const handleChange = (e) => {
			if (error !== false) setError(false);

			store.setWalletToEdit(e.target.value.replace(',', ''));
			// setValue(e.target.value.replace(',', ''));
			if (store.walletToEdit.length > 30)
				// if (value.length > 30)
				store.setWalletToEdit(store.walletToEdit.slice(0, 30));
			// setValue(value.slice(0, 30));
			if (store.walletToEdit.trim() === '')
				setError('Введите название кошелька');

			if (
				store.walletToEdit.trim() !== store.tempWalletToEdit &&
				store.user.wallets_top_order.includes(store.walletToEdit.trim())
			)
				setError('Такой кошелёк уже существует');
			// if (value.trim() === '') setError('Введите название кошелька');
		};

		const handleSubmit = () => {
			if (store.walletToEdit.trim() === store.tempWalletToEdit) {
				setError(false);
				setOpenDialogRenameWallet(false);
				return;
			}

			// let x = [];

			// store.user.transactions
			// 	.filter((trx) => trx.wallet === store.tempWalletToEdit)
			// 	.map((trx) => x.push(store.user.transactions.indexOf(trx)));

			// const arr_wallet_from = store.user.transactions.filter(
			// 	(trx) => trx.wallet_from === store.tempWalletToEdit
			// );
			// const arr_wallet_to = store.user.transactions.filter(
			// 	(trx) => trx.wallet_to === store.tempWalletToEdit
			// );

			const data = {
				// arr_wallet: x,
				// arr_wallet_from: arr_wallet_from,
				// arr_wallet_to: arr_wallet_to,
				wallets_order: store.user.wallets_order
					.slice(0, store.user.wallets_order.indexOf(store.tempWalletToEdit))
					.concat(store.walletToEdit)
					.concat(
						store.user.wallets_order.slice(
							store.user.wallets_order.indexOf(store.tempWalletToEdit) + 1
						)
					),
				old_wallets_order: store.user.wallets_order,
				wallets_top_order: store.user.wallets_top_order
					.slice(
						0,
						store.user.wallets_top_order.indexOf(store.tempWalletToEdit)
					)
					.concat(store.walletToEdit)
					.concat(
						store.user.wallets_top_order.slice(
							store.user.wallets_top_order.indexOf(store.tempWalletToEdit) + 1
						)
					),
				old_wallets_top_order: store.user.wallets_top_order,
				renamed_wallet: store.walletToEdit,
				old_wallet_name: store.tempWalletToEdit,
				old_wallet_value: store.user.wallets[store.tempWalletToEdit],
				// wallets:
			};

			if (error === false) {
				store.renameWallet(data);
			}
			// return;
		};

		return (
			<Dialog
				style={{ zIndex: 1302 }}
				open={open}
				onClose={() => {
					setError(false);
					setOpenDialogRenameWallet(false);
				}}
				classes={{
					// root: classes.dialogRoot,
					// paperFullWidth: classes.paperFullWidth,
					// paperWidthSm: classes.paperWidthSm,
					paper: `${matches ? classes.paper1 : classes.paper2}`,
				}}
			>
				<DialogContent>
					<TextField
						autoFocus
						className={classes.textField}
						error={error ? true : false}
						helperText={error ? error : null}
						// defaultValue={store.walletToEdit}
						value={store.walletToEdit}
						// value={value}
						onChange={
							handleChange
							// (e) => store.setWalletToEdit(e.target.value)
						}
					></TextField>
				</DialogContent>
				<DialogActions
					style={{ padding: 0, paddingBottom: 18, justifyContent: 'center' }}
				>
					<Button
						// style={{ borderRadius: 5 }}
						variant={'outlined'}
						onClick={() => {
							store.setOpenDialogRenameWallet(false);
						}}
					>
						Отмена
					</Button>
					<Button
						style={{ marginLeft: 15 }}
						variant={'outlined'}
						type={'submit'}
						onClick={handleSubmit}
					>
						ОК
						{store.loading && <ButtonSpinner />}
					</Button>
				</DialogActions>
			</Dialog>
		);
	})
);

export default DialogRenameWallet;
