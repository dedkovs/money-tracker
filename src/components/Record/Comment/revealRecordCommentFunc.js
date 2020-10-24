const revealRecordCommentFunc = (
	x,
	y,
	wrapperRef,
	recordMenuButtonRef,
	collapsed,
	setCollapsed,
	e
) => {
	let isRightMB;
	e = e || window.event;

	if ('which' in e)
		// Gecko (Firefox), WebKit (Safari/Chrome) & Opera
		isRightMB = e.which == 3;
	else if ('button' in e)
		// IE, Opera
		isRightMB = e.button == 2;

	if (
		e.clientX > x - 5 &&
		e.clientX < x + 5 &&
		e.clientY > y - 5 &&
		e.clientY < y + 5 &&
		!isRightMB
	) {
		if (
			wrapperRef.current.contains(e.target) &&
			!recordMenuButtonRef.current.contains(e.target)
		) {
			setCollapsed(!collapsed);

			if (wrapperRef.current.nextSibling.style.maxHeight) {
				wrapperRef.current.nextSibling.style.maxHeight = null;
			} else {
				wrapperRef.current.nextSibling.style.maxHeight =
					wrapperRef.current.nextSibling.scrollHeight + 20 + 'px';
			}
		}
	} else return;
};

export default revealRecordCommentFunc;
