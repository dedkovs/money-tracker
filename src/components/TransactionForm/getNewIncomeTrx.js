import { v4 as uuidv4 } from 'uuid';
import { toJS } from 'mobx';

const getNewIncomeTrx = (store) => {
	let updWallet = toJS(store.user.wallets[store.incomeWallet]);
	updWallet = [updWallet[0] + store.incomeSum, updWallet[1], updWallet[2]];
	return {
		id: uuidv4(),
		sum: store.incomeSum,
		income: store.incomeCategory,
		income_sub: store.incomeSubcategory,
		wallet: store.incomeWallet,
		wallet_from: null,
		wallet_to: null,
		expences: null,
		expences_sub: null,
		date: new Date(
			new Date(store.incomeDate).getFullYear(),
			new Date(store.incomeDate).getMonth(),
			new Date(store.incomeDate).getDate()
		).toString(),
		comment: store.incomeComment,
		updatedWallet: updWallet,
	};
};

export default getNewIncomeTrx;
