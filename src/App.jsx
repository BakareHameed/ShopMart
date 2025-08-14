// import { useState } from 'react'
import Nav from "./Components/Nav";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Index from "./Components/Pages/Index";
import ProductDetails from "./Components/Pages/ProductDetails"

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Index/>}/>
          <Route path="/product/:id" element={<ProductDetails/>}/>
        </Routes>        
      </Router>
    </>
  );
}

export default App;
