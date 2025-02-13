import React, {useState } from 'react';
import './Header.css';
import { Navbar, Nav, Row, NavDropdown, Form, FormControl, Button, Container, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { useSelector } from 'react-redux';
import amazonLogo from './img/amazon.png';
import { search } from '../CartSlice/CartSlice';
import { useDispatch } from 'react-redux';

function Header({ setSearch }) {
	let logoNum = useSelector((state) => state.counter.logoNumber);
	const [query, setQuery] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSearch = (e) => {
		e.preventDefault();
		dispatch(search(query));
		setSearch(query);
		navigate(`/Search/${query}`);
	};

	return (
		<Container fluid className='position-relative mb-3 bg-dark' style={{ height: '77px' }}>
			<Navbar bg="dark" expand="lg" className="border-bottom position-fixed top-0 w-100 z-3" variant='dark'>
				<Navbar.Brand href="#home">
					<img
						alt="Amazon Logo"
						src={amazonLogo}
						width="100"
						className="d-inline-block align-top"
					/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Row className='w-100'>
					<Navbar.Collapse id="basic-navbar-nav">
						<Col lg={6}>
							<Form className="d-flex mx-2" onSubmit={handleSearch}>
								<FormControl
									type="text"
									placeholder="Search"
									className="mr-2 outline-0"
									onChange={(e) => setQuery(e.target.value)}
								/>
								<Button variant="outline-warning" type="submit" className='mx-4'>
									<FaSearch />
								</Button>
							</Form>
						</Col>
						<Col lg={6}>
							<Nav className="me-auto ms-5">
								<Nav.Link as={Link} to='/'>Home</Nav.Link>
								<Nav.Link as={Link} to='/'>Today's Deals</Nav.Link>
								<NavDropdown title="Your Account" id="basic-nav-dropdown margin">
									<NavDropdown.Item as={Link} to='/'>Your Account</NavDropdown.Item>
									<NavDropdown.Item as={Link} to='/'>Your Orders</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item as={Link} to='/'>Logout</NavDropdown.Item>
								</NavDropdown>
								<Nav.Link as={Link} to='/Cart'>
									<i className="bi bi-cart3"></i> Cart {logoNum}
								</Nav.Link>
							</Nav>
						</Col>
					</Navbar.Collapse>
				</Row>
			</Navbar>
		</Container>
	);
}

export default Header;
