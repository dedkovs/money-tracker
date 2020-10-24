import React from 'react';
import MenuButton1 from './MenuButton1';
import MenuButton2 from './MenuButton2';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const MenuButton = () => {
	const matches = useMediaQuery('(min-width:600px)');

	return <>{matches ? <MenuButton1 /> : <MenuButton2 />}</>;
};

export default MenuButton;
