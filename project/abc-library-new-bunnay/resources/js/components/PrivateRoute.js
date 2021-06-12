import axios from 'axios';
import { set } from 'lodash';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';

import { setCookie, getCookie, deleteCookie } from './../functions/cookies';
import { Loading } from './Loading';

const PrivateRoute = props => {
	const [loginStatus, setLoginStatus] = useState(0); // -1=not logged in; 0=loading; 1=logged in

	if (!getCookie('token')) {
		<Redirect push to='/login' />;
	}

	useEffect(() => {
		axios
			.get('/api/auth/user')
			.then(res => {
				// Authorized
				setLoginStatus(1);
			})
			.catch(err => {
				// Unauthorized
				deleteCookie('token');
				setLoginStatus(-1);
			});
	}, []);

	if (loginStatus === 0) {
		return <Loading />;
	} else if (loginStatus === 1) {
		return <div> {props.component} </div>;
	}

	return <Redirect push to='/login' />;

	switch (loginStatus) {
		case 0:
			return <Loading />;
		case 1:
			return <div> {props.component} </div>;
		case -1:
			return <Redirect push to='/login' />;
	}
};

export default PrivateRoute;
