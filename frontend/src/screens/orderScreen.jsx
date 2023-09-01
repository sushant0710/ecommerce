import React, { useEffect,useState} from "react";
import {  Row, Col, ListGroup, Image,Card, ListGroupItem } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails, payOrder } from "../actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/message";
import Loader from "../components/shared/loader";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import {ORDER_PAY_RESET} from "../constants/orderConstant"

const OrderScreen = ()=>{
    const { id } = useParams();
    const [sdkReady,setSdkReady] = useState(false)
    const dispatch = useDispatch()
    const orderPay = useSelector(state => state.orderPay)
    const {loading:loadingPay,success:successPay} = orderPay
    const orderDetails = useSelector(state => state.orderDetails)
    const {order,loading,error} = orderDetails
    // if(!loading){
    //     const addDecimal = (num) => {
    //         return (Math.round(num * 100) / 100).toFixed(2);
    //       };
    //       order.itemsPrices = addDecimal(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    //       );
    // }
    // console.log(orderDetails,"oredrdetails")
    // console.log(id,"order")

const successPaymentHandler= (paymentResult) =>{
    console.log(paymentResult,"yoyo")
    dispatch(payOrder(id,paymentResult))
}

useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, id, order, successPay]);

    return loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : <>
    <h2>Order {order._id}</h2>
    <Row>
        <Col md={8}>
            <ListGroup>
            <ListGroupItem variant="flush">
                <h2>shipping</h2>
                <p><strong>Name:</strong>{order.user.name}</p>
                <p><strong>Email:</strong>{order.user.email}</p>
                <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}&nbsp;
                {order.shippingAddress.city}&nbsp;
                {order.shippingAddress.postalcode}&nbsp;
                {order.shippingAddress.country}&nbsp;
                </p>
                {order.isDeliverd ? (
              <Message variant="success">Paid On {order.isDeliverd}</Message>
            ) : (
              <Message variant="danger">Not Deliverd</Message>
            )}
            </ListGroupItem>
            <ListGroupItem>
                <h2>payment method</h2>
                <p>
                <strong>Method:</strong>
                <strong>{order.paymentMethod}</strong>
              </p>
              {order.isPaid ? (
              <Message variant="success">Paid On {order.paidAt}</Message>
            ) : (
              <Message variant="danger">Not Paid</Message>
            )}
            </ListGroupItem>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your cart is empty <Link to="/">shop now</Link></Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
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
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={4}>
        <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>Order Summary</h2>
              </ListGroupItem>
              <ListGroupItem>
                {/* <Row>
                  <Col> Items</Col>
                  <Col>${order.itemsPrices}</Col>
                </Row>
                <Row>
                  <Col>shipping</Col>
                  <Col>${order.shippingPrices}</Col>
                </Row>
                <Row>
                  <Col>tax</Col>
                  <Col>${order.taxPrices}</Col>
                </Row> */}
                <Row>
                  <Col>payable amount</Col>
                  <Col>${order.totalPrices}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroupItem>
            </ListGroup>
          </Card>
          {!order.isPaid && (
            <ListGroup.Item>
              {loadingPay && <Loader />}
              {!sdkReady ? (
                <Loader />
              ) : (
                <PayPalButton

                  createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: "1.99",
                                },
                            },
                        ],
                    });
                }}
                onSuccess={successPaymentHandler}
                />
              )}
            </ListGroup.Item>
          )}
        </Col>
    </Row>
    </>
}

export default OrderScreen