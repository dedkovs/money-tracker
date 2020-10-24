import React from 'react';
import { inject, observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import NumberFormat from 'react-number-format';
import { toJS } from 'mobx';

const useStyles = makeStyles(() => ({
	topWalletsContainer: {
		display: 'flex',
		maxWidth: 'calc(100% - 90px)',
		height: 50,
		overflowY: 'hidden',
		overflowX: 'auto',
	},
	walletContainer: {
		padding: '0 10px',
		margin: '0 10px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		minHeight: 50,
		minWidth: 'unset',
		textTransform: 'none',
		opacity: 0.8,
		border: '1px solid rgba(255,255,255,0.5)',
		borderRadius: 5,
	},
	'@media (max-width: 600px)': {
		scrollButtonsDesktop: {
			display: 'inline-flex',
		},
	},
	'@media (max-width: 360px)': {
		scrollButtonsDesktop: {
			display: 'none',
		},
	},
}));

const TopWallets = inject('store')(
	observer(({ store }) => {
		const classes = useStyles();
		// const w = toJS(store.walletsTopOrder);
		// console.log(typeof store.walletsTopOrder);
		// console.log(store.walletsTopOrder);

		return (
			<div className={classes.topWalletsContainer}>
				<Tabs
					// style={{ display: 'flex' }}
					value={false}
					variant="scrollable"
					scrollButtons="auto"
					indicatorColor="primary"
					classes={{ scrollButtonsDesktop: classes.scrollButtonsDesktop }}
				>
					{/* {store.user.wallets_top_order.map((wallet) => { */}

					{store.user.wallets_top_order
						.filter((wallet) => store.user.wallets[wallet][1] === 'show')
						.map((wallet) => {
							return (
								<Tab
									onClick={(event) => {
										store.setOpenDrawer(false);
										store.setAnchorEl(null);
										store.setAnchorEl2(event.currentTarget);
										// store.setWalletToEdit(wallet);
										// console.log(store.walletToEdit);
									}}
									key={wallet}
									className={classes.walletContainer}
									icon={
										<div>
											<Typography
												// style={{ fontFamily: 'Circe' }}
												variant={'body2'}
												align={'center'}
											>
												{wallet}
											</Typography>
											<Typography
												style={{ fontFamily: 'Circe' }}
												variant={'body2'}
												align={'center'}
											>
												<NumberFormat
													value={store.user.wallets[wallet][0]}
													displayType={'text'}
													thousandSeparator={' '}
													decimalSeparator={','}
													decimalScale={store.showCents ? 2 : 0}
													fixedDecimalScale={true}
												/>
											</Typography>
										</div>
									}
								></Tab>
							);
						})}
				</Tabs>
			</div>
		);
	})
);

export default TopWallets;
