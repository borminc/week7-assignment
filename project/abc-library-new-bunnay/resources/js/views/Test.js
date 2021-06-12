import axios from './../functions/axios';
import { set } from 'lodash';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';

import { setCookie, getCookie, deleteCookie } from '../functions/cookies';

const Test = () => {
	return (
		<div>
			<h1 className='text-center p-5'>Test</h1>
		</div>
	);
};

export default Test;
