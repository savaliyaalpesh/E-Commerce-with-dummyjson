import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, ListGroup, Card, Button } from 'react-bootstrap';
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
      .then(response => {
        setList(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        setListItem(response.data.products);
        setTemp(response.data.products);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (display !== '') {
      fetch(`https://dummyjson.com/products/search?q=${display}`)
        .then(res => res.json())
        .then(data => setSelectedCategory(data.products))
        .catch(error => {
          console.log(error);
        });
    }
  }, [display]);

  useEffect(() => {
    if (search) {
      fetch(`https://dummyjson.com/products/search?q=${search}`)
        .then(res => res.json())
        .then(data => setListItem(data.products))
        .catch(error => {
          console.log(error);
        });
    }
  }, [search]);

  const DataFilter = (data) => {
    setSelectedCategory(data);
    if (data === null) {
      setListItem(temp);
    } else {
      axios.get(`https://dummyjson.com/products/category/${data}`)
        .then(response => {
          setListItem(response.data.products);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col lg={3} className='position-relative '>
          <ListGroup>
            <ListGroup.Item
              action
              variant="primary"
              onClick={() => DataFilter(null)}
              active={selectedCategory === null}
            >
              All Items
            </ListGroup.Item>
            {list &&
              list.map((item, index) => (
                <ListGroup.Item
                  key={index}
                  action
                  variant="primary"
                  onClick={() => DataFilter(item.slug)}
                  active={selectedCategory === item.slug}
                >
                  {item.slug}
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
        <Col lg={9}>
          <Row className='gy-5'>
            {listItem &&
              listItem.map((item, index) => (
                <Col
                  lg={6}
                  xl={4}
                  key={index}
                  className='d-flex align-items-center justify-content-center text-decoration-none'
                  as={Link}
                  to={`/Product/${item.id}`}
                >
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant='top' src={item.thumbnail} style={{ height: '200px' }} className='object-fit-cover' />
                    <Card.Body className='text-decoration-none'>
                      <Card.Text className='fw-bold'>{item.category}</Card.Text>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Title>${item.price}.00</Card.Title>
                      <ListGroup.Item
                        action
                        variant='success'
                        className='w-25 text-center p-1 rounded-2 fw-bolder text-success d-flex align-items-center justify-content-center'
                      >
                        {item.rating} <FaStar />
                      </ListGroup.Item>
                      <Card.Text>
                        <Button
                          variant='outline-warning'
                          className='m-auto mt-4'
                          onClick={() => {
                            dispatch(addCart({ ...item, quantity: 1 }));
                          }}
                        >
                          ADD TO CART
                        </Button>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default List;


