import React from 'react';
import CustomButton from '../CustomButton';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import ButtonSpinner from './ButtonSpinner';

const useStyles = makeStyles(() => ({
	linkContainer: {
		display: 'flex',
		justifyContent: 'center',
	},
	linkContainer2: {
		marginTop: '2.5em',
		marginBottom: '1.5em',
	},
	button: {
		display: 'block',
		position: 'relative',
		margin: '0 auto',
	},
}));

const SubmitButton = inject('store')(
	observer(({ store, text }) => {
		const classes = useStyles();

		return (
			<div className={(classes.linkContainer, classes.linkContainer2)}>
				<CustomButton
					type={'submit'}
					className={classes.button}
					disabled={store.loading}
				>
					{text}
					{store.loading && <ButtonSpinner />}
				</CustomButton>
			</div>
		);
	})
);

export default SubmitButton;
