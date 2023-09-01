import React from 'react';
import { Row,Col } from "react-bootstrap";
import ProductScreen from './productScreen';
import { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {listProducts} from "../actions/productActions";
import Loader from "../components/shared/loader" ;
import Message from "../components/shared/message" ;

const HomeScreen = () => {

  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {loading,error,products} = productList

  useEffect(()=>{
    dispatch(listProducts())
  },[dispatch])


  return (
    <>
    {
      loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : <Row>
      {
          products.map((product) => (
              <Col key={product._id} md={3} sm={6}>
              <ProductScreen product={product}/>
              </Col>
          ))
      }
  </Row>
    }
    </>
  )
}

export default HomeScreen