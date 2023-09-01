import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Rating from "../components/rating";
import {
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/shared/loader";
import Message from "../components/shared/message";

const ProductDetails = () => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [id, dispatch]);


  const addToCartHandler =()=>{
    if(product.countInStock === 0){
      alert("This product is out of stock")
    }else{
      navigate(`/cart/${id}?qty=${qty}`)
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="">
          <Link to="/" className="btn btn-light mb-3">
            <i className="fa-solid fa-arrow-left"></i> Go Back
          </Link>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} Reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Price: ${product.price}</strong>{" "}
                </ListGroupItem>
                <ListGroupItem>{product.description}</ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroup className="list-group">
                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? `In Stock` : `Out of Stock`}
                    </Col>
                  </Row>
                </ListGroupItem>
                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>Qty</Col>
                      <Form.Select 
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => {
                          return <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>;
                        })}
                      </Form.Select >
                    </Row>
                  </ListGroupItem>
                )}
                <ListGroupItem className="d-grid">
                  <Button type="button" onClick={addToCartHandler}>Add To Cart</Button>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
