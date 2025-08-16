// import { useState } from 'react'
import Nav from "./Components/Nav";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Index from "./Components/Pages/Index";
import ProductDetails from "./Components/Pages/ProductDetails"
import Wishlist from "./Components/Pages/Wishlist";

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Index/>}/>
          <Route path="/product/:id" element={<ProductDetails/>}/>
          <Route path="/wishlist" element={<Wishlist/>}/>
        </Routes>        
      </Router>
    </>
  );
}

export default App;
