import Navbar from './Components/Navbar/Navbar.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Product from './Pages/Product.jsx';
import Cart from './Pages/Cart.jsx';
import LoginSignup from './Pages/LoginSignup.jsx';
import Shop from './Pages/Shop.jsx';
import ShopCategory from './Pages/ShopCategory.jsx';
import Footer from './Components/Footer/Footer.jsx';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kids_banner from './Components/Assets/banner_kids.png';
function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element = {<Shop/>}/>
      <Route path='/Men' element = {<ShopCategory banner = {men_banner} category = "Men"/>}/>
      <Route path='/Women' element = {<ShopCategory banner = {women_banner}category = "Women"/>}/>
      <Route path='/Kids' element = {<ShopCategory banner = {kids_banner} category = "Kids"/>}/>
      <Route path='/Product' element = {<Product />} >
        <Route path=':ProductId' element = {<Product />} />
      </Route>
      <Route path='/Cart' element = {<Cart/>}/>
      <Route path='/Login' element = {<LoginSignup/>}/>
    </Routes>
    <Footer/>
    
    </BrowserRouter>
  )
}

export default App;
