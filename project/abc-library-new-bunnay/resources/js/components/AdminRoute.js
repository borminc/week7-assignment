import axios from 'axios';
import { set } from 'lodash';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';

import { setCookie, getCookie, deleteCookie } from '../functions/cookies';
import { Loading } from './Loading';

const AdminRoute = props => {
	const [loginStatus, setLoginStatus] = useState(0);
	// -2=unauthorized; -1=not logged in; 0=loading; 1=logged in

	if (!getCookie('token')) {
		<Redirect push to='/login' />;
	}

	useEffect(() => {
		axios
			.get('/api/auth/admin')
			.then(res => {
				// Authorized
				if (res.data.is_admin) {
					setLoginStatus(1);
				} else {
					setLoginStatus(-2);
				}
			})
			.catch(err => {
				// Unauthorized
				deleteCookie('token');
				setLoginStatus(-1);
			});
	}, []);

	switch (loginStatus) {
		case 0:
			return <Loading />;
		case 1:
			return <div> {props.component} </div>;
		case -1:
			return <Redirect push to='/login' />;
		case -2:
			return <Redirect push to='/unauthorized' />;
	}
};

export default AdminRoute;
