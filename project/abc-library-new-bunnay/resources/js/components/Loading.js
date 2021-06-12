import React from 'react';

export const Loading = props => {
	return (
		<div
			className='d-flex justify-content-center align-items-center m-5'
			style={{ height: props.height || '100vh' }}
		>
			<div
				className='spinner-border'
				role='status'
				style={{ width: props.size || '4rem', height: props.size || '4rem' }}
			>
				<span className='sr-only'></span>
			</div>
		</div>
	);
};

export const LoadingButton = props => {
	return (
		<button
			className={
				'form-control btn btn-' +
				(props.color || 'primary') +
				' rounded submit px-3'
			}
			type='button'
			disabled
		>
			<span
				className='spinner-border spinner-border-sm'
				role='status'
				aria-hidden='true'
			></span>
		</button>
	);
};
