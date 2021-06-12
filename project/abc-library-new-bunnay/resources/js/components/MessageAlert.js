import React from 'react';

const MessageAlert = ({ msg, success }) => {
	return (
		<div
			className={'alert alert-' + (success === 1 ? 'success' : 'danger')}
			role='alert'
		>
			{msg}
		</div>
	);
};

export default MessageAlert;
