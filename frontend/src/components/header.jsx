import React from 'react'
import {Container,Nav,NavDropdown,Navbar} from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import {  useSelector,useDispatch } from "react-redux";
import { logout } from '../actions/userAction';


const Header = () => {
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  const dispatch = useDispatch()
  const logotHandler =()=>{
    dispatch(logout())
  }


  return (
   <>
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
        <Navbar.Brand >E-commerce</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/cart">
            <Nav.Link ><i className="fa-solid fa-cart-shopping"></i> cart</Nav.Link>
            </LinkContainer>
            
            {userInfo ? (
              <span className="yoyo"><i className="fa-solid fa-user userIcn"></i>
              <NavDropdown title={userInfo.name} id="username">         
                <LinkContainer to="/profile">
                  <NavDropdown.Item>
                    Profile
                  </NavDropdown.Item>
                </LinkContainer>
                  <NavDropdown.Item onClick={logotHandler}>
                    Logout
                  </NavDropdown.Item>
              </NavDropdown>
            </span>) : (
              <LinkContainer to="/login">
           <Nav.Link ><i className="fa-solid fa-user"></i> sign in</Nav.Link>
           </LinkContainer>
            )}
           
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   </>
  )
}

export default Header