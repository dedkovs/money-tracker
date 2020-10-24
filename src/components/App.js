// HEY YOU !!!

import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Signin from './Signin/Signin';
import Signup from './Signup/Signup';
import Data from './Data/Data';
import TransactionForm from './TransactionForm/TransactionForm';
import EditTransactionForm from './EditTransactionForm/EditTransactionForm';
import EditWalletsForm from './EditWalletsForm/EditWalletsForm';
import { inject, observer } from 'mobx-react';
// import DialogRenameWallet from './EditWalletsForm/DialogRenameWallet';
import { toJS } from 'mobx';

const App = inject('store')(
	observer(({ store }) => {
		// const arr = store.user.transactions.filter((trx) => trx.comment === '3');

		// console.log(
		// 	toJS(store.user.transactions.filter((trx) => trx.wallet === 'Кошелёк'))
		// );

		// console.log(toJS(store.user.transactions[1].wallet));
		// console.log(arr.map((trx) => toJS(trx)));

		// console.log(store.openDialogRenameWallet);
		return (
			<BrowserRouter>
				<Switch>
					<Route
						exact
						path="/"
						render={() =>
							store.authenticated === true ? (
								<Redirect to="/data" />
							) : (
								<Signin
									animated={store.animated}
									setAnimated={store.setAnimated}
								/>
							)
						}
					/>
					<Route
						exact
						path="/signup"
						render={() =>
							store.authenticated === true ? (
								<Redirect to="/data" />
							) : (
								<Signup />
							)
						}
					/>
					<Route
						exact
						path="/data"
						render={() => {
							// if (store.openDialogRenameWallet === true)
							// 	store.setOpenDialogRenameWallet(false);
							store.setOpenDialogRemoveWallet(false);
							store.setOpenDialogRenameWallet(false);
							store.setOpenTransactionForm(false);
							return store.authenticated === true ? (
								<>
									<Data />
								</>
							) : (
								<Redirect to="/" />
							);
						}}
					/>
					<Route
						exact
						path="/data/add-transaction"
						render={() => {
							store.setOpenTransactionForm(true);
							store.setOpenDrawer(false);
							return store.authenticated === true ? (
								<>
									<Data />
									<TransactionForm />
								</>
							) : (
								<Redirect to="/" />
							);
						}}
					/>
					<Route
						exact
						path="/data/edit-transaction"
						render={() => {
							store.setOpenEditTransactionForm(true);
							return store.authenticated === true ? (
								<>
									<Data />
									<EditTransactionForm />
								</>
							) : (
								<Redirect to="/" />
							);
						}}
					/>
					<Route
						exact
						path="/data/edit-wallets"
						render={() => {
							store.setOpenEditWalletsForm(true);
							return store.authenticated === true ? (
								<>
									<Data />
									<EditWalletsForm />
									{/* <DialogRenameWallet /> */}
								</>
							) : (
								<Redirect to="/" />
							);
						}}
					/>
				</Switch>
			</BrowserRouter>
		);
	})
);

export default App;
