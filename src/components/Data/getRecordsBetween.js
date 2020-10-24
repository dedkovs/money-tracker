import React from 'react';
import Record from '../Record/Record';

const getRecordsBetween = (records) => {
	return records
		.filter((record) => record.wallet === null)
		.sort(function (a, b) {
			return b.sum - a.sum;
		})
		.map((record) => {
			return <Record key={record.id} record={record} />;
		});
};

export default getRecordsBetween;
