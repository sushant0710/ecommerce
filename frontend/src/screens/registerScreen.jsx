import React, { useState,useEffect } from "react";
import { Link, useLocation , useNavigate  } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/message";
import Loader from "../components/shared/loader";
import { register } from "../actions/userAction"; 
import FormContainer from "../components/shared/formContainer";

const RegisterScreen = () => {
    const [name,setName]=useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const[message,setMessage]= useState("")
  const location = useLocation()
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const redirectLink = location.pathname ? location.pathname.split("=")[1] : "/";
  const dispatch = useDispatch()
  const userRegister = useSelector(state => state.userRegister)
  const {loading,error,userInfo} = userRegister
  const history = useNavigate()
  // console.log(userLogin)

  useEffect(() =>{
    if(userInfo){history(redirect)}
  },[history,userInfo,redirect])

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch
    if(password !== confirmPassword){
        setMessage("password do not match")
    }else{
        dispatch(register(name,email,password))
    }
  };

  return (
    <>
      <FormContainer>
        <h1>REGISTER IN</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader/>}
        {message && <Message variant="danger">{message}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>password </Form.Label>
            <Form.Control
              type="text"
              placeholder="enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirm password">
            <Form.Label>confirm password </Form.Label>
            <Form.Control
              type="text"
              placeholder="re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button className="my-3" type="submit" variant="primary">
            Sing IN
          </Button>
        </Form>
        <Row>
          <Col>
           Have an Account !
            <Link
              to={redirectLink ? `login?redirect=${redirectLink}` : "/login"}
            > Login</Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default RegisterScreen;
