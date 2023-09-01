import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { savePaymentMethod } from "../actions/cartAction";
import CheckOutStep from "../components/shared/checkOutStep";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const PaymentScreen = () => {
    const history = useNavigate()
    const dispatch = useDispatch()
    const shippingAdd = useSelector((state) => state.shippingAdd);
    const { shippingAddress } = shippingAdd;
if(!shippingAddress){
    history("/shipping")
}
    const [paymentMethod,setPaymentMethod] = useState("paypal")
    const submitHandler =(e)=>{
        dispatch(savePaymentMethod(paymentMethod))
        history("/placeorder")
    }
  return (
    <>
      <CheckOutStep step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label as="legend">select payment method</Form.Label>
          <Col>
            <Form.Check 
              type="radio"
              label="paypal or credit card"
              id="paypal"
              name="paymentMethod"
              value="paypal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            {/* <Form.Check
              type="radio"
              label="stripe"
              id="stripe"
              name="paymentMethod"
              value="stripe"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check> */}
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">Continue</Button>
      </Form>
    </>
  );
};

export default PaymentScreen;
