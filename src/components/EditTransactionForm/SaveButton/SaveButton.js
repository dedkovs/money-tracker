import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { amber } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router';
import getData from './getData';

axios.defaults.baseURL =
	'https://europe-west2-keep-track-of-the-budget.cloudfunctions.net/api';

// axios.defaults.baseURL =
// 	'http://localhost:5000/keep-track-of-the-budget/europe-west2/api';

const useStyles = makeStyles(() => ({
	saveButtonContainer: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '2.5em',
		marginBottom: '2.5em',
	},
	spinner2: {
		position: 'absolute',
		left: 0,
		right: 0,
		marginLeft: 'auto',
		marginRight: 'auto',
		top: 3,
	},
}));

const SaveButton = inject('store')(
	observer(({ store }) => {
		const classes = useStyles();

		const history = useHistory();

		const spinnerColor = createMuiTheme({
			palette: {
				type: store.themeType,
				primary: {
					main: amber[500],
				},
			},
		});

		return (
			<div className={classes.saveButtonContainer}>
				<Button
					type={'submit'}
					variant="contained"
					color="primary"
					onClick={() => {
						if (
							store.editRecordSum !== '' &&
							Math.abs(store.editRecordSum) !== 0 &&
							!isNaN(store.editRecordSum)
						)
							store.editTrx(getData(store), history);
					}}
				>
					Сохранить
					{store.loading && (
						<ThemeProvider theme={spinnerColor}>
							<CircularProgress size={30} className={classes.spinner2} />
						</ThemeProvider>
					)}
				</Button>
			</div>
		);
	})
);

export default SaveButton;
