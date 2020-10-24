import {
	action,
	computed,
	observable,
	extendObservable,
	runInAction,
	flow,
	toJS,
	autorun,
} from 'mobx';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

axios.defaults.baseURL =
	'https://europe-west2-keep-track-of-the-budget.cloudfunctions.net/api';
// axios.defaults.baseURL =
// 	'http://localhost:5000/keep-track-of-the-budget/europe-west2/api';

class Store {
	constructor() {
		const token = localStorage.FBIdToken;
		const user = localStorage.user;
		const themeType = localStorage.themeType;
		this.setCollapsedComments(
			// true
			// localStorage.collapsedComments === null ||
			// 	localStorage.collapsedComments === undefined
			// 	? 'true'
			localStorage.collapsedComments === 'true'
		);
		this.setShowCents(localStorage.showCents === 'true');
		if (themeType) this.setThemeType(themeType);
		else this.setThemeType('dark');
		if (token) {
			const decodedToken = jwtDecode(token);
			if (decodedToken.exp * 1000 < Date.now()) {
				this.logOutUser();
				window.location.href = '/';
			} else {
				this.setAuthenticated(true);
				axios.defaults.headers.common['Authorization'] = token;
				if (user) this.setUser(JSON.parse(user));
				else this.getUserData();
			}
		} else this.logOutUser();
		// console.log(toJS(this.walletsTopOrder));
	}

	/// AUTHENTICATED

	@observable authenticated = localStorage.getItem('authenticated') === 'true';

	@action.bound
	setAuthenticated(value) {
		this.authenticated = value;
		localStorage.setItem('authenticated', value);
	}

	/// USER

	@observable user = JSON.parse(localStorage.getItem('user'));

	@action.bound
	setUser(value) {
		this.user = value;
		localStorage.setItem('user', JSON.stringify(this.user));
	}

	/// LOG IN

	@action.bound
	logInUser = flow(function* (emailAndPassword, history) {
		this.setLoading(true);

		try {
			const res = yield axios.post('/login', emailAndPassword);
			const FBIdToken = `Bearer ${res.data.token}`;
			localStorage.setItem('FBIdToken', FBIdToken);
			axios.defaults.headers.common['Authorization'] = FBIdToken;
			this.setAuthenticated(true);
			const userData = yield axios.get('/data');
			this.setUser(userData.data);
			this.loading = false;
			this.setUserData();
			history.push('/data');
		} catch (err) {
			this.loading = false;
			console.error(err);
		}
	});

	setUserData = () => {
		this.setExpencesSum('');
		this.setIncomeSum('');
		this.setEditRecordSum('');
		this.setExpencesWallet(this.user.wallets_order[0]);
		this.setIncomeWallet(this.user.wallets_order[0]);
		this.setEditRecordWallet('');
		this.setEditRecordWalletFrom('');
		this.setEditRecordWalletTo('');
		this.setExpencesCategory('');
		this.setIncomeCategory('');
		this.setEditRecordCategory('');
		this.setExpencesSubcategory(
			this.expencesCategory === ''
				? ''
				: this.user.expences_categories[this.expencesCategory][0]
		);
		this.setIncomeSubcategory(
			this.incomeCategory === ''
				? ''
				: this.user.income_categories[this.incomeCategory][0]
		);
		this.setEditRecordSubcategory('');
		this.setExpencesDate(new Date());
		this.setIncomeDate(new Date());
		this.setEditRecordDate('');
		this.setExpencesComment('');
		this.setIncomeComment('');
		this.setEditRecordComment('');
		// console.log(toJS(this.user.wallets_top_order));
		// const w = toJS(this.user.wallets_top_order);
		// this.setWalletsTopOrder(this.user.wallets_top_order);
	};

	/// SIGN UP

	@action.bound
	signUpUser = flow(function* (emailAndPasswords, history) {
		this.setLoading(true);

		try {
			const res = yield axios.post('/signup', emailAndPasswords);
			const FBIdToken = `Bearer ${res.data.token}`;
			localStorage.setItem('FBIdToken', FBIdToken);
			axios.defaults.headers.common['Authorization'] = FBIdToken;
			const userData = yield axios.get('/data');
			this.setUser(userData.data);
			this.setUserData();
			this.loading = false;
			history.push('/data');
		} catch (err) {
			this.loading = false;
			console.error(err);
		}
	});

