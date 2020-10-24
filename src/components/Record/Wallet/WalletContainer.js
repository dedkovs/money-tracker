import React from 'react';
import { inject, observer } from 'mobx-react';
import Wallet from './Wallet';

const WalletContainer = inject('store')(
	observer(({ record: { wallet, wallet_from, wallet_to }, record }) => {
		return (
			<>
				{wallet && (
					<Wallet value={wallet} class1={'walletContainer'} record={record} />
				)}

				{wallet_from && (
					<Wallet
						value={wallet_from}
						class1={'walletContainer'}
						record={record}
					/>
				)}

				{wallet_to && (
					<Wallet
						value={wallet_to}
						class1={'walletContainer2'}
						record={record}
					/>
				)}
			</>
		);
	})
);

export default WalletContainer;
