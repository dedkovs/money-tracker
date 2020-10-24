import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { store } from '../../mobx/store';

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
	},
	FormExpencesLinkExpences: {
		color: '#40a7e2',
		paddingTop: 8,
	},
	FormIncomeLinkExpences: {
		color:
			store.themeType === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
		paddingTop: 8,
		cursor: 'pointer',
	},
	FormExpencesLinkIncome: {
		color:
			store.themeType === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
		paddingTop: 8,
		paddingLeft: 10,
		cursor: 'pointer',
	},
	FormIncomeLinkIncome: {
		color: '#59af35',
		paddingTop: 8,
		paddingLeft: 10,
		opacity: 1,
	},
}));

const Header = inject('store')(
	observer(({ store }) => {
		const classes = useStyles();
		const history = useHistory();

		const getIncomeClassName = () => {
			if (store.formType === 'expences') {
				return classes.FormExpencesLinkIncome;
			}
			if (store.formType === 'income') {
				return classes.FormIncomeLinkIncome;
			}
		};

		const getExpencesClassName = () => {
			if (store.formType === 'expences') {
				return classes.FormExpencesLinkExpences;
			}
			if (store.formType === 'income') {
				return classes.FormIncomeLinkExpences;
			}
		};

		return (
			<div className={classes.FormExpencesHeader}>
				<Typography
					className={`${getExpencesClassName()}`}
					variant={'h5'}
					onClick={() => {
						if (store.formType !== 'expences') store.setFormType('expences');
					}}
				>
					Расход
				</Typography>

				<Typography
					className={`${getIncomeClassName()}`}
					variant={'h5'}
					onClick={() => {
						if (store.formType !== 'income') store.setFormType('income');
					}}
				>
					Доход
				</Typography>

				<Tooltip
					title={'Закрыть'}
					placement="bottom"
					enterDelay={500}
					classes={{ tooltip: classes.tooltip }}
				>
					<IconButton
						onClick={() => {
							history.push('/data');
							store.setOpenTransactionForm(false);
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
