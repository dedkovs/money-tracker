import React from 'react';
import { inject, observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles((theme) => ({
	sumContainer: {
		display: 'flex',
		height: '100%',
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingRight: 10,
	},
	sumText: {
		// fontFamily: 'Quicksand',
		fontFamily: 'Circe',
		fontSize: '1.5rem',
		lineHeight: '1em',
		paddingLeft: 5,
		zIndex: 1,
		borderRadius: 10,
	},
	whiteColor: {
		color: 'white',
	},
	textExpencesLight1: {
		color: theme.palette.common.textExpencesLight1,
	},
	textIncomeLight1: {
		color: theme.palette.common.textIncomeLight1,
	},
	textBetweenLight1: {
		color: theme.palette.common.textBetweenLight1,
	},
	backgroundExpencesLight1: {
		backgroundColor: theme.palette.common.backgroundExpencesLight1,
	},
	backgroundIncomeLight1: {
		backgroundColor: theme.palette.common.backgroundIncomeLight1,
	},
	backgroundBetweenLight1: {
		backgroundColor: theme.palette.common.backgroundBetweenLight1,
	},
	backgroundExpencesDark1: {
		backgroundColor: theme.palette.common.backgroundExpencesDark1,
	},
	backgroundIncomeDark1: {
		backgroundColor: theme.palette.common.backgroundIncomeDark1,
	},
	backgroundBetweenDark1: {
		backgroundColor: theme.palette.common.backgroundBetweenDark1,
	},
}));

const Sum = inject('store')(
	observer(({ store, sum, wallet }) => {
		const classes = useStyles();

		const getTextColor = () => {
			if (store.themeType === 'light') {
				if (sum < 0) return classes.backgroundExpencesLight1;
				if (sum > 0 && wallet) return classes.backgroundIncomeLight1;
				return classes.backgroundBetweenLight1;
			}
			if (store.themeType === 'dark') {
				if (sum < 0) return classes.backgroundExpencesDark1;
				if (sum > 0 && wallet) return classes.backgroundIncomeDark1;
				return classes.backgroundBetweenDark1;
			}
		};

		const getBackgroundColor = () => {
			if (store.themeType === 'light') {
				if (sum < 0) return classes.textExpencesLight1;
				if (sum > 0 && wallet) return classes.textIncomeLight1;
				return classes.textBetweenLight1;
			}
		};

		return (
			<div className={classes.sumContainer}>
				<Typography
					className={`${
						classes.sumText
					} ${getTextColor()} ${getBackgroundColor()}`}
				>
					<NumberFormat
						value={sum}
						displayType={'text'}
						thousandSeparator={' '}
						prefix={sum > 0 && wallet ? '+' : ''}
						decimalSeparator={','}
						decimalScale={store.showCents ? 2 : 0}
						fixedDecimalScale={true}
					/>
				</Typography>
			</div>
		);
	})
);

export default Sum;
