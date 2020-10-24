import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Header from './Header';
import Sum from './Sum';
import Wallet from './Wallet';
import Arrow from './Arrow';
import Category from './Category';
import Subcategory from './Subcategory/Subcategory';
import Date from './Date';
import Comment from './Comment';
import SaveButton from './SaveButton/SaveButton';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	dialogContent1: {
		minHeight: 500,
		padding: 0,
		'&:first-child': {
			paddingTop: 0,
		},
	},
	// dialogContent2: {
	// 	height: '100%',
	// 	padding: 0,
	// 	'&:first-child': {
	// 		paddingTop: 0,
	// 	},
	// },
}));

const DialogContent1 = () => {
	const classes = useStyles();

	// const matches = useMediaQuery('(min-width:600px)');

	return (
		<DialogContent
			// className={`${matches ? classes.dialogContent1 : classes.dialogContent2}`}
			className={classes.dialogContent1}
		>
			<Header />
			<Sum />
			<Wallet />
			<Arrow />
			<Category />
			<Subcategory />
			<Date />
			<Comment />
			<SaveButton />
		</DialogContent>
	);
};

export default DialogContent1;
