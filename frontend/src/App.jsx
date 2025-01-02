import Navbar from './Components/Navbar/Navbar.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Product from './Pages/Product.jsx';
import Cart from './Pages/Cart.jsx';
import LoginSignup from './Pages/LoginSignup.jsx';
import Shop from './Pages/Shop.jsx';
import ShopCategory from './Pages/ShopCategory.jsx';
function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element = {<Shop/>}/>
      <Route path='/Men' element = {<ShopCategory category = "Men"/>}/>
      <Route path='/Women' element = {<ShopCategory category = "Women"/>}/>
      <Route path='/Kids' element = {<ShopCategory category = "Kids"/>}/>
      <Route path='/Product' element = {<Product />} >
        <Route path=':ProductId' element = {<Product />} />
      </Route>
      <Route path='/Cart' element = {<Cart/>}/>
      <Route path='/Login' element = {<LoginSignup/>}/>
    </Routes>
    
    
    </BrowserRouter>
  )
}

export default App
