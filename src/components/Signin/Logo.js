import React from 'react';
import { inject, observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import LogoSrc from '../../images/money-tracker-logo-02-small.svg';

const useStyles = makeStyles((theme) => ({
	'@keyframes animation1': {
		from: { opacity: 0 },
		to: { opacity: 1 },
	},
	logo1: {
		display: 'block',
		margin: '0 auto',
		paddingTop: '2em',
		width: 200,
		[theme.breakpoints.down('sm')]: {
			width: 150,
			paddingTop: '1em',
		},
		opacity: 0,
	},
	logo2: {
		display: 'block',
		margin: '0 auto',
		paddingTop: '2em',
		width: 200,
		[theme.breakpoints.down('sm')]: {
			width: 150,
			paddingTop: '1em',
		},
		animationName: '$animation1',
		animationDuration: '2s',
		animationIterationCount: 1,
		animationFillMode: 'forwards',
	},
	logo3: {
		display: 'block',
		margin: '0 auto',
		paddingTop: '2em',
		width: 200,
		[theme.breakpoints.down('sm')]: {
			width: 150,
			paddingTop: '1em',
		},
		opacity: 1,
	},
}));

const Logo = inject('store')(
	observer(({ store }) => {
		const classes = useStyles();

		const { animated, setAnimated, logoLoaded, setLogoLoaded } = store;

		const getLogoClassName = () => {
			if (animated === true && logoLoaded === false) return classes.logo1;
			if (animated === true && logoLoaded === true) return classes.logo2;
			if (animated === false && logoLoaded === true) return classes.logo3;
		};

		return (
			<img
				id="logo"
				className={getLogoClassName()}
				src={LogoSrc}
				alt="Money Tracker Logo"
				onLoad={() => {
					if (sessionStorage.getItem('logoLoaded') !== true) {
						setLogoLoaded(true);
						sessionStorage.setItem('logoLoaded', true);
						setTimeout(() => {
							setAnimated(false);
							sessionStorage.setItem('animated', false);
						}, 2200);
					}
				}}
			/>
		);
	})
);

export default Logo;
