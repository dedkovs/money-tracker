import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

const useStyles = makeStyles(() => ({
	tooltip: {
		fontSize: '0.9rem',
	},
	closeIcon: {
		right: 0,
		top: 0,
	},
	FormExpencesHeader: {
		position: 'relative',
		display: 'flex',
		justifyContent: 'space-between',
		paddingLeft: 20,
		'& > h3': {
			margin: 0,
			fontSize: '1.6rem',
		},
		// paddingTop: 0,
	},
	FormExpencesLinkExpences: {
		// position: 'relative',
		color: '#40a7e2',
		paddingTop: 8,
		opacity: 1,
		// paddingTop: 0,
	},
	FormIncomeLinkIncome: {
		// position: 'relative',
		color: '#59af35',
		paddingTop: 8,
		opacity: 1,
		// paddingTop: 0,
	},
}));

const Header = inject('store')(
	observer(({ store }) => {
		const classes = useStyles();
		const history = useHistory();

		const expencesHeader = (
			<Typography className={classes.FormExpencesLinkExpences} variant={'h5'}>
				Расход
			</Typography>
		);

		const incomeHeader = (
			<Typography className={classes.FormIncomeLinkIncome} variant={'h5'}>
				Доход
			</Typography>
		);

		return (
			<div className={classes.FormExpencesHeader}>
				{store.editRecordFormType === 'expences' && expencesHeader}
				{store.editRecordFormType === 'income' && incomeHeader}

				<Tooltip
					title={'Закрыть'}
					placement="bottom"
					enterDelay={500}
					classes={{ tooltip: classes.tooltip }}
				>
					<IconButton
						onClick={() => {
							history.push('/data');
							store.setOpenEditTransactionForm(false);
						}}
						className={classes.closeIcon}
					>
						<CloseIcon />
					</IconButton>
				</Tooltip>
			</div>
		);
	})
);

export default Header;
