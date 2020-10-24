import React from 'react';
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';
import transformDate from './transformDate';
import getDaySumColor from './getDaySumColor';
import { inject, observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	dayHeader: {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: 5,
	},
	dayValue: {
		opacity: 0.8,
	},
	daySum: {
		paddingRight: 10,
		opacity: 0.6,
		fontFamily: 'Circe',
	},
	positiveColorLight: {
		color: theme.palette.common.textIncomeLight1,
	},
	positiveColorDark: {
		color: theme.palette.common.backgroundIncomeLight2,
	},
	negativeColorLight: {
		color: theme.palette.common.textExpencesLight1,
	},
	negativeColorDark: {
		color: theme.palette.common.backgroundExpencesLight2,
	},
	zeroColorLight: {
		color: theme.palette.common.textBetweenLight1,
	},
	zeroColorDark: {
		color: theme.palette.common.backgroundBetweenLight2,
	},
}));

const RecordsByDayHeader = inject('store')(
	observer(({ store, group }) => {
		const classes = useStyles();

		return (
			<div className={classes.dayHeader}>
				<Typography className={classes.dayValue} variant={'body1'}>
					{transformDate(group.day)}
				</Typography>
				<Typography
					className={`${classes.daySum} ${
						classes[getDaySumColor(store.themeType, group.sum)]
					}`}
					variant={'body1'}
				>
					<NumberFormat
						value={group.sum}
						displayType={'text'}
						thousandSeparator={' '}
						prefix={group.sum > 0 ? '+' : ''}
						decimalSeparator={','}
						decimalScale={store.showCents ? 2 : 0}
						fixedDecimalScale={true}
					/>
				</Typography>
			</div>
		);
	})
);

export default RecordsByDayHeader;
