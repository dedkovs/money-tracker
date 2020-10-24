import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
	ThemeProvider,
	createMuiTheme,
	makeStyles,
} from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import { useHistory, BrowserRouter } from 'react-router-dom';
import DialogContent from '@material-ui/core/DialogContent';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag } from './utils';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import { toJS } from 'mobx';
import NumberFormat from 'react-number-format';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import Checkbox from '@material-ui/core/Checkbox';
import DialogRenameWallet from './DialogRenameWallet';
import DialogRemoveWallet from './DialogRemoveWallet';
import DialogUnableToRemoveWallet from './DialogUnableToRemoveWallet';

const useStyles = makeStyles(() => ({
	paperFullWidth: {
		width: '100%',
	},
	paperWidthSm: {
		minWidth: 340,
		maxWidth: 360,
	},
	paper1: {
		position: 'absolute',
		top: 80,
		margin: 0,
		borderRadius: 20,
	},
	paper2: {
		borderRadius: 20,
	},
	dialogContent1: {
		overflow: 'hidden',
		height: 500,
		padding: 0,
		'&:first-child': {
			paddingTop: 0,
		},
	},
	tooltip: {
		fontSize: '0.9rem',
	},
	closeIcon: {
		right: 0,
		top: 0,
		position: 'absolute',
	},
	card: {
		width: 330,
		height: 165,
		margin: '0 auto',
		boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.15)',
		// border: '1px solid rgba(0, 0, 0, 0.1)',
		// border: '1px solid rgba(77, 135, 189, 0.3)',
		borderRadius: 20,
		marginBottom: 20,
		backgroundColor: 'rgba(0, 100, 255, 0.1)',
	},
	cardShow: {
		opacity: 1,
	},
	cardHidden: {
		opacity: 0.5,
	},
	cardsContainerLevelUp: {
		position: 'relative',
		// position: 'fixed',
		// margin: '0 auto',
		height: 450,
		overflowY: 'auto',
		'&::-webkit-scrollbar': {
			display: 'none',
		},
		// overflow: 'hidden',
	},
	cardsContainer: {
		position: 'relative',
		// height: 720,
		// height: '100%',
		// backgroundColor: 'tomato',
		// marginTop: 15,
		// overflowY: 'scroll',
		// overflowX: 'hidden',
		// '&::-webkit-scrollbar': {
		// 	display: 'none',
		// },
		// paddingBottom: 50,
	},
	headerContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		// backgroundColor: 'green',
		height: 55,
		// position: 'absolute',
	},
	header: {
		paddingTop: 10,
		paddingLeft: 15,
	},
	dragIndicator: {
		position: 'absolute',
		color: '#a3a3a3',
		cursor: 'pointer',
	},
	cardContent: {
		padding: 10,
		'&:last-child': { paddingBottom: 10 },
	},
	sum: {
		marginLeft: 30,
		marginTop: -2,
		// fontWeight: 'bold',
		// color: 'rgb(0, 131, 212)',
		color: '#4d87bd',
		// fontSize: '1.2em',
		fontFamily: 'Circe',
	},
	wallet: {
		marginLeft: 30,
		fontWeight: 'bold',
		marginTop: -4,
		// fontFamily: 'Circe',
	},
	buttonsContainer: {
		display: 'flex',
		// justifyContent: 'space-between',
		marginLeft: 30,
		marginTop: 5,
	},
	button1: {
		width: 115,
		height: 30,
		fontSize: '0.8em',
	},
	button2: {
		width: 70,
		height: 30,
		marginLeft: 15,
		fontSize: '0.8em',
	},
	button3: {
		width: 60,
		height: 30,
		fontSize: '0.8em',
	},
	button4: {
		marginTop: -4,
		marginRight: 7,
	},
	initSum: {
		fontSize: '0.9em',
		color: 'grey',
	},
	initSumContainer: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	FormExpencesEditIcon: {
		position: 'relative',
		fontSize: '0.8em',
	},
	FormExpencesCreateIconRoot: {
		padding: 7,
		position: 'relative',
		marginLeft: 30,
		top: '-3px',
		width: 38,
	},
	initSumSum: {
		color: 'grey',
		paddingTop: 7,
		fontFamily: 'Circe',
	},
}));

