import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col,Form,Button, Image,ListGroup, ListGroupItem, Card} from "react-bootstrap"
import { useParams,useLocation, useNavigate, Link } from "react-router-dom";
import {addToCart,removeFromCart} from "../actions/cartAction"
import Message from "../components/shared/message"


const CartScreen =()=>{
    const userLogin = useSelector((state) => state.userLogin);
    const navigate = useNavigate()
    const productId = useParams()
    const qtyLocation = useLocation().search;
    const qty = qtyLocation ? Number(qtyLocation.split("=")[1]) : 1;
    const dispatch = useDispatch()
// console.log("idd",userLogin)

    useEffect(()=>{
    if(productId.id){
        dispatch(addToCart(productId.id,qty))
    }
 },[dispatch,productId.id,qty])

const cart = useSelector(state => state.cart)
const {cartItems} = cart
// console.log(cartItems)

const removeFromCartHandler = (id) =>{
    dispatch(removeFromCart(id))
}

const checkout =()=>{
    navigate("/shipping")
    // console.log(navigate)
}
const loginFirst =()=>{
    navigate("/login")
}

const goBack = () =>{
    navigate(-1)
}

    return(
        <>
        <Link onClick={goBack} className="btn btn-light mb-3">
            <i className="fa-solid fa-arrow-left"></i> Go Back
          </Link>
       <Row>
       
        <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <Message>
                    Your Cart is Empty !<Link to="/">Go Back</Link>
                </Message>
            ): (
                <ListGroup>
                    {cartItems.map((item) => (   
                        <ListGroupItem key={item.product}>
                            {/* { console.log(item)} */}
                            <Row className="d-flex align-items-center">
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                </Col>
                                <Col md={6}>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>${item.price}</Col>
                                <Col md={2} className="text-end">
                                    <Form.Select className="shadow-none" as="select" value={item.qty} onChange={(e) => dispatch(
                                        addToCart(item.product, Number(e.target.value))
                                    )}>
                                        {[...Array(item.countInStock).keys()].map((x) =>(
                                          <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ) )}
                                    </Form.Select>
                                    <Button type="button" variant="light" onClick={() => removeFromCartHandler(item.product)}>
                                        <i className="fa fa-trash text-danger" aria-hidden="true"></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            )}
        </Col>
        <Col md={4} className="mt-5">
            <Card>
                <ListGroup>
                    <ListGroupItem className="text-center">
                        <h2 >subtotal ({cartItems.reduce((acc,item) => acc +  item.qty , 0 )}) items</h2>
                        ${cartItems.reduce((acc,item) => acc + item.qty * item.price ,0).toFixed(2)}
                    </ListGroupItem>
                    {userLogin.login === true ?
                       ( <Button type="button" className="btn-block" disabled={cartItems.length === 0 } onClick={checkout}>
                        Proceed to checkout
                    </Button>): (
                        <Button type="button" className="btn-block" onClick={loginFirst}>Log In First</Button>
                    )
                    }
                </ListGroup>
            </Card>
        </Col>
       </Row>
        </>
    )
}

export default CartScreen;