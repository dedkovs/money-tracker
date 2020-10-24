import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';

const useStyles = makeStyles((theme) => ({
	walletText: {
		fontFamily: 'Ubuntu, Roboto, sans-serif',
		fontWeight: 'bold',
		borderRadius: 5,
		padding: '0 5px',
	},
	walletBackgroundLight: {
		backgroundColor: 'rgba(255,255,255,0.5)',
	},
	walletBackgroundDark: {
		backgroundColor: 'rgba(255,255,255,0.3)',
	},
	walletContainer: {
		position: 'absolute',
		left: 37,
		top: 3,
	},
	walletContainer2: {
		position: 'absolute',
		left: 37,
		top: 41,
	},
	textExpencesLight1: {
		color: theme.palette.common.textExpencesLight1,
	},
	textExpencesDark1: {
		color: theme.palette.common.textExpencesDark1,
	},
	textIncomeLight1: {
		color: theme.palette.common.textIncomeLight1,
	},
	textIncomeDark1: {
		color: theme.palette.common.textIncomeDark1,
	},
	textBetweenLight1: {
		color: theme.palette.common.textBetweenLight1,
	},
	textBetweenDark1: {
		color: theme.palette.common.textBetweenDark1,
	},
}));

const Wallet = inject('store')(
	observer(({ store, record: { wallet, sum }, class1, value }) => {
		const classes = useStyles();

		const getTextColor1 = () => {
			if (store.themeType === 'light') {
				if (sum < 0) return `${classes.textExpencesLight1}`;
				if (sum > 0 && wallet) return `${classes.textIncomeLight1}`;
				return `${classes.textBetweenLight1}`;
			}
			if (store.themeType === 'dark') {
				if (sum < 0) return `${classes.textExpencesDark1}`;
				if (sum > 0 && wallet) return `${classes.textIncomeDark1}`;
				return `${classes.textBetweenDark1}`;
			}
		};

		return (
			<div className={`${classes[class1]} ${getTextColor1()}`}>
				<Typography
					className={`${classes.walletText} ${
						store.themeType === 'light'
							? classes.walletBackgroundLight
							: classes.walletBackgroundDark
					}`}
					variant={'subtitle2'}
				>
					{value}
				</Typography>
			</div>
		);
	})
);

export default Wallet;
