import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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

const getTextColor = (sum, wallet, store) => {
	const classes = useStyles();

	const {
		textExpencesLight1,
		textExpencesDark1,
		textIncomeLight1,
		textIncomeDark1,
		textBetweenLight1,
		textBetweenDark1,
	} = classes;

	if (store.themeType === 'light') {
		if (sum < 0) return textExpencesLight1;
		if (sum > 0 && wallet) return textIncomeLight1;
		return textBetweenLight1;
	}
	if (store.themeType === 'dark') {
		if (sum < 0) return textExpencesDark1;
		if (sum > 0 && wallet) return textIncomeDark1;
		return textBetweenDark1;
	}
};

export default getTextColor;
