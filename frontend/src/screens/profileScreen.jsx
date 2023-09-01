import React, { useState,useEffect } from "react";
import {  Link, useNavigate,  } from "react-router-dom";
import { Form, Row, Col, Button, Table } from "react-bootstrap";
import { LinkContainer} from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/message";
import Loader from "../components/shared/loader";
import { getUserDetails, updateUserProfile } from "../actions/userAction"; 
import {listMyOrder} from "../actions/orderAction"
import { ORDER_CREATE_REQUEST } from "../constants/orderConstant";


const ProfileScreen = () => {
    const [name,setName]=useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const[message,setMessage]= useState("")
  // const location = useLocation()
//   const redirect = location.search ? location.search.split("=")[1] : "/";
//   const redirectLink = location.pathname ? location.pathname.split("=")[1] : "/";
  const dispatch = useDispatch()
  const userDetails = useSelector(state => state.userDetails)
  const userLogin = useSelector(state => state.userLogin)
  const {loading,error,user} = userDetails
  const {userInfo} = userLogin
  const history = useNavigate()
  console.log(setMessage)
const userUpdateProfile = useSelector(state=>state.userUpdateProfile)
const {success} = userUpdateProfile

const orderList = useSelector(state=>state.orderList)
const {loading:loadingOrder,orders,error:errorOrder} = orderList

  useEffect(() =>{
    if(!userInfo){
        history('/login')
    }else{
        if(!user.name){
            dispatch(getUserDetails("profile"))
            dispatch(listMyOrder())
        }else{
            setName(user.name)
            setEmail(user.email)
        }
    }
  },[history,userInfo,user,dispatch])

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch
   dispatch(updateUserProfile({id:user._id,name,email,password}))
  };

  return (
    <>
     <Row>
        <Col md={3}>
        <h1>Update information</h1>
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
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
            Update
          </Button>
        </Form>
        </Col>
        <Col md={9}>
            <h1>my order</h1>
            {
              loadingOrder ? <Loader/> : errorOrder ? <Message variant="danger">{errorOrder}</Message>
              : (
                <Table striped bordered hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <td>ID</td>
                      <td>DATE</td>
                      <td>TOTAL</td>
                      <td>PAID</td>
                      <td>DELIVERD</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      orders.map(order =>(
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.createdAt.substring(0,10)}</td>
                          <td>{order.totalPrices}</td>
                          <td>{order.isPaid ? order.paidAt.substring(0,10) : (
                            <i className="fas fa-times" style={{color:"red"}}></i>
                          )}</td>
                          <td>{order.isDeliverd ? order.deleverdAt.substring(0,10) : (
                            <i className="fas fa-times" style={{color:"red"}}></i>
                          )}</td>
                          <td>
                            <LinkContainer to={`/order/${order._id}`}>
                              <Button variant="light">Details</Button>
                            </LinkContainer>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
              )
            }
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
