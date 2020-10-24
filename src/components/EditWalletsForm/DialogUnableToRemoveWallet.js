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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
	dialog: {
		borderRadius: 10,
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
	paper1: {
		position: 'absolute',
		top: 135,
		margin: 0,
		borderRadius: 20,
		width: 330,
		height: 250,
		minWidth: 330,
	},
	paper2: {
		borderRadius: 20,
		width: 330,
		height: 250,
		minWidth: 330,
	},
}));

const DialogUnableToRemoveWallet = inject('store')(
	observer(({ store }) => {
		const classes = useStyles();
		const matches = useMediaQuery('(min-width:600px)');
		const {
			openDialogUnableToRemoveWallet: open,
			setOpenDialogUnableToRemoveWallet,
		} = store;
		return (
			<Dialog
				style={{ zIndex: 1305 }}
				open={open}
				onClose={() => setOpenDialogUnableToRemoveWallet(false)}
				classes={{
					// root: classes.dialogRoot,
					// paperFullWidth: classes.paperFullWidth,
					// paperWidthSm: classes.paperWidthSm,
					paper: `${matches ? classes.paper1 : classes.paper2}`,
				}}
			>
				<DialogContent>
					<DialogContentText>
						Невозможно удалить кошелёк, по&nbsp;которому существуют операции.
						<br />
						<br />
						Вы можете скрыть данный кошелёк, либо сначала удалите все операции,
						в которых он участвует.
					</DialogContentText>
				</DialogContent>
				<DialogActions
					style={{ padding: 0, paddingBottom: 18, justifyContent: 'center' }}
					// className={classes.dialogActions}
				>
					<Button
						variant={'outlined'}
						// className={classes.button}
						// variant={'contained'}
						onClick={() => setOpenDialogUnableToRemoveWallet(false)}
						autoFocus
					>
						Ок
					</Button>
				</DialogActions>
			</Dialog>
		);
	})
);

export default DialogUnableToRemoveWallet;
