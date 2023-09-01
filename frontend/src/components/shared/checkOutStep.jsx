import React from "react";
import {Nav} from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"

const CheckOutStep = ({step1,step2,step3,step4})=>{
    return(
        <>
        <Nav className="justify-content-center mb-4">
            <Nav.Item>
            {step1 ? (
                <LinkContainer to="/login">
                <Nav.Link>Sign In</Nav.Link>
                </LinkContainer>
            ):(<Nav.Link disabled>Sign In</Nav.Link>)}
            </Nav.Item>
            <Nav.Item>
            {step2 ? (
                <LinkContainer to="/shipping">
                <Nav.Link>shipping</Nav.Link>
                </LinkContainer>
            ):(<Nav.Link disabled>shipping</Nav.Link>)}
            </Nav.Item>
            <Nav.Item>
            {step3 ? (
                <LinkContainer to="/payment">
                <Nav.Link>payment</Nav.Link>
                </LinkContainer>
            ):(<Nav.Link disabled>payment</Nav.Link>)}
            </Nav.Item>
            <Nav.Item>
            {step4 ? (
                <LinkContainer to="/placeoder">
                <Nav.Link>placeoder</Nav.Link>
                </LinkContainer>
            ):(<Nav.Link disabled>placeoder</Nav.Link>)}
            </Nav.Item>
        </Nav>
        </>
    )
}

export default CheckOutStep