import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, ListGroup, Card, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../CartSlice/CartSlice';

function List({ search }) {
  const [listItem, setListItem] = useState([]);
  const [list, setList] = useState([]);
  const [temp, setTemp] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();

  const display = useSelector((state) => state.counter.data);

  useEffect(() => {
    axios.get('https://dummyjson.com/products/categories')
      .then(response => setList(response.data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        setListItem(response.data.products);
        setTemp(response.data.products);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (display !== '') {
      axios.get(`https://dummyjson.com/products/search?q=${display}`)
        .then(response => setListItem(response.data.products))
        .catch(error => console.log(error));
    }
  }, [display]);

  useEffect(() => {
    if (search) {
      axios.get(`https://dummyjson.com/products/search?q=${search}`)
        .then(response => setListItem(response.data.products))
        .catch(error => console.log(error));
    }
  }, [search]);

  const DataFilter = (category) => {
    setSelectedCategory(category);
    if (!category) {
      setListItem(temp);
    } else {
      axios.get(`https://dummyjson.com/products/category/${category.slug}`)
        .then(response => setListItem(response.data.products))
        .catch(error => console.log(error));
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col lg={3} className='position-relative'>
          <DropdownButton id="dropdown-basic-button" title={selectedCategory ? selectedCategory.name : "All Items"}>
            <Dropdown.Item onClick={() => DataFilter(null)} active={!selectedCategory}>All Items</Dropdown.Item>
            {list.map((item, index) => (
              <Dropdown.Item key={index} onClick={() => DataFilter(item)} active={selectedCategory && selectedCategory.slug === item.slug}>
                {item.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
        <Col lg={9}>
          <Row className='gy-5'>
            {listItem.length === 0 ? (
              [...Array(6)].map((_, index) => (
                <Col lg={6} xl={4} key={index} className='d-flex align-items-center justify-content-center'>
                  <Card style={{ width: '18rem' }} className='mt'>
                    <div className="skeleton" style={{ height: '200px', width: '100%' }}></div>
                    <Card.Body>
                      <Card.Text className="skeleton" style={{ height: '20px', width: '50%' }}></Card.Text>
                      <Card.Title className="skeleton" style={{ height: '20px', width: '80%' }}></Card.Title>
                      <Card.Title className="skeleton" style={{ height: '20px', width: '30%' }}></Card.Title>
                      <ListGroup.Item className='skeleton' style={{ height: '20px', width: '40%' }}></ListGroup.Item>
                      <Card.Text>
                        <Button variant='outline-warning' className='skeleton' style={{ height: '40px', width: '100%' }}></Button>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              listItem.map((item, index) => (
                <Col lg={6} xl={4} key={index} className='d-flex align-items-center justify-content-center'>
                  <Link to={`/Product/${item.id}`} className='text-decoration-none'>
                    <Card style={{ width: '18rem' }} className='mt'>
                      <Card.Img variant='top' src={item.thumbnail} style={{ height: '200px' }} className='object-fit-cover' />
                      <Card.Body>
                        <Card.Text className='fw-bold'>{item.category}</Card.Text>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Title>${item.price}.00</Card.Title>
                        <ListGroup.Item className='w-25 text-center p-1 rounded-2 fw-bolder text-success d-flex align-items-center justify-content-center'>
                          {item.rating} <FaStar />
                        </ListGroup.Item>
                        <Card.Text>
                          <Button variant='outline-warning' className='m-auto mt-4' onClick={() => dispatch(addCart({ ...item, quantity: 1 }))}>
                            ADD TO CART
                          </Button>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default List;
