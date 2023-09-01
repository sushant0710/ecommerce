import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/shared/formContainer";
import { saveShippingAddress } from "../actions/cartAction";
import { useNavigate } from "react-router-dom";
import CheckOutStep from "../components/shared/checkOutStep";

const ShippingScreen = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const shippingAdd = useSelector((state) => state.shippingAdd);
  const { shippingAddress } = shippingAdd;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalcode, setPostalcode] = useState(shippingAddress.postalcode);
  const [country, setCountry] = useState(shippingAddress.country);
  // console.log(shippingAdd, "yoyo");
  // console.log(shippingAddress, "ppo");

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch
    dispatch(saveShippingAddress({ address,city,postalcode,country}));
    history("/payment");
  };

  return (
    <>
      <FormContainer>
        <CheckOutStep step1 step2/>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Address"
              value={address || ''}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="City">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter City"
              value={city || ''}
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="Postalcode">
            <Form.Label>Postalcode</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Postalcode"
              value={postalcode || ''}
              onChange={(e) => setPostalcode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="Country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Country"
              value={country || ''}
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
