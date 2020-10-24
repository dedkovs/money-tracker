import React from 'react';
import { inject, observer } from 'mobx-react';
import Header from '../Header/Header';
import Pagination from '@material-ui/lab/Pagination';
import WalletMenu from '../Header/WalletMenu';
import Menu from '../Record/Menu';
import DialogRemoveRecord from '../Record/DialogRemoveRecord/DialogRemoveRecord';
import getGroups from './getGroups';
import getRecordsBetween from './getRecordsBetween';
import getRecordsIncome from './getRecordsIncome';
import getRecordsExpences from './getRecordsExpences';
import RecordsByDayHeader from './RecordsByDayHeader';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	recordsContainer1: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	recordsContainer2: {
		display: 'block',
		maxWidth: 500,
		minWidth: 320,
		width: '95%',
		margin: '20px 0',
	},
	pagination: {
		marginTop: 15,
		'& > ul': {
			justifyContent: 'center',
		},
	},
	headerMonth: {
		fontSize: '1.5em',
		opacity: 0.7,
		margin: '0 auto',
		marginTop: 15,
		maxWidth: '500px',
		textAlign: 'center',
	},
	recordsGroupDate: {
		'& > :last-child': {
			marginBottom: 50,
		},
	},
}));

const Data = inject('store')(
	observer(({ store }) => {
		const [page, setPage] = React.useState(1);

		const headerMonth = getGroups(store)[page - 1]
			? getGroups(store)[page - 1].month
			: null;

		const classes = useStyles();

		return (
			<div style={{ minWidth: 360 }}>
				<Menu />
				<WalletMenu />
				<DialogRemoveRecord />
				<Header />

				<div className={classes.recordsContainer1}>
					{store.user.transactions.length > 0 ? (
						<>
							<Pagination
								className={classes.pagination}
								count={getGroups(store).length}
								page={page}
								onChange={(e, p) => setPage(p)}
							></Pagination>

							<div className={classes.headerMonth}>{headerMonth}</div>

							<div className={classes.recordsContainer2}>
								{getGroups(store)[page - 1]
									? getGroups(store)[page - 1].records.map((group) => {
											return (
												<div
													key={group.day}
													className={classes.recordsGroupDate}
												>
													<RecordsByDayHeader group={group} />

													{getRecordsBetween(group.records)}

													{getRecordsIncome(group.records)}

													{getRecordsExpences(group.records)}
												</div>
											);
									  })
									: setPage((page) => page - 1)}
							</div>
						</>
					) : null}
				</div>
			</div>
		);
	})
);

export default Data;
