import React from 'react';
import { inject, observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme) => ({
	FormExpencesSelectWalletsContainer: {
		display: 'flex',
		paddingLeft: 20,
		marginTop: 15,
	},
	FormExpencesEditIcon: {
		position: 'relative',
	},
	FormExpencesCreateIconRoot: {
		position: 'relative',
		top: 10,
	},
	formControl: {
		width: 270,
		marginRight: 10,
	},
	selectEmpty: {
		marginTop: theme.spacing(0),
	},
	select01: {
		'& select': {
			padding: '5px 0px',
			fontWeight: 400,
		},
	},
}));

const Subcategory = inject('store')(
	observer(({ store }) => {
		const classes = useStyles();

		const getSubcategories = () => {
			if (store.formType === 'expences' && store.expencesCategory === '')
				return [''];
			if (store.formType === 'expences' && store.expencesCategory !== '')
				return store.user.expences_categories[store.expencesCategory].map(
					(item) => (
						<option key={item} value={item}>
							{item}
						</option>
					)
				);
			if (store.formType === 'income' && store.incomeCategory === '')
				return [''];
			if (store.formType === 'income' && store.incomeCategory !== '')
				return store.user.income_categories[store.incomeCategory].map(
					(item) => (
						<option key={item} value={item}>
							{item}
						</option>
					)
				);
		};

		return (
			<div className={classes.FormExpencesSelectWalletsContainer}>
				<FormControl variant="standard" className={classes.formControl}>
					<InputLabel
						className={classes.label}
						htmlFor="outlined-age-native-simple"
					>
						{'Подкатегория'}
					</InputLabel>
					<Select
						className={classes.select01}
						native
						value={
							store.formType === 'expences'
								? store.expencesSubcategory
								: store.incomeSubcategory
						}
						onChange={(event) =>
							store.formType === 'expences'
								? store.setExpencesSubcategory(event.target.value)
								: store.setIncomeSubcategory(event.target.value)
						}
						label={'Подкатегория'}
					>
						<option aria-label="None" value="" />
						{getSubcategories()}
					</Select>
				</FormControl>
				<div>
					<IconButton
						onClick={() => {}}
						className={classes.FormExpencesCreateIconRoot}
					>
						<CreateIcon className={classes.FormExpencesEditIcon} />
					</IconButton>
				</div>
			</div>
		);
	})
);

export default Subcategory;
