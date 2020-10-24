import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { inject, observer } from 'mobx-react';
import getCommentContainerColor from './getCommentContainerColor';
import getTextColor from './getTextColor';
import getExpandClass from './getExpandClass';

const useStyles = makeStyles(() => ({
	commentContainer: {
		marginTop: -39,
		width: '100%',
		zIndex: -1,
		overflow: 'hidden',
		position: 'relative',
		fontSize: '1.1rem',
		fontStyle: 'italic',
		maxHeight: 27,
		transition: 'max-height 0.3s ease-in-out',
		borderRadius: 10,
		marginBottom: 22,

		'& pre': {
			display: 'inline-block',
			paddingLeft: 40,
			paddingTop: 25,
			paddingRight: 10,
			margin: 0,
			paddingBottom: 5,
			whiteSpace: 'pre-wrap',
			// whiteSpace: '-moz-pre-wrap',
			// whiteSpace: '-pre-wrap',
			// whiteSpace: '-o-pre-wrap',
			wordWrap: 'break-word',
		},
	},
}));

const Comment = inject('store')(
	observer(({ store, comment, id, sum, wallet, collapsed }) => {
		const classes = useStyles();

		const { commentContainer } = classes;

		return (
			<>
				{comment.trim() !== '' ? (
					<Paper
						id={`comment-${id}`}
						elevation={0}
						className={`${commentContainer} ${getCommentContainerColor(
							sum,
							wallet,
							store
						)} ${getTextColor(sum, wallet, store)}`}
					>
						<pre>{comment}</pre>
						<ExpandMoreIcon className={getExpandClass(collapsed)} />
					</Paper>
				) : null}
			</>
		);
	})
);

export default Comment;
