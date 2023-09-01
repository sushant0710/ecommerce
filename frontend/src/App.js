import './App.css';
import {Container} from 'react-bootstrap'
import {  Route, Routes} from "react-router-dom";
// Components
import Footer from './components/footer'
import Header from './components/header';
import HomeScreen from './screens/homeScreen'
import ProductDetails from './screens/productDetails';
import CartScreen from './screens/cartScreen';
import LoginScreen from "./screens/loginScreen";
import RegisterScreen from "./screens/registerScreen";
import ProfileScreen from "./screens/profileScreen";
import ShippingScreen from "./screens/shippingScreen";
import PaymentScreen from "./screens/paymentScreen";
import PlaceOrderScreen from "./screens/placeOrderScreen";
import OrderScreen from "./screens/orderScreen";

function App() {
  return (
    <>
    <Header/>
    <main>
    <Container className='py-4'>
      <Routes>
      <Route path="/" element={<HomeScreen/>} exact />
      <Route path="/login" element={<LoginScreen/>}  />
      <Route path="/payment" element={<PaymentScreen/>}  />
      <Route path="/placeorder" element={<PlaceOrderScreen/>}  />
      <Route path="/order/:id" element={<OrderScreen/>}  />
      <Route path="/shipping" element={<ShippingScreen/>}  />
      <Route path="/profile" element={<ProfileScreen/>}  />
      <Route path="/register" element={<RegisterScreen/>}  />
      <Route path="/product/:id" element={<ProductDetails/>}  />
      <Route path="/cart/:id?" element={<CartScreen/>}  />
      </Routes>
    </Container>  
    </main>
    <Footer/>
    </>
  );
}

export default App;
