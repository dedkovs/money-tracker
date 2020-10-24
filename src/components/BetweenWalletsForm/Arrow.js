import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';

const useStyles = makeStyles(() => ({
	'@keyframes rotateup': {
		from: {
			transform: 'rotate3d(1, 0, 0, -90deg)',
		},
		to: {
			transform: 'rotate3d(1, 0, 0, -180deg)',
		},
	},
	'@keyframes rotatedown': {
		from: {
			transform: 'rotate3d(1, 0, 0, 90deg)',
		},
		to: {
			transform: 'rotate3d(1, 0, 0, 0deg)',
		},
	},
	FormExpencesArrow: {
		position: 'relative',
		width: 270,
		marginLeft: 20,
		marginTop: 15,
		height: 15,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		animationDuration: '1s',
	},
	arrowDown: {
		backgroundImage: 'url("../images/arrow-down.svg")',
		transform: 'rotate3d(1, 0, 0, 0deg)',
		animationName: '$rotatedown',
	},

	arrowUp: {
		backgroundImage: 'url("../images/arrow-up.svg")',
		transform: 'rotate3d(1, 0, 0, -180deg)',
		animationName: '$rotateup',
	},
}));

const Arrow = inject('store')(
	observer(({ store }) => {
		const classes = useStyles();

		const getArrow = () => {
			if (store.formType === 'expences') return classes.arrowDown;
			if (store.formType === 'income') return classes.arrowUp;
		};

		return <div className={`${classes.FormExpencesArrow} ${getArrow()}`}></div>;
	})
);

export default Arrow;
