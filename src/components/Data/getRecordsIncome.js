import React from 'react';
import Record from '../Record/Record';

const getRecordsIncome = (records) => {
	return records
		.filter((record) => record.wallet !== null && record.sum > 0)
		.sort(function (a, b) {
			return b.sum - a.sum;
		})
		.map((record) => {
			return <Record key={record.id} record={record} />;
		});
};

export default getRecordsIncome;
