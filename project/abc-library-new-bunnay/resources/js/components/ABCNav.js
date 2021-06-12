import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, {useEffect,useState} from 'react';

function ABCNav() {
	const [categories,setCategory] = useState ([]);
	useEffect(()=> {
        axios.get('/api/categories')
        .then(res => {
            setCategory(res.data);
        });
    },[]);
	return (
		<Navbar
			collapseOnSelect
			expand='lg'
			bg='light'
			variant='light'
			className='fixed-top p-3'
		>
			<Navbar.Brand href='/'>ABC Library</Navbar.Brand>
			<Navbar.Toggle aria-controls='responsive-navbar-nav' />
			<Navbar.Collapse
				id='responsive-navbar-nav'
				className='justify-content-center'
			>
				<Nav className='mr-auto'>
					<NavDropdown title='Category' id='collasible-nav-dropdown' class='p-2'>
						{categories.map((cate,i) => (
							<div key={i}>
								<NavDropdown.Item href='#action/3.1'>
									{cate.name}
								</NavDropdown.Item>
							</div>
						))}
					</NavDropdown>
				</Nav>
				<Nav>
					<Nav.Link href='#'>Login</Nav.Link>
					<Nav.Link href='#'>Register</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default ABCNav;