const EditTransactionForm = inject('store')(
	observer(({ store }) => {
		const classes = useStyles();
		const matches = useMediaQuery('(min-width:600px)');
		const history = useHistory();

		const theme = createMuiTheme({
			palette: {
				type: store.themeType,
				primary: {
					main: store.editRecordFormType === 'expences' ? '#40a7e2' : '#59af35',
				},
			},
		});

		const buttonColor1 = createMuiTheme({
			palette: {
				type: store.themeType,
				primary: {
					main: '#E6E6E6',
				},
			},
		});

		// console.log(
		// 	toJS(store.walletsTopOrder).length * 150 +
		// 		toJS(store.walletsTopOrder).length * 30
		// );

		return (
			<>
				<ThemeProvider theme={theme}>
					<BrowserRouter>
						<Dialog
							style={{ zIndex: 1302 }}
							open={store.openEditWalletsForm}
							onClose={() => {
								store.setOpenEditWalletsForm(false);
								history.push('/data');
							}}
							classes={{
								root: classes.dialogRoot,
								paperFullWidth: classes.paperFullWidth,
								paperWidthSm: classes.paperWidthSm,
								paper: `${matches ? classes.paper1 : classes.paper2}`,
							}}
							fullWidth
							maxWidth="sm"
						>
							<DialogContent className={classes.dialogContent1}>
								<div className={classes.headerContainer}>
									<Typography className={classes.header} variant={'h5'}>
										Кошельки
									</Typography>
									<Tooltip
										title={'Закрыть'}
										placement="bottom"
										enterDelay={500}
										classes={{ tooltip: classes.tooltip }}
									>
										<IconButton
											onClick={() => {
												history.push('/data');
												store.setOpenEditWalletsForm(false);
											}}
											className={classes.closeIcon}
										>
											<CloseIcon />
										</IconButton>
									</Tooltip>
								</div>
								<div className={classes.cardsContainerLevelUp}>
									<div
										className={classes.cardsContainer}
										// style={{
										// 	height: () =>
										// 		toJS(store.walletsTopOrder).length * 150 +
										// 		toJS(store.walletsTopOrder).length * 30,
										// }}
									>
										<Container
											style={{ height: '100%' }}
											lockAxis="y"
											onDrop={(e) => {
												const old_wallets_top_order =
													store.user.wallets_top_order;
												const wallets_top_order = applyDrag(
													store.user.wallets_top_order,
													e
												);
												// console.log(wallets_top_order);
												// console.log(toJS(old_wallets_top_order));
												let x = 0;
												for (let i = 0; i < wallets_top_order.length; i++) {
													if (
														wallets_top_order[i] ===
														toJS(old_wallets_top_order)[i]
													)
														x++;
												}
												if (x === wallets_top_order.length) return;
												// console.log(x);
												// if (wallets_top_order === toJS(old_wallets_top_order))
												// 	return;
												store.user.wallets_top_order = wallets_top_order;
												store.updateWalletsTopOrder({
													wallets_top_order: wallets_top_order,
													old_wallets_top_order: old_wallets_top_order,
												});
											}}
											dragHandleSelector=".dragIndicator"
										>
											{store.user.wallets_top_order.map((wallet) => (
												<Draggable key={wallet}>
													<Card
														elevation={0}
														className={`
														${classes.card} ${
															store.user.wallets[wallet][1] === 'show'
																? classes.cardShow
																: classes.cardHidden
														}
													`}
													>
														<CardContent className={classes.cardContent}>
															<DragIndicatorIcon
																className={`${classes.dragIndicator} dragIndicator`}
															/>
															<Typography
																className={classes.sum}
																variant={'h6'}
															>
																{/* {store.user.wallets[wallet][0]} */}
																<NumberFormat
																	value={store.user.wallets[wallet][0]}
																	displayType={'text'}
																	thousandSeparator={' '}
																	decimalSeparator={','}
																	decimalScale={store.showCents ? 2 : 0}
																	fixedDecimalScale={true}
																/>
															</Typography>
															<Typography className={classes.wallet}>
																{wallet}
															</Typography>
															<div className={classes.buttonsContainer}>
																{/* <ThemeProvider theme={buttonColor1}> */}
																<Button
																	className={classes.button1}
																	// type={'submit'}
																	// variant="contained"
																	variant={'outlined'}
																	// color="primary"
																	onClick={() => {
																		store.setWalletToEdit(wallet);
																		store.setTempWalletToEdit(wallet);
																		// console.log(store.walletToEdit);
																		store.setOpenDialogRenameWallet(true);
																	}}
																>
																	Переименовать
																</Button>
																<Button
																	className={classes.button2}
																	type={'submit'}
																	// variant="contained"
																	variant={'outlined'}
																	// color="primary"
																	onClick={() => {
																		store.setWalletToEdit(wallet);
																		store.setOpenDialogRemoveWallet(true);
																	}}
																>
																	Удалить
																</Button>
																{/* </ThemeProvider> */}
															</div>
															<div
																style={{
																	display: 'flex',
																	justifyContent: 'space-between',
																	marginTop: 10,
																	marginLeft: 30,
																}}
															>
																<Typography
																	// variant={'body2'}
																	className={classes.initSum}
																>
																	Начальная сумма:
																</Typography>
																<Typography
																	// variant={'body2'}
																	className={classes.initSum}
																>
																	Скрытый:
																</Typography>
															</div>
															<div className={classes.initSumContainer}>
																<div style={{ display: 'flex' }}>
																	<IconButton
																		// onClick={() => {}}
																		className={
																			classes.FormExpencesCreateIconRoot
																		}
																	>
																		<CreateIcon
																			className={classes.FormExpencesEditIcon}
																		/>
																	</IconButton>
																	<Typography className={classes.initSumSum}>
																		<NumberFormat
																			value={store.user.wallets[wallet][2]}
																			// value={100000000000}
																			displayType={'text'}
																			thousandSeparator={' '}
																			decimalSeparator={','}
																			decimalScale={store.showCents ? 2 : 0}
																			fixedDecimalScale={true}
																		/>
																	</Typography>
																</div>
																<Checkbox
																	className={classes.button4}
																	// defaultChecked
																	checked={
																		store.user.wallets[wallet][1] === 'show'
																			? false
																			: true
																	}
																	onChange={() => {
																		const old_wallet =
																			store.user.wallets[wallet];
																		const new_wallet = [
																			store.user.wallets[wallet][0],
																			store.user.wallets[wallet][1] === 'show'
																				? 'hidden'
																				: 'show',
																			store.user.wallets[wallet][2],
																		];
																		store.user.wallets[wallet] = new_wallet;
																		store.updateWallet({
																			wallet: wallet,
																			value: new_wallet,
																			old_wallet: old_wallet,
																		});
																		// console.log(toJS(old_wallet));
																		// console.log(toJS(new_wallet));
																	}}
																	color="default"
																	inputProps={{
																		'aria-label': 'checkbox with default color',
																	}}
																/>
															</div>
														</CardContent>
													</Card>
												</Draggable>
											))}
										</Container>
									</div>
								</div>
							</DialogContent>
						</Dialog>
					</BrowserRouter>
				</ThemeProvider>
				<DialogRenameWallet />
				<DialogRemoveWallet />
				<DialogUnableToRemoveWallet />
			</>
		);
	})
);

export default EditTransactionForm;
