import { v4 as uuidv4 } from 'uuid';
import { toJS } from 'mobx';

const getNewExpencesTrx = (store) => {
	let updWallet = toJS(store.user.wallets[store.expencesWallet]);
	updWallet = [updWallet[0] + store.expencesSum, updWallet[1], updWallet[2]];
	return {
		id: uuidv4(),
		sum: store.expencesSum,
		income: null,
		income_sub: null,
		wallet: store.expencesWallet,
		wallet_from: null,
		wallet_to: null,
		expences: store.expencesCategory,
		expences_sub: store.expencesSubcategory,
		date: new Date(
			new Date(store.expencesDate).getFullYear(),
			new Date(store.expencesDate).getMonth(),
			new Date(store.expencesDate).getDate()
		).toString(),
		comment: store.expencesComment,
		updatedWallet: updWallet,
	};
};

export default getNewExpencesTrx;
