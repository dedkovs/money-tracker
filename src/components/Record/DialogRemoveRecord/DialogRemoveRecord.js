import React from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import getData from './getData';

const useStyles = makeStyles(() => ({
	dialog: {
		borderRadius: 20,
	},
	dialogActions: {
		display: 'flex',
		justifyContent: 'center',
		paddingBottom: 20,
		paddingTop: 0,
	},
	button: {
		margin: '0 10px',
	},
}));

const DialogRemoveRecord = inject('store')(
	observer(({ store }) => {
		const { openDialogRemoveRecord: open, setOpenDialogRemoveRecord } = store;
		const classes = useStyles();

		return (
			<Dialog
				classes={{
					// root: classes.dialogRoot,
					// paperFullWidth: classes.paperFullWidth,
					// paperWidthSm: classes.paperWidthSm,
					paper: classes.dialog,
				}}
				open={open}
				onClose={() => setOpenDialogRemoveRecord(false)}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogContent>
					<DialogContentText align={'center'} id="alert-dialog-description">
						Удалить запись?
					</DialogContentText>
				</DialogContent>
				<DialogActions className={classes.dialogActions}>
					<Button
						className={classes.button}
						variant={'outlined'}
						onClick={() => setOpenDialogRemoveRecord(false)}
						autoFocus
					>
						Нет
					</Button>
					<Button
						className={classes.button}
						variant={'outlined'}
						onClick={() => {
							store.deleteTrx(getData(store));
							setOpenDialogRemoveRecord(false);
						}}
					>
						Да
					</Button>
				</DialogActions>
			</Dialog>
		);
	})
);

export default DialogRemoveRecord;
