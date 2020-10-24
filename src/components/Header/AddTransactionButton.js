import React from 'react';
import AddTransactionButton1 from './AddTransactionButton1';
import AddTransactionButton2 from './AddTransactionButton2';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const AddTransactionButton = () => {
	const matches = useMediaQuery('(min-width:600px)');

	return <>{matches ? <AddTransactionButton1 /> : <AddTransactionButton2 />}</>;
};

export default AddTransactionButton;
