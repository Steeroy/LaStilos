import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import NavBar from './components/NavBar';
import Home from './screens/Home/Home';
import Menu from './screens/Menu/Menu';
import About from './screens/About/About';
import Contact from './screens/Contact/Contact';
import Cart from './screens/Cart/Cart';
import SignIn from './screens/SignIn/SignIn';
import SignUp from './screens/SignUp/SignUp';
import Favorites from './screens/Favorites/Favorites';
import Footer from './components/Footer';
import Product from './screens/Product/Product';
import Shipping from './screens/Shipping/Shipping';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <NavBar />
        </header>

        <main>
          <Routes>
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/product/:slug" element={<Product />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
