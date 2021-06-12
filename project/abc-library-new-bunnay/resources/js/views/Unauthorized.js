import axios from '../functions/axios';
import { set } from 'lodash';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';

import { setCookie, getCookie, deleteCookie } from '../functions/cookies';

const Unauthorized = () => {
	const history = useHistory();
	return (
		<div>
			<h1 className='text-center p-5'>Unauthorized</h1>
			<button className='btn btn-primary' onClick={() => history.push('/')}>
				Go back home
			</button>
		</div>
	);
};

export default Unauthorized;