	/// LOG OUT

	@action.bound
	logOutUser() {
		localStorage.removeItem('FBIdToken');
		this.setUser(null);
		localStorage.removeItem('user');
		delete axios.defaults.headers.common['Authorization'];
		this.loading = false;
		this.setAuthenticated(false);
		localStorage.removeItem('authenticated');
		localStorage.removeItem('expencesSum');
		localStorage.removeItem('incomeSum');
		localStorage.removeItem('editRecordSum');
		localStorage.removeItem('expencesWallet');
		localStorage.removeItem('incomeWallet');
		localStorage.removeItem('editRecordWallet');
		localStorage.removeItem('editRecordWalletFrom');
		localStorage.removeItem('editRecordWalletTo');
		localStorage.removeItem('expencesCategory');
		localStorage.removeItem('incomeCategory');
		localStorage.removeItem('editRecordCategory');
		localStorage.removeItem('expencesSubcategory');
		localStorage.removeItem('incomeSubcategory');
		localStorage.removeItem('editRecordSubcategory');
		localStorage.removeItem('expencesDate');
		localStorage.removeItem('incomeDate');
		localStorage.removeItem('editRecordDate');
		localStorage.removeItem('expencesComment');
		localStorage.removeItem('incomeComment');
		localStorage.removeItem('editRecordComment');
		localStorage.removeItem('walletsTopOrder');
		localStorage.removeItem('recordToEdit');
	}

	/// GET USER DATA

	@action.bound
	getUserData = flow(function* () {
		try {
			const userData = yield axios.get('/data');
			this.setUser(userData.data);
		} catch (err) {
			this.loading = false;
			console.error(err);
		}
	});

	/// CURRENT PAGE

	@observable currentPage = 1;

	/// THEME TYPE

	@observable themeType = 'dark';

	@action setThemeType = (value) => {
		this.themeType = value;
		localStorage.setItem('themeType', value);
	};

	/// COLLAPSED COMMENTS

	@observable collapsedComments;

	@action setCollapsedComments = (value) => {
		this.collapsedComments = value;
		localStorage.setItem('collapsedComments', value);
	};

	/// ANIMATED

	@observable animated =
		sessionStorage.getItem('animated') === null ? true : false;

	@action setAnimated = (value) => {
		this.animated = value;
	};

	/// LOGO LOADED

	@observable logoLoaded = sessionStorage.getItem('logoLoaded') === 'true';

	@action setLogoLoaded = (value) => {
		this.logoLoaded = value;
	};

	/// ПОКАЗЫВАТЬ КОПЕЙКИ

	@observable showCents;

	@action setShowCents = (value) => {
		this.showCents = value;
		localStorage.setItem('showCents', value);
	};

	/// LOADING

	@observable loading = false;

	@action setLoading = (value) => {
		this.loading = value;
	};

	///

	// @observable walletsTopOrder =
	// 	localStorage.getItem('walletsTopOrder') &&
	// 	localStorage.getItem('walletsTopOrder').split(',');
	// @action setWalletsTopOrder = (value) => {
	// 	this.walletsTopOrder = value;
	// 	localStorage.setItem('walletsTopOrder', value);
	// };

	@observable expencesSum = localStorage.getItem('expencesSum');
	@action setExpencesSum = (value) => {
		this.expencesSum = value;
		localStorage.setItem(
			'expencesSum',
			value === undefined || isNaN(value) ? '' : value
		);
	};

	@observable incomeSum = localStorage.getItem('incomeSum');
	@action setIncomeSum = (value) => {
		this.incomeSum = value;
		localStorage.setItem(
			'incomeSum',
			value === undefined || isNaN(value) ? '' : value
		);
	};

	@observable editRecordSum = localStorage.getItem('editRecordSum');
	@action setEditRecordSum = (value) => {
		this.editRecordSum = value;
		localStorage.setItem(
			'editRecordSum',
			value === undefined || isNaN(value) ? '' : value
		);
	};

	@observable expencesWallet = localStorage.getItem('expencesWallet');
	@action setExpencesWallet = (value) => {
		this.expencesWallet = value;
		localStorage.setItem('expencesWallet', value);
	};

	@observable incomeWallet = localStorage.getItem('incomeWallet');
	@action setIncomeWallet = (value) => {
		this.incomeWallet = value;
		localStorage.setItem('incomeWallet', value);
	};

