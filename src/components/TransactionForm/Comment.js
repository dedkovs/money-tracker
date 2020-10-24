import React from 'react';
import { inject, observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			width: 270,
		},
		'& .MuiInputBase-root': {
			padding: 0,
		},
	},
	FormExpencesSelectWalletsContainer: {
		display: 'flex',
		paddingLeft: 20,
		marginTop: 5,
	},
	FormExpencesEditIcon: {
		position: 'relative',
	},
	FormExpencesCreateIconRoot: {
		position: 'relative',
		padding: '10px !important',
		top: '-7px !important',
		left: '-2px !important',
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
			padding: '10px 0px 3px 13px',
			fontWeight: 600,
		},
	},
	label: {
		transform: 'translate(14px, 8px) scale(1)',
	},
}));

const Comment = inject('store')(
	observer(({ store }) => {
		const classes = useStyles();

		const handleChange = (event) => {
			store.formType === 'expences'
				? store.setExpencesComment(event.target.value)
				: store.setIncomeComment(event.target.value);
		};

		return (
			<form
				style={{ marginLeft: 20, marginTop: 15 }}
				className={classes.root}
				noValidate
				autoComplete="off"
			>
				<TextField
					id="outlined-multiline-flexible"
					label="Комментарий"
					multiline
					value={
						store.formType === 'expences'
							? store.expencesComment
							: store.incomeComment
					}
					onChange={handleChange}
					variant="standard"
					rowsMax={4}
					style={{ padding: 0 }}
					InputProps={{
						style: {
							width: 270,
							fontSize: '0.9rem',
						},
					}}
					size={'medium'}
				/>
			</form>
		);
	})
);

export default Comment;
