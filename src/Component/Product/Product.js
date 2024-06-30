import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './Product.css';
import { addCart } from '../CartSlice/CartSlice';

function Product() {
  const [items, setItems] = useState({});
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(function (response) {
        console.log(response.data); // Debugging line to inspect response structure
        setItems(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  }, [id]);


  useEffect(() => {
    if (items && typeof items === 'object') {
      Object.keys(items).forEach(key => {
        if (typeof items[key] === 'object' && items[key] !== null) {
          console.warn(`Item key ${key} is an object:`, items[key]);
        }
      });
    }
  }, [items]);

  return (
    <Container fluid className="product-details-container">
      {loading ? (
        <Row className='align-items-center' height={'100vh'}>
          <Col className='text-center'>
            <Spinner animation='border' role='status'>
              <span className='sr-only'></span>
            </Spinner>
          </Col>
        </Row>
      ) : (
        <Row className='product-details-container align-items-center'>
          <Col xs={12} md={2} className='thumbnail-col'>
            {items.images ? (
              items.images.map((ele, index) => (
                <img
                  key={index}
                  src={ele}
                  className='thumbnail-image'
                  onClick={() => setImg(ele)}
                  alt={`Thumbnail ${index}`}
                />
              ))
            ) : (
              <h1 className='no-thumbnail-message'>No thumbnails available</h1>
            )}
          </Col>
          <Col xs={12} md={5} className='main-image-col'>
            <img src={img ? img : items.thumbnail} alt="Product" className='main-image' />
          </Col>
          <Col xs={12} md={5} className='product-details-col'>
            <h3 className='brand'>{items.brand}</h3>
            <h5 className='product-title'>{items.title}</h5>
            <h4 className='price'>${items.price}.00</h4>
            <p className='mrp'>
              MRP : <span className='text-success text-decoration-line-through'>${items.price + items.price}.00</span>
            </p>
            <h5 className='discount'>( {items.discountPercentage}% OFF )</h5>
            <h5 className='category'>{items.category}</h5>
            <p className='stock'>
              STOCK : <span className='text-primary'> {items.stock} only</span>
            </p>
            <p className='description'>
              DESCRIPTION : <span>{items.description}</span>
            </p>
            <Button variant="warning" className="add-to-cart-btn" onClick={() => { dispatch(addCart({ ...items, quantity: 1 })) }}>
              ADD TO CART
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Product;
