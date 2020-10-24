import { v4 as uuidv4 } from 'uuid';
import { toJS } from 'mobx';

const getData = (store) => {
	const getIncome = () => {
		if (store.editRecordFormType === 'income') {
			return store.editRecordCategory;
		}
		if (store.editRecordFormType === 'expences') {
			return null;
		}
	};

	const getIncomeSub = () => {
		if (store.editRecordFormType === 'income') {
			return store.editRecordSubcategory;
		}
		if (store.editRecordFormType === 'expences') {
			return null;
		}
	};

	const getExpences = () => {
		if (store.editRecordFormType === 'income') {
			return null;
		}
		if (store.editRecordFormType === 'expences') {
			return store.editRecordCategory;
		}
	};

	const getExpencesSub = () => {
		if (store.editRecordFormType === 'income') {
			return null;
		}
		if (store.editRecordFormType === 'expences') {
			return store.editRecordSubcategory;
		}
	};

	const getWallet = () => {
		if (
			store.editRecordFormType === 'income' ||
			store.editRecordFormType === 'expences'
		) {
			return store.editRecordWallet;
		}
	};

	const getWalletFrom = () => {
		if (
			store.editRecordFormType === 'income' ||
			store.editRecordFormType === 'expences'
		) {
			return null;
		}
	};

	const getWalletTo = () => {
		if (
			store.editRecordFormType === 'income' ||
			store.editRecordFormType === 'expences'
		) {
			return null;
		}
	};

	const userWallets = { ...store.user.wallets };
	const oldWallet = store.recordToEdit.wallet;
	const newWallet = store.editRecordWallet;

	if (
		store.editRecordFormType === 'income' ||
		store.editRecordFormType === 'expences'
	) {
		let wallet1 = userWallets[oldWallet];
		userWallets[oldWallet] = [
			wallet1[0] - store.recordToEdit.sum,
			wallet1[1],
			wallet1[2],
		];
		let wallet2 = userWallets[newWallet];
		userWallets[newWallet] = [
			wallet2[0] + store.editRecordSum,
			wallet2[1],
			wallet1[2],
		];
	}

	return {
		// delete record
		oldRecord: toJS(store.recordToEdit),
		// add record
		newRecord: {
			id: uuidv4(),
			sum: store.editRecordSum,
			income: getIncome(),
			income_sub: getIncomeSub(),
			wallet: getWallet(),
			wallet_from: getWalletFrom(),
			wallet_to: getWalletTo(),
			expences: getExpences(),
			expences_sub: getExpencesSub(),
			date: new Date(
				new Date(store.editRecordDate).getFullYear(),
				new Date(store.editRecordDate).getMonth(),
				new Date(store.editRecordDate).getDate()
			).toString(),
			comment: store.editRecordComment,
		},
		// wallets
		userWallets: toJS(userWallets),
	};
};

export default getData;
