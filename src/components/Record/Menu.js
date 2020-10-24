import React from 'react';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

const useStyles = makeStyles(() => ({
	menuItem: {
		fontSize: '1rem',
		minHeight: 'unset',
		'&:hover': {
			backgroundColor: 'rgba(0,0,0,0.1)',
		},
		lineHeight: '1.2',
	},
}));

const Menu1 = inject('store')(
	observer(({ store }) => {
		const {
			anchorEl,
			recordToEdit: record,
			setOpenDialogRemoveRecord,
			setAnchorEl,
		} = store;
		const classes = useStyles();

		const getEditRecordFormType = () => {
			if (record.wallet !== null && record.sum < 0) return 'expences';
			if (record.wallet !== null && record.sum > 0) return 'income';
			if (record.wallet === null) return 'between';
		};

		const getEditRecordCategory = () => {
			if (store.editRecordFormType === 'expences') return record.expences;
			if (store.editRecordFormType === 'income') return record.income;
		};

		const getEditRecordSubcategory = () => {
			if (store.editRecordFormType === 'expences') return record.expences_sub;
			if (store.editRecordFormType === 'income') return record.income_sub;
		};

		return (
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={() => setAnchorEl(null)}
				PaperProps={{
					style: {
						boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
						transform: 'translate(30px, -15px)',
					},
				}}
			>
				<MenuItem
					classes={{ root: classes.menuItem }}
					onClick={() => {
						store.setAnchorEl(null);
						store.setEditRecordFormType(getEditRecordFormType());
						store.setRecordToEdit(record);
						store.setEditRecordSum(record.sum);
						store.setEditRecordWallet(record.wallet);
						store.setEditRecordWalletFrom(record.wallet_from);
						store.setEditRecordWalletTo(record.wallet_to);
						store.setEditRecordCategory(getEditRecordCategory());
						store.setEditRecordSubcategory(getEditRecordSubcategory());
						store.setEditRecordDate(new Date(record.date));
						store.setEditRecordComment(record.comment);
						store.setOpenEditTransactionForm(true);
					}}
					component={Link}
					to="/data/edit-transaction"
				>
					Редактировать
				</MenuItem>
				<MenuItem
					classes={{ root: classes.menuItem }}
					onClick={() => {
						store.setAnchorEl(null);
						setOpenDialogRemoveRecord(true);
					}}
				>
					Удалить
				</MenuItem>
			</Menu>
		);
	})
);

export default Menu1;
