import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Unauthorized from './views/Unauthorized';

import Login from './views/Login';
import Register from './views/Register';
import Home from './views/Home';
import Test from './views/Test';
import Admin from './views/Admin';
import NotFound from './views/NotFound';
import Search from './views/Search';
import Borrow from './views/Borrow';

import ABCNav from './components/ABCNav';

const Index = () => {
	return (
		<div>
			<ABCNav />
			<Router>
				<div>
					{/* <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/Login">About</Link>
                            </li>
                            <li>
                                <Link to="/users">Users</Link>
                            </li>
                        </ul>
                    </nav> */}

					<Switch>
						<Route path='/search'>
							<Search />
						</Route>
						<Route path='/borrow'>
							<Borrow />
						</Route>
						<Route path='/login'>
							<Login />
						</Route>
						<Route path='/register'>
							<Register />
						</Route>
						<Route path='/test'>
							<PrivateRoute component={<Test />} />
						</Route>
						<Route path='/admin'>
							<AdminRoute component={<Admin />} />
						</Route>

						<Route path='/unauthorized'>
							<Unauthorized />
						</Route>

						<Route exact path='/'>
							<Home />
						</Route>

						<Route>
							<NotFound />
						</Route>
					</Switch>
				</div>
			</Router>
		</div>
	);
};

export default Index;

if (document.getElementById('index')) {
	ReactDOM.render(<Index />, document.getElementById('index'));
}
