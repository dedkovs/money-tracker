import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

const useStyles = makeStyles(() => ({
	tooltip: {
		fontSize: '0.9rem',
	},
	addIcon: {
		color: 'white',
	},
	button: {
		minHeight: 56,
		minWidth: 45,
		'@media (min-width:600px)': { minHeight: 64, minWidth: 64 },
	},
}));

const AddTransactionButton2 = inject('store')(
	observer(({ store }) => {
		const classes = useStyles();

		return (
			<IconButton
				onClick={() => {
					store.setOpenDrawer(false);
					store.setAnchorEl(null);
					store.setOpenTransactionForm(true);
				}}
				component={Link}
				to="/data/add-transaction"
			>
				<AddIcon className={classes.addIcon} />
			</IconButton>
		);
	})
);

export default AddTransactionButton2;
