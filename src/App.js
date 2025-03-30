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
import ConfirmEmail from './components/ConfirmEmail';
import EmailConfirmed from './components/EmailConfirmed';
import CookieConsent from './components/CookieContent';
import SearchMealResult from './components/SearchMealResult';
import ForgotPassword from './components/ForgotPassword';
import PasswordConfirmed from './components/PasswordConfirmed';
import ForgotPasswordConfirm from './components/ForgotPasswordConfirm';
import ForgotPasswordNotification from './components/ForgotPasswordNotification';
import ForgotPasswordNotificationAfter from './components/ForgotPasswordNotificationAfter';
import Notifications from './components/Notifications';

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
          <Route path='/confirmEmail/:email' element={<ConfirmEmail/>}/>
          <Route path='/emailConfirmed' element={<EmailConfirmed/>}/>
          <Route path='/passwordConfirmed' element={<PasswordConfirmed/>}/>
          <Route path='/searchMeal/:query' element={<SearchMealResult/>}/>
          <Route path='/ForgotPasswordConfirm/:email' element={<ForgotPasswordConfirm/>}/>
          <Route path='/ForgotPasswordNotification' element={<ForgotPasswordNotification/>}/>
          <Route path='/ForgotPasswordNotificationAfter' element={<ForgotPasswordNotificationAfter/>}/>
          <Route path='/forgotPassword' element={<ForgotPassword/>}/>
          <Route path='/notifications' element={<Notifications/>}/>

        </Routes>
        <CookieConsent/>
      </ProductProvider>

    </div>
  );
}

export default App;
