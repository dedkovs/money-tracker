import { toJS } from 'mobx';

const getData = (store) => {
	const {
		recordToEdit: record,
		recordToEdit: { id, sum, wallet, wallet_from, wallet_to },
	} = store;
	let updWallet, updWallet_from, updWallet_to;
	if (wallet === null) {
		updWallet_from = toJS(store.user.wallets[wallet_from]);
		updWallet_to = toJS(store.user.wallets[wallet_to]);
		updWallet_from = [
			updWallet_from[0] + sum,
			updWallet_from[1],
			updWallet_from[2],
		];
		updWallet_to = [updWallet_to[0] - sum, updWallet_to[1], updWallet_to[2]];
	} else {
		updWallet_from = null;
		updWallet_to = null;
	}
	if (wallet !== null) {
		updWallet = toJS(store.user.wallets[wallet]);
		updWallet = [updWallet[0] - sum, updWallet[1], updWallet[2]];
	} else {
		updWallet = null;
	}
	return {
		id: id,
		sum: sum,
		wallet: wallet,
		updWallet: updWallet,
		wallet_from: wallet_from,
		updWallet_from: updWallet_from,
		wallet_to: wallet_to,
		updWallet_to: updWallet_to,
		record: toJS(record),
	};
};

export default getData;
