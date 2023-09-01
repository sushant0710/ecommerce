import React, { useState,useEffect } from "react";
import { Link, useLocation , useNavigate  } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/message";
import Loader from "../components/shared/loader";
import { login } from "../actions/userAction"; 
import FormContainer from "../components/shared/formContainer";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation()
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const redirectLink = location.pathname ? location.pathname.split("=")[1] : "/";
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const {loading,error,userInfo} = userLogin
  const history = useNavigate()
  // console.log(location)


  useEffect(() =>{
    if(userInfo){history(redirect)}
  },[history,userInfo,redirect])

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch
    dispatch(login(email,password))
  };

  return (
    <>
      <FormContainer>
        <h1>SIGN IN</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>password </Form.Label>
            <Form.Control
              type="text"
              placeholder="enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button className="my-3" type="submit" variant="primary">
            Sing IN
          </Button>
        </Form>
        <Row>
          <Col>
            New Customer ?
            <Link
              to={redirectLink ? `register?redirect=${redirectLink}` : "/register"}
            > Register</Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
