import React, { useEffect} from "react";
import { Button, Row, Col, ListGroup, Image,Card,ListGroupItem } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/message";
import CheckOutStep from "../components/shared/checkOutStep";
// import * as _ from 'lodash'

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const shippingAdd = useSelector((state) => state.shippingAdd);
  const dispatch = useDispatch();
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;
  // console.log(cart,"cart")
  // console.log(shippingAdd,"shippingadd")

    // function for decimal
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  // const mainPrice = cart.itemsPrices = 
  //   cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  // const mainShip = cart.shippingPrices = cart.cartItems > 500 ? 0 : 50;
  // const mainTax = cart.taxPrices =Number((0.15 * cart.itemsPrices).toFixed(2));
  // const mainTotal = cart.totalPrices = (
  //   Number(mainPrice) +
  //   Number(mainShip) +
  //   Number(mainTax)
  // ).toFixed(2);

  // console.log(mainPrice)

  const mainPrice = addDecimal(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) )
  const mainShip = 50 
  const mainTax =  Number((0.15 * mainPrice).toFixed(2))
  const mainTotal =    addDecimal(Number(mainPrice) +    Number(mainShip) +    Number(mainTax) )

  // console.log(mainPrice,mainShip,mainTax,mainTotal)




  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
          orderItems: cart.cartItems,
          shippingAddress: shippingAdd.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrices: mainPrice,
          shippingPrices: mainShip,
          taxPrices: mainTax,
          totalPrices: mainTotal,
        })
      )
  };


  const history = useNavigate()

  useEffect(() => {
    if (success) {
      history(`/order/${order._id}`);
    }
    //eslint-disable-next-line
  }, [history, success]);

  return (
    <>
      <CheckOutStep step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup >
            <ListGroupItem variant="flush">
              <h2>shipping</h2>
              <p>
                <strong>Address:</strong>
                {shippingAdd.shippingAddress.address}&nbsp;
                {shippingAdd.shippingAddress.city}&nbsp;
                {shippingAdd.shippingAddress.postalcode}&nbsp;
                {shippingAdd.shippingAddress.country}&nbsp;
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment Method</h2>
              <p>
                <strong>{cart.paymentMethod}</strong>
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty <Link to="/">shop now</Link></Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          qty = {item.qty} 
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
            
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>Order Summary</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col> Items</Col>
                  <Col>${mainPrice}</Col>
                </Row>
                <Row>
                  <Col>shipping</Col>
                  <Col>${mainShip}</Col>
                </Row>
                <Row>
                  <Col>tax</Col>
                  <Col>${mainTax}</Col>
                </Row>
                <Row>
                  <Col>total</Col>
                  <Col>${mainTotal}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroupItem>
              <Button
                type="button"
                className="btn-block"
                disabled={cart.cartItems === 0}
                onClick={placeOrderHandler}
              >Place Order</Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