	@observable editRecordWallet = localStorage.getItem('editRecordWallet');
	@action setEditRecordWallet = (value) => {
		this.editRecordWallet = value;
		localStorage.setItem('editRecordWallet', value);
	};

	@observable editRecordWalletFrom = localStorage.getItem(
		'editRecordWalletFrom'
	);
	@action setEditRecordWalletFrom = (value) => {
		this.editRecordWalletFrom = value;
		localStorage.setItem('editRecordWalletFrom', value);
	};

	@observable editRecordWalletTo = localStorage.getItem('editRecordWalletTo');
	@action setEditRecordWalletTo = (value) => {
		this.editRecordWalletTo = value;
		localStorage.setItem('editRecordWalletTo', value);
	};

	@observable expencesCategory = localStorage.getItem('expencesCategory');
	@action setExpencesCategory = (value) => {
		this.expencesCategory = value;
		localStorage.setItem('expencesCategory', value);
		this.expencesSubcategory = '';
		localStorage.setItem('expencesSubcategory', '');
	};

	@observable incomeCategory = localStorage.getItem('incomeCategory');
	@action setIncomeCategory = (value) => {
		this.incomeCategory = value;
		localStorage.setItem('incomeCategory', value);
		this.incomeSubcategory = '';
		localStorage.setItem('incomeSubcategory', '');
	};

	@observable editRecordCategory = localStorage.getItem('editRecordCategory');
	@action setEditRecordCategory = (value) => {
		this.editRecordCategory = value;
		localStorage.setItem('editRecordCategory', value);
		if (this.editRecordCategory === '') {
			this.setEditRecordSubcategory('');
			// localStorage.setItem('editRecordSubcategory', '');
		}
	};

	@observable expencesSubcategory = localStorage.getItem('expencesSubcategory');
	@action setExpencesSubcategory = (value) => {
		this.expencesSubcategory = value;
		localStorage.setItem('expencesSubcategory', value);
	};

	@observable incomeSubcategory = localStorage.getItem('incomeSubcategory');
	@action setIncomeSubcategory = (value) => {
		this.incomeSubcategory = value;
		localStorage.setItem('incomeSubcategory', value);
	};

	@observable editRecordSubcategory = localStorage.getItem(
		'editRecordSubcategory'
	);
	@action setEditRecordSubcategory = (value) => {
		this.editRecordSubcategory = value;
		localStorage.setItem('editRecordSubcategory', value);
	};

	@observable expencesDate = localStorage.getItem('expencesDate');
	@action setExpencesDate = (value) => {
		this.expencesDate = value;
		localStorage.setItem('expencesDate', value);
	};

	@observable incomeDate = localStorage.getItem('incomeDate');
	@action setIncomeDate = (value) => {
		this.incomeDate = value;
		localStorage.setItem('incomeDate', value);
	};

	@observable editRecordDate = localStorage.getItem('editRecordDate');
	@action setEditRecordDate = (value) => {
		this.editRecordDate = value;
		localStorage.setItem('editRecordDate', value);
	};

	@observable expencesComment = localStorage.getItem('expencesComment');
	@action setExpencesComment = (value) => {
		this.expencesComment = value;
		localStorage.setItem('expencesComment', value);
	};

	@observable incomeComment = localStorage.getItem('incomeComment');
	@action setIncomeComment = (value) => {
		this.incomeComment = value;
		localStorage.setItem('incomeComment', value);
	};

	@observable editRecordComment = localStorage.getItem('editRecordComment');
	@action setEditRecordComment = (value) => {
		this.editRecordComment = value;
		localStorage.setItem('editRecordComment', value);
	};

	@observable openTransactionForm = false;
	@action setOpenTransactionForm = (value) => {
		this.openTransactionForm = value;
	};

	@observable openBetweenWalletsForm = false;
	@action setOpenBetweenWalletsForm = (value) => {
		this.openBetweenWalletsForm = value;
	};

	@observable openEditTransactionForm = false;
	@action setOpenEditTransactionForm = (value) => {
		this.openEditTransactionForm = value;
		if (value === false) {
			this.setEditRecordSum('');
			this.setEditRecordWallet('');
			this.setEditRecordWalletFrom('');
			this.setEditRecordWalletTo('');
			this.setEditRecordCategory('');
			this.setEditRecordSubcategory('');
			// this.setEditRecordDate('');
			this.setEditRecordComment('');
		}
	};

