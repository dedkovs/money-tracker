import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { ru } from 'date-fns/locale';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';

const useStyles = makeStyles(() => ({
	root: {
		'& > *': {
			width: 270,
			margin: '15px 0 0 20px',
		},
	},
}));

const Date = inject('store')(
	observer(({ store }) => {
		const handleDateChange = (date) => {
			store.setEditRecordDate(date);
		};

		const classes = useStyles();

		return (
			<div className={classes.root} autoComplete="off">
				<MuiPickersUtilsProvider locale={ru} utils={DateFnsUtils}>
					<DatePicker
						DialogProps={{
							style: { zIndex: 1310 },
						}}
						format={'dd MMMM yyy'}
						cancelLabel={'отмена'}
						inputVariant={'standard'}
						value={store.editRecordDate}
						onChange={handleDateChange}
						animateYearScrolling
						minDate={'01/01/2000'}
						todayLabel={'сегодня'}
						showTodayButton={true}
					/>
				</MuiPickersUtilsProvider>
			</div>
		);
	})
);

export default Date;
