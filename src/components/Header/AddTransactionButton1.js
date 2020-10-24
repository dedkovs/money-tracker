import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
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

const AddTransactionButton1 = inject('store')(
	observer(({ store }) => {
		const classes = useStyles();

		return (
			<Tooltip
				title={'Добавить новую запись'}
				placement="bottom"
				classes={{ tooltip: classes.tooltip }}
				arrow
				enterDelay={500}
			>
				<Button
					className={classes.button}
					onClick={() => {
						store.setOpenDrawer(false);
						store.setAnchorEl(null);
						store.setOpenTransactionForm(true);
					}}
					component={Link}
					to="/data/add-transaction"
				>
					<AddIcon className={classes.addIcon} />
				</Button>
			</Tooltip>
		);
	})
);

export default AddTransactionButton1;
