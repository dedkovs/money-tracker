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
			fontWeight: 600,
		},
	},
}));

const Category = inject('store')(
	observer(({ store }) => {
		const classes = useStyles();

		return (
			<div className={classes.FormExpencesSelectWalletsContainer}>
				<FormControl variant="standard" className={classes.formControl}>
					<InputLabel
						className={classes.label}
						htmlFor="outlined-age-native-simple"
					>
						{'Категория'}
					</InputLabel>
					<Select
						className={classes.select01}
						native
						value={store.editRecordCategory}
						onChange={(event) =>
							store.setEditRecordCategory(event.target.value)
						}
						label={'Категория'}
					>
						<option aria-label="None" value="" />
						{store.editRecordFormType === 'expences'
							? store.user.expences_categories_order.map((item) => (
									<option key={item} value={item}>
										{item}
									</option>
							  ))
							: store.user.income_categories_order.map((item) => (
									<option key={item} value={item}>
										{item}
									</option>
							  ))}
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

export default Category;