	@observable openEditWalletsForm = false;
	@action setOpenEditWalletsForm = (value) => {
		this.openEditWalletsForm = value;
	};

	@observable recordToEdit = {
		comment: '',
		date: '',
		expences: '',
		expences_sub: '',
		id: '',
		income: '',
		income_sub: '',
		sum: '',
		wallet: '',
		wallet_from: '',
		wallet_to: '',
	};
	@action setRecordToEdit = (value) => {
		this.recordToEdit = value;
		// localStorage.setItem('recordToEdit', value);
	};

	@observable walletToEdit = '';
	@action setWalletToEdit = (value) => {
		this.walletToEdit = value;
	};

	@observable tempWalletToEdit = '';
	@action setTempWalletToEdit = (value) => {
		this.tempWalletToEdit = value;
	};

	@observable openDialogRemoveRecord = false;
	@action setOpenDialogRemoveRecord = (value) => {
		this.openDialogRemoveRecord = value;
	};

	@observable openDialogRemoveWallet = false;
	@action setOpenDialogRemoveWallet = (value) => {
		this.openDialogRemoveWallet = value;
	};

	@observable openDialogUnableToRemoveWallet = false;
	@action setOpenDialogUnableToRemoveWallet = (value) => {
		this.openDialogUnableToRemoveWallet = value;
	};

	@observable openDialogRenameWallet = false;
	@action setOpenDialogRenameWallet = (value) =>
		(this.openDialogRenameWallet = value);

	@observable walletToRename;

	@observable openDrawer = false;
	@action setOpenDrawer = (value) => {
		this.openDrawer = value;
	};

	@observable formType = 'expences';
	@action setFormType = (value) => {
		this.formType = value;
	};

	@observable editRecordFormType = null;
	@action setEditRecordFormType = (value) => {
		this.editRecordFormType = value;
	};

	@observable anchorEl = null;
	@action setAnchorEl = (value) => {
		this.anchorEl = value;
	};

	@observable anchorEl2 = null;
	@action setAnchorEl2 = (value) => {
		this.anchorEl2 = value;
	};

	/// SAVE TRX

	@action.bound
	saveTrx = flow(function* (trx, history) {
		this.setLoading(true);
		// const userTrx = this.user.transactions;

		try {
			yield axios.post('/add-transaction', trx);
			this.user.wallets[trx.wallet] = trx.updatedWallet;
			let tempTrx = trx;
			delete tempTrx.updatedWallet;
			this.user.transactions.push(tempTrx);
			// this.user.transactions = userTrx;
			this.setUser(this.user);
			this.setLoading(false);
			this.setOpenTransactionForm(false);
			if (this.formType === 'expences') {
				this.setExpencesSum('');
				this.setExpencesComment('');
			}
			if (this.formType === 'income') {
				this.setIncomeSum('');
				this.setIncomeComment('');
			}
			history.push('/data');
		} catch (err) {
			this.setLoading(false);
			history.push('/');
			console.error(err);
		}
	});

	/// DELETE TRX

	@action.bound
	deleteTrx = flow(function* (data) {
		const {
			id,
			wallet,
			updWallet,
			wallet_from,
			updWallet_from,
			wallet_to,
			updWallet_to,
		} = data;
		this.setLoading(true);

		try {
			yield axios.post('/delete-transaction', data);
			if (wallet === null) {
				this.user.wallets[wallet_from] = updWallet_from;
				this.user.wallets[wallet_to] = updWallet_to;
			}
			if (wallet !== null) {
				this.user.wallets[wallet] = updWallet;
			}
			const newTransactions = this.user.transactions.filter((obj) => {
				return obj.id !== id;
			});
			this.user.transactions = newTransactions;
			this.setUser(this.user);
			this.setLoading(false);
		} catch (err) {
			this.setLoading(false);
			console.error(err);
		}
	});

	/// EDIT TRX

	@action.bound
	editTrx = flow(function* (data, history) {
		this.setLoading(true);
		try {
			yield axios.post('/edit-transaction', data);
			const updTransactions = this.user.transactions.filter((obj) => {
				return obj.id !== data.oldRecord.id;
			});
			this.user.transactions = updTransactions;
			this.user.transactions.push(data.newRecord);
			this.user.wallets = data.userWallets;
			this.setUser(this.user);
			this.setLoading(false);
			this.setOpenEditTransactionForm(false);
			history.push('/data');
		} catch (err) {
			this.setLoading(false);
			console.error(err);
		}
	});

