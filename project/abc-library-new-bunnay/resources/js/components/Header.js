import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backgroundHead from '../assets/img/bg-masthead.jpg';

const Header = () => {
	return (
		<header
			className='masthead'
			style={{ backgroundImage: `url(${backgroundHead})` }}
		>
			<div className='container position-relative'>
				<div className='row justify-content-center'>
					<div className='col-xl-6'>
						<div className='text-center text-white'>
							<h1 className='display-1  fw-bold'>ABC Library</h1>
							<p className='mb-5'>Subtitle</p>
							<form>
								<div className='input-group input-group-lg'>
									<input
										className='form-control'
										type='text'
										placeholder='Search for title, author...'
										aria-label='Search for title, author...'
										aria-describedby='button-submit'
									/>
									<button
										className='btn btn-primary'
										id='button-submit'
										type='button'
									>
										Search
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
