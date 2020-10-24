import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	backgroundExpencesLight2: {
		backgroundColor: theme.palette.common.backgroundExpencesLight2,
	},
	backgroundExpencesDark2: {
		backgroundColor: theme.palette.common.backgroundExpencesDark2,
	},
	backgroundIncomeLight2: {
		backgroundColor: theme.palette.common.backgroundIncomeLight2,
	},
	backgroundIncomeDark2: {
		backgroundColor: theme.palette.common.backgroundIncomeDark2,
	},
	backgroundBetweenLight2: {
		backgroundColor: theme.palette.common.backgroundBetweenLight2,
	},
	backgroundBetweenDark2: {
		backgroundColor: theme.palette.common.backgroundBetweenDark2,
	},
}));

const getCommentContainerColor = (sum, wallet, store) => {
	const classes = useStyles();

	const {
		backgroundExpencesLight2,
		backgroundExpencesDark2,
		backgroundIncomeLight2,
		backgroundIncomeDark2,
		backgroundBetweenLight2,
		backgroundBetweenDark2,
	} = classes;

	if (sum < 0 && wallet)
		return `${
			store.themeType === 'light'
				? backgroundExpencesLight2
				: backgroundExpencesDark2
		}`;
	if (sum > 0 && wallet) {
		return `${
			store.themeType === 'light'
				? backgroundIncomeLight2
				: backgroundIncomeDark2
		}`;
	}
	return `${
		store.themeType === 'light'
			? backgroundBetweenLight2
			: backgroundBetweenDark2
	}`;
};

export default getCommentContainerColor;
