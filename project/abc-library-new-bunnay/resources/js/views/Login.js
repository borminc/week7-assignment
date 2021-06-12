import axios from './../functions/axios';
import { set } from 'lodash';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import validator from 'validator';
import { useHistory, Link } from 'react-router-dom';

import { setCookie, getCookie, deleteCookie } from '../functions/cookies';
import { Loading, LoadingButton } from '../components/Loading';
import { loginUser } from '../functions/loginFunction';
import MessageAlert from '../components/MessageAlert';

const Login = () => {
	const history = useHistory();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [isProcessing, setProcessing] = useState(false);

	const [msg, setMsg] = useState({ text: '', success: 0 });
	const [errors, setErrors] = useState({
		email: false,
		password: false,
	});

	useEffect(() => {
		// if token exist -> login immediately
		if (getCookie('token')) {
			axios
				.get('/api/auth/user')
				.then(res => {
					if (history.length) history.goBack();
					else history.push('/');
				})
				.catch(err => {
					deleteCookie('token');
				});
		}
	}, []);

	const hasInputErrors = () => {
		if (!validator.isEmail(email)) {
			setErrors({ ...errors, email: true });
			return true;
		} else if (password === '') {
			setErrors({ ...errors, password: true });
			return true;
		}
	};

	const LogInHandler = () => {
		setProcessing(true);
		setMsg({ text: '', success: 0 });

		if (hasInputErrors()) {
			setProcessing(false);
			return;
		}

		var success = false;
		var isAdmin = false;
		const loginInfo = {
			email: email,
			password: password,
			remember_me: rememberMe,
		};

		axios
			.post('/api/auth/login', loginInfo)
			.then(res => {
				setCookie('token', res.data.access_token);
				success = true;
				isAdmin = res.data.is_admin || false;
			})
			.catch(err => {
				if (err.response.status == 500)
					var message = 'Internal server error. Try again later.';
				else var message = err.response.data.message;
				setMsg({
					text: message,
					success: 0,
				});
				deleteCookie('token');
			})
			.finally(() => {
				setProcessing(false);
				if (success) {
					if (isAdmin) {
						history.push('/admin');
						return;
					} else {
						if (history.length) history.goBack();
						else history.push('/');
					}
				}
			});
	};

	return (
		<div style={{ padding: '8rem 0' }}>
			<div className='row justify-content-center'>
				<div className='col-md-12 col-lg-10'>
					<div className='wrap d-md-flex'>
						<div
							className='img'
							style={{
								backgroundImage: `url("/img/bg-books.jpg")`,
								backgroundSize: 'cover',
								backgroundRepeat: 'no-repeat',
								backgroundPosition: 'center center',
								minWidth: '30vw',
							}}
						></div>
						<div className='p-4 p-md-5 w-100'>
							<div className='d-flex'>
								<div className='w-100'>
									<h6 className=''>ABC Library</h6>
									<h2 className='mb-4'>Log In</h2>
								</div>
							</div>

							{msg && msg.text && (
								<MessageAlert msg={msg.text} success={msg.success} />
							)}

							<form>
								<div className='form-group mb-3'>
									<input
										id='email'
										type='email'
										className={
											'form-control' + (errors.email ? ' is-invalid' : '')
										}
										placeholder='Email'
										onChange={e => {
											setEmail(e.target.value);
											setMsg({ text: '', success: 0 });
											setErrors({ ...errors, email: false });
										}}
										required
									/>
									{errors.email && (
										<small className='form-text text-danger'>
											Enter a valid email.
										</small>
									)}
								</div>
								<div className='form-group mb-3'>
									<input
										id='password'
										type='password'
										className={
											'form-control' + (errors.password ? ' is-invalid' : '')
										}
										placeholder='Password'
										onChange={e => {
											setPassword(e.target.value);
											setMsg({ text: '', success: 0 });
											if (e.target.value === '')
												setErrors({ ...errors, password: true });
											else setErrors({ ...errors, password: false });
										}}
										required
									/>
									{errors.password && (
										<small className='form-text text-danger'>
											This field is required.
										</small>
									)}
								</div>
								<div className='form-group'>
									{isProcessing ? (
										<LoadingButton />
									) : (
										<button
											type='button'
											className={
												'form-control btn btn-primary rounded submit px-3' +
												(errors.email || errors.password ? ' disabled' : '')
											}
											onClick={LogInHandler}
										>
											Sign In
										</button>
									)}
								</div>
								<div className='form-group d-md-flex mt-3 align-items-center'>
									<input
										type='checkbox'
										id='checkbox'
										onChange={e => setRememberMe(e.target.checked)}
									/>
									<label htmlFor='checkbox' className='text-left'>
										&ensp; Remember Me
									</label>
									{/* <div className="w-50 text-md-right">
											<a href="#">Forgot Password</a>
										</div> */}
								</div>
							</form>
							<p className='mt-5 text-center'>
								Don't have an account? &ensp;
								<Link to='/register'>Register</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
