import axios from './../functions/axios';
// import { set } from 'lodash';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { setCookie, getCookie, deleteCookie } from '../functions/cookies';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { data } from 'jquery';
import { Loading } from './../components/Loading';

const Home = props => {
	const history = useHistory();
	const [by, setBy] = useState('title');
	const [value, setValue] = useState('');
	const [search, setSearch] = useState();
	const [books, setBook] = useState([]);
	const [categories, setCategory] = useState([]);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleClick = (data, id) => {
		console.log('Id is', id);
		console.log('Search', data.title);
		setShow(true);
	};

	const [isProcessing, setProcessing] = useState(false);

	// delete this (don't get books from server when loading home page)
	// useEffect(() => {
	// 	axios.get('/api/books').then(res => {
	// 		setBook(res.data);
	// 		console.log(res.data);
	// 	});
	// }, []);

	useEffect(() => {
		axios.get('/api/categories').then(res => {
			setCategory(res.data);
		});
	}, []);

	const options = [
		{ name: 'Title', value: 'title' },
		{ name: 'Author', value: 'author' },
		{ name: 'Description', value: 'description' },
		{ name: 'Publisher', value: 'publisher' },
		{ name: 'Year', value: 'year' },
	];

	function handleChange(event) {
		const value = event.target.value;
		// temp = value.replace(/ /g,"+");
		// console.log(temp);
		setValue(value);
	}

	function selectedValueHandler(event) {
		const by = event.target.value;
		setBy(by);
	}

	function handleSubmit(event) {
		event.preventDefault();
		setProcessing(true);
		axios
			.get('/api/books/search?by=' + by + '&value=' + value)
			.then(res => {
				console.log(res.data);
				setSearch(res.data);
			})
			.catch(err => {
				console.log(err);
			})
			.finally(() => {
				setProcessing(false);
			});
	}

	const logoutHandler = () => {
		axios
			.get('/api/auth/logout')
			.then(res => {
				deleteCookie('token');
				history.push('/login');
			})
			.catch(err => {
				console.log(err);
			});
	};

	const renderSearchResult = () => {
		if (search && search.length == 0) {
			return <div>no result</div>;
		}
		return (
			<div className='pb-5'>
				<div className='row'>
					{search.map((value, i) => (
						<div key={i}>
							<div className='col-3' key={i}>
								<p className='text-center'>{value.title}</p>
								<img
									onClick={() => handleClick(value, i)}
									src={'https://picsum.photos/id/1/250/310'}
									className='img-fluid'
									alt='...'
								/>
							</div>
							<Modal
								size='xl'
								show={show}
								onHide={handleClose}
								dialogClassName='modal-90w'
								aria-labelledby={'modal-book' + value.id}
							>
								<Modal.Header>
									<Modal.Title id={'modal-book' + value.id}>
										ABC Library
									</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<div className='container'>
										<div className='row'>
											<div className='col-lg-3'>
												<img
													src={'https://picsum.photos/id/80/250/270'}
													className='img-fluid'
													alt='...'
												/>
											</div>
											<div className='col-lg-4'>
												<table className='table small'>
													<thead>
														<tr>
															<th className='display-6'>{value.title}</th>
															<th></th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td className='fw-bold'>Author</td>
															<td>{value.author}</td>
														</tr>
														<tr>
															<td className='fw-bold'>Publisher</td>
															<td>{value.title}</td>
														</tr>
														<tr>
															<td className='fw-bold'>Year</td>
															<td>{value.year}</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div className='col-lg-5'>
												<h4>Description</h4>
												<small>{value.description}</small>
												<br />
											</div>
										</div>
									</div>
								</Modal.Body>
								<Modal.Footer>
									<button className='bg-primary border border-0 text-white'>
										<Link to='/borrow'>Borrow</Link>
										{/* 
										After you fix the modal to show the correct book, you want to get the borrow button to send you to the correct page.
										
										Maybe do sth like this:
										<Link to={'/borrow/'+value.id}>Borrow</Link>

										so that you can get the id in the borrow page.
										for how to get the id from the url in the borrow page, look at this:
										https://stackoverflow.com/questions/35352638/react-how-to-get-parameter-value-from-query-string
										*/}
									</button>
								</Modal.Footer>
							</Modal>
						</div>
					))}
				</div>
			</div>
		);
	};

	const renderCategoriesAndNewBooks = () => {
		return (
			<div>
				<div>
					<div className='text-center pb-5'>
						<div className='container' data-aos='fade-up'>
							<h6 className='display-6 fw-bold text-info'>CATEGORY</h6>
							<div className='row justify-content-center mb-3'>
								<p className='text-wrap col-lg-6 text-secondary'>
									There are many variations of passages of Lorem Ipsum
									available, but the majority have suffered lebmid alteration in
									some ledmid form
								</p>
							</div>
							<OwlCarousel
								className='owl-theme justify-content-center'
								margin={20}
								nav
								autoWidth
							>
								{categories.map((cate, i) => (
									<div className='item' key={i}>
										<a href='/' className='text-decoration-none'>
											<div className='card'>
												<img
													src={'https://picsum.photos/id/30/200/150'}
													className='card-img-top'
													alt=''
												/>
												<div className='card-body'>
													<h5 className='card-title'>{cate.name}</h5>
												</div>
											</div>
										</a>
									</div>
								))}
							</OwlCarousel>
						</div>
					</div>

					<div className='jumbotron jumbotron-fluid text-center pb-5'>
						<div className='container'>
							<h6 className='display-6 fw-bold'>
								NEW <span className='text-info'>BOOKS</span>
							</h6>
							<div className='row justify-content-center mb-3'>
								<p className='text-wrap col-lg-6 text-secondary'>
									There are many variations of passages of Lorem Ipsum
									available, but the majority have suffered lebmid alteration in
									some ledmid form
								</p>
							</div>
							<div className='row'>
								<div className='col-3'>
									<img
										src={'https://picsum.photos/id/1/250/310'}
										className='img-fluid'
										alt='...'
									/>
								</div>
								<div className='col-3'>
									<img
										src={'https://picsum.photos/id/10/250/310'}
										className='img-fluid'
										alt='...'
									/>
								</div>
								<div className='col-3'>
									<a href='/'>
										<img
											src={'https://picsum.photos/id/130/250/310'}
											className='img-fluid'
											alt='...'
										/>
									</a>
								</div>
								<div className='col-3'>
									<a href='/'>
										<img
											src={'https://picsum.photos/id/169/250/310'}
											className='img-fluid'
											alt='...'
										/>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div>
			<header className='masthead'>
				<div className='container position-relative'>
					<div className='row justify-content-center'>
						<div className='col-xl-6'>
							<div className='text-center text-white'>
								<h1
									className='display-1  fw-bold'
									style={{ cursor: 'pointer' }}
									onClick={e => {
										setSearch(null); // reset search
									}}
								>
									ABC Library
								</h1>
								<p className='mb-5'>
									Part of ABC Library project. More than 1,000 + article books
									to borrow.
								</p>
								<form className='d-flex' onSubmit={handleSubmit}>
									<div className='input-group-lg'>
										<select
											className='form-select'
											onChange={selectedValueHandler}
										>
											{options.map(item => (
												<option key={item.value} value={item.value}>
													{item.name}
												</option>
											))}
										</select>
									</div>
									<div style={{ width: '10px' }}></div>
									<div className='input-group input-group-lg'>
										<input
											onChange={handleChange}
											className='form-control AutoFocus'
											type='text'
											placeholder='Search...'
										/>
										<button
											type='submit'
											className='btn btn-primary search-btn h-100'
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

			{isProcessing ? (
				<div style={{ height: '25%' }}>
					<Loading height='25vh' />
				</div>
			) : search ? (
				renderSearchResult()
			) : (
				renderCategoriesAndNewBooks()
			)}

			{/* {search.map((value,i) => (
            <Modal size="xl" show={show} onHide={handleClose} dialogClassName="modal-90w" aria-labelledby="modal-book" key={i}>
                <Modal.Header>
                    <Modal.Title id="modal-book">
                        ABC Library
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <img src={"https://picsum.photos/id/80/250/270"} className="img-fluid" alt="..." />
                            </div>
                            <div className="col-lg-4">
                                <table className="table small">
                                    <thead>
                                        <tr>
                                            <th className="display-6">{value.title}</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="fw-bold">Author</td>
                                            <td>{value.author}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Publisher</td>
                                            <td>{value.title}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Year</td>
                                            <td>{value.year}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-lg-5">
                                <h4>Description</h4>
                                <small>{value.description}</small><br/>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className = "bg-primary border border-0 text-white"><Link to ='/borrow'>Borrow</Link></button>
                </Modal.Footer>
            </Modal>
            ))} */}

			{/* <Link to='/borrow'>Register</Link> */}
			{/* <button className='btn btn-primary' onClick={logoutHandler}>
				Log out
			</button> */}
		</div>
	);
};

export default Home;
