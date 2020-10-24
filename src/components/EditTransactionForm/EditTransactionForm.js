import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
	ThemeProvider,
	createMuiTheme,
	makeStyles,
} from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import { useHistory, BrowserRouter } from 'react-router-dom';
import DialogContent from './DialogContent';

const useStyles = makeStyles(() => ({
	paperFullWidth: {
		width: '100%',
	},
	paperWidthSm: {
		minWidth: 340,
		maxWidth: 360,
	},
	paper1: {
		position: 'absolute',
		top: 80,
		margin: 0,
		borderRadius: 20,
	},
	paper2: {
		borderRadius: 20,
	},
}));

const EditTransactionForm = inject('store')(
	observer(({ store }) => {
		const classes = useStyles();
		const matches = useMediaQuery('(min-width:600px)');
		const history = useHistory();

		const theme = createMuiTheme({
			palette: {
				type: store.themeType,
				primary: {
					main: store.editRecordFormType === 'expences' ? '#40a7e2' : '#59af35',
				},
			},
		});

		return (
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Dialog
						style={{ zIndex: 1302 }}
						open={store.openEditTransactionForm}
						onClose={() => {
							store.setOpenEditTransactionForm(false);
							history.push('/data');
						}}
						classes={{
							root: classes.dialogRoot,
							paperFullWidth: classes.paperFullWidth,
							paperWidthSm: classes.paperWidthSm,
							paper: `${matches ? classes.paper1 : classes.paper2}`,
						}}
						fullWidth
						maxWidth="sm"
					>
						<DialogContent />
					</Dialog>
				</BrowserRouter>
			</ThemeProvider>
		);
	})
);

export default EditTransactionForm;