	/// UPDATE WALLETS TOP ORDER

	@action.bound
	updateWalletsTopOrder = flow(function* (data) {
		// console.log(data);
		try {
			yield axios.post('/update-wallets-top-order', data);
			this.user.wallets_top_order = data.wallets_top_order;
			this.setUser(this.user);
			// this.setWalletsTopOrder(data.wallets_top_order);
		} catch (err) {
			// this.user.wallets_top_order = data.old_wallets_top_order;
			// this.setUser(this.user);
			// this.setWalletsTopOrder(data.old_wallets_top_order);
			this.logOutUser();
			window.location.href = '/';
			console.error(err);
		}
	});

	/// UPDATE WALLET

	@action.bound
	updateWallet = flow(function* (data) {
		try {
			yield axios.post('/update-wallet', data);
			this.setUser(this.user);
		} catch (err) {
			this.user.wallets[data.wallet] = data.old_wallet;
			this.setUser(this.user);
			this.logOutUser();
			window.location.href = '/';
			console.error(err);
		}
	});

	/// RENAME WALLET

	@action.bound
	renameWallet = flow(function* (data) {
		this.setLoading(true);
		const transactions = this.user.transactions.map((a) => ({ ...a }));
		// let transactions = [...this.user.transactions];
		transactions
			.filter((trx) => trx.wallet === data.old_wallet_name)
			.map((trx) => (trx.wallet = data.renamed_wallet));
		transactions
			.filter((trx) => trx.wallet_from === data.old_wallet_name)
			.map((trx) => (trx.wallet_from = data.renamed_wallet));
		transactions
			.filter((trx) => trx.wallet_to === data.old_wallet_name)
			.map((trx) => (trx.wallet_to = data.renamed_wallet));
		let thisData = data;
		thisData.transactions = transactions;

		try {
			yield axios.post('/rename-wallet', data);
			console.log('OLEEEEEE');
			this.user.transactions
				.filter((trx) => trx.wallet === data.old_wallet_name)
				.map((trx) => (trx.wallet = data.renamed_wallet));
			this.user.transactions
				.filter((trx) => trx.wallet_from === data.old_wallet_name)
				.map((trx) => (trx.wallet_from = data.renamed_wallet));
			this.user.transactions
				.filter((trx) => trx.wallet_to === data.old_wallet_name)
				.map((trx) => (trx.wallet_to = data.renamed_wallet));
			let wallets = this.user.wallets;
			wallets[data.renamed_wallet] = data.old_wallet_value;
			delete wallets[data.old_wallet_name];
			// this.setWalletsTopOrder(data.wallets_top_order);
			this.user.wallets_order = data.wallets_order;
			this.user.wallets_top_order = data.wallets_top_order;
			this.user.wallets[data.renamed_wallet] = data.old_wallet_value;
			delete this.user.wallets[data.old_wallet_name];
			this.setUser(this.user);
			this.setLoading(false);
			this.setOpenDialogRenameWallet(false);
		} catch (err) {
			this.setLoading(false);
			this.logOutUser();
			window.location.href = '/';
			console.error(err);
		}
	});

	/// DELETE WALLET

	@action.bound
	deleteWallet = flow(function* (data) {
		const { wallet } = data;
		this.setLoading(true);
		try {
			yield axios.post('/delete-wallet', data);
			this.user.wallets_order = this.user.wallets_order
				.slice(0, this.user.wallets_order.indexOf(wallet))
				.concat(
					this.user.wallets_order.slice(
						this.user.wallets_order.indexOf(wallet) + 1
					)
				);
			this.user.wallets_top_order = this.user.wallets_top_order
				.slice(0, this.user.wallets_top_order.indexOf(wallet))
				.concat(
					this.user.wallets_top_order.slice(
						this.user.wallets_top_order.indexOf(wallet) + 1
					)
				);
			delete this.user.wallets[wallet];
			this.setUser(this.user);
			this.setLoading(false);
			this.setOpenDialogRemoveWallet(false);
		} catch (err) {
			this.setLoading(false);
			this.logOutUser();
			window.location.href = '/';
			console.error(err);
		}
	});
}

export const store = new Store();
