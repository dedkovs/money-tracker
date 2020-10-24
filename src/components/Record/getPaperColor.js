import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	backgroundExpencesLight1: {
		backgroundColor: theme.palette.common.backgroundExpencesLight1,
	},
	backgroundExpencesDark1: {
		backgroundColor: theme.palette.common.backgroundExpencesDark1,
	},
	backgroundIncomeLight1: {
		backgroundColor: theme.palette.common.backgroundIncomeLight1,
	},
	backgroundIncomeDark1: {
		backgroundColor: theme.palette.common.backgroundIncomeDark1,
	},
	backgroundBetweenLight1: {
		backgroundColor: theme.palette.common.backgroundBetweenLight1,
	},
	backgroundBetweenDark1: {
		backgroundColor: theme.palette.common.backgroundBetweenDark1,
	},
}));

const getPaperColor = (store, sum, wallet) => {
	const classes = useStyles();

	const {
		backgroundExpencesLight1,
		backgroundExpencesDark1,
		backgroundIncomeLight1,
		backgroundIncomeDark1,
		backgroundBetweenLight1,
		backgroundBetweenDark1,
	} = classes;

	if (sum < 0 && wallet) {
		return `${
			store.themeType === 'light'
				? backgroundExpencesLight1
				: backgroundExpencesDark1
		}`;
	}
	if (sum > 0 && wallet) {
		return `${
			store.themeType === 'light'
				? backgroundIncomeLight1
				: backgroundIncomeDark1
		}`;
	}
	return `${
		store.themeType === 'light'
			? backgroundBetweenLight1
			: backgroundBetweenDark1
	}`;
};

export default getPaperColor;
