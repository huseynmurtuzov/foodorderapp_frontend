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

function App() {
  return (
    <div className="App">
      <ProductProvider>
        <Routes>
          <Route path='/' element={<Project/>}/>
          <Route path='/productDetail' element={<ProductDetail/>}/>
          <Route path='/products' element={<AllProducts/>}/>
          <Route path='/account' element={<Contact/>}/>
          <Route path='/basket' element={<Basket/>}/>
        </Routes>
      </ProductProvider>

    </div>
  );
}

export default App;
