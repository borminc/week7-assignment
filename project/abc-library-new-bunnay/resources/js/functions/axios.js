import axios from 'axios';
import { getCookie } from './cookies';

const defaultOptions = {
	headers: {
		'Content-Type': 'application/json',
	},
};

// Set the AUTH token for any request
axios.interceptors.request.use(function (config) {
	const token = getCookie('token');
	config.headers.Authorization = token ? `Bearer ${token}` : '';
	return config;
});

export default axios;
