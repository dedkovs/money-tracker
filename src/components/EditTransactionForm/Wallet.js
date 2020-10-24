import React from 'react';
import { inject, observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme) => ({
	FormExpencesSelectWalletsContainer: {
		display: 'flex',
		paddingLeft: 20,
		marginTop: 15,
	},
	FormExpencesEditIcon: {
		position: 'relative',
	},
	FormExpencesCreateIconRoot: {
		position: 'relative',
		top: '10px',
	},
	formControl: {
		width: 270,
		marginRight: 10,
	},
	selectEmpty: {
		marginTop: theme.spacing(0),
	},
	select01: {
		'& select': {
			padding: '5px 0px',
			fontWeight: 600,
		},
	},
}));

const Wallet = inject('store')(
	observer(({ store }) => {
		const classes = useStyles();

		return (
			<div className={classes.FormExpencesSelectWalletsContainer}>
				<FormControl className={classes.formControl}>
					<InputLabel
						className={classes.label}
						htmlFor="outlined-age-native-simple"
						color={'primary'}
					>
						{'Кошелёк'}
					</InputLabel>
					<Select
						className={classes.select01}
						native
						value={store.editRecordWallet}
						onChange={(event) => store.setEditRecordWallet(event.target.value)}
						label={'Кошелёк'}
						inputProps={{
							name: 'wallet',
						}}
					>
						{store.user.wallets_order.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</Select>
				</FormControl>
				<div>
					<IconButton
						onClick={() => {}}
						className={classes.FormExpencesCreateIconRoot}
					>
						<CreateIcon className={classes.FormExpencesEditIcon} />
					</IconButton>
				</div>
			</div>
		);
	})
);

export default Wallet;
