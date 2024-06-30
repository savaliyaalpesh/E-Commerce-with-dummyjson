import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, deleteData } from '../CartSlice/CartSlice';
import './Cart.css';

function Cart() {
  const cart = useSelector((state) => state.counter.cart);
  const dispatch = useDispatch();

  return (
    <div className="container mt-5">
    <h2 className="text-center mb-4">Your Shopping Cart</h2>
    {cart.length === 0 ? (
      <p className="text-center">Your cart is empty.</p>
    ) : (
      <div>
        {cart.map((item, index) => (
          <div key={index} className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img src={item.thumbnail} alt={item.title} className="img-fluid rounded-start" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">${item.price * item.quantity}</p>

                  {/* Quantity Section */}
                  <div className="quantity-section">
                    <button
                      onClick={() => dispatch(deleteData(item))}
                      className="btn btn-danger btn-sm me-2"
                    >
                      Delete
                    </button>
                    <span className="quantity-controls">
                      <button
                        onClick={() => dispatch(deleteData(item))}
                        className="btn btn-sm btn-secondary me-2"
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(addCart({ ...item, quantity: 1 }))}
                        className="btn btn-sm btn-secondary ms-2"
                      >
                        +
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <p className="fs-5">Total: ${calculateTotal(cart)}</p>
          <button className="btn btn-primary">Proceed to Checkout</button>
        </div>
      </div>
    )}
  </div>
  );
}

function calculateTotal(cart) {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
}

export default Cart;
