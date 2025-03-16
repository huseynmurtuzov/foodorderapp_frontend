import { Route, Routes } from 'react-router-dom';
import Comments from './components/Comments';
import Companies from './components/Companies';
import Exclusive from './components/Exclusive';
import Footer from './components/Footer';
import Header from './components/Header';
import Products from './components/Products';
import './css/style.css';
import ProductDetail from './components/ProductDetail';
import Project from './components/Project';
import ProductProvider from './context/ProductContext';
import AllProducts from './components/AllProducts';
import Contact from './components/Contact';
import Basket from './components/Basket';
import Restaurants from './components/Restaurants';
import Register from './components/Register';
import Login from './components/Login';
import RegisterAsRestaurant from './components/RegisterAsRestaurant';
import RegisterAsDeliveryPersonnel from './components/RegisterAsDeliveryPersonnel';
import CustomerAdminPage from './components/CustomerAdminPage';
import DeliveryPersonnelAdminPage from './components/DeliveryPersonnelAdminPage';
import RestaurantAdminPage from './components/RestaurantAdminPage';

function App() {
  return (
    <div className="App">
      <ProductProvider>
        <Routes>
          <Route path='/' element={<Project/>}/>
          <Route path='/productDetail/:id' element={<ProductDetail/>}/>
          <Route path='/products' element={<AllProducts/>}/>
          <Route path='/restaurants' element={<Restaurants/>}/>
          <Route path='/basket' element={<Basket/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/registerAsRestaurant' element={<RegisterAsRestaurant/>}/>
          <Route path='/registerAsDeliveryPersonnel' element={<RegisterAsDeliveryPersonnel/>}/>
          <Route path='/CustomerAdminPage' element={<CustomerAdminPage/>}/>
          <Route path='/DeliveryPersonnelAdminPage' element={<DeliveryPersonnelAdminPage/>}/>
          <Route path='/RestaurantAdminPage' element={<RestaurantAdminPage/>}/>
        </Routes>
      </ProductProvider>

    </div>
  );
}

export default App;
