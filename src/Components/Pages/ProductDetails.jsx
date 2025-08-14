import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Autoplay} from "swiper/modules";

import brand1 from "../../assets/dell.png";

import brand2 from "../../assets/samsung.png";

import brand3 from "../../assets/sanyo.png";

import brand4 from "../../assets/lenovo.png";

import brand5 from "../../assets/oppo.png";

import brand6 from "../../assets/panasonic.png";

import brand7 from "../../assets/asus.png";

import ProductData from '../../Data.json'

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';




function ProductDetails() {
  const { id } = useParams();
  const products = ProductData.Products;
  const navigate = useNavigate()

  const product = products.find((p) => String(p.Id) === id);

  
  const [showZoom, setShowZoom] = useState(false);
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0})

  const handleMouseMove = (e) => {
    const {left, top, width, height} = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition((x , y))
  };
  
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlistItems')) || []
    const exists = wishlist.some(item => item.Id === product?.Id);
    setIsWishlisted(exists)  
  }, [product?.Id])

  const handleWishlistIcon =() =>{
    const wishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    const exists = wishlist.some(item => item.Id === product?.Id);

    let updatedList;
    if (exists) {
      updatedList = wishlist.filter(item => item.Id !== product.Id);
      toast.info("Item removed from wishlist")
    } else{
      updatedList = [...wishlist, product];
      toast.success("Item added succesfully")
    }

    localStorage.setItem('wishlistItems', JSON.stringify(updatedList));
    setIsWishlisted(!exists);
  }

  const handleAddToWishlist =() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    const exists = wishlist.some(item => item.Id === product?.Id);

    if (!exists) {
      const updatedList = [...wishlist, product];
      localStorage.setItem('wishlistItems', JSON.stringify(updatedList));
    }
    toast.success("Item added to wishlist");

    setTimeout(() => {
      navigate('/wishlist')
    }, 1000);
  }

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const exists = cart.some(item => item.Id === product?.Id);

    if (!exists) {
      const updatedCart = [...cart, {...product, quantity:1}];
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      toast.success("Item added to cart");
    } else {
      toast.warning("Item already in cart")
    }

    setTimeout(()=> {
      navigate('/cart')
    }, 1000)
  }

    if (!product) return <div className="p-10 text-center text-xl alert alert-danger">Product Not Found</div>;

  

  return (
    <>
        <ToastContainer position ="top-right" autoClose={1500}/>
        {/* Page Section */}
        <div className="w-full bg-yellow-100 py-4 px-[8%] lg:px-[12%]">
            <div className="text-lg text-gray-600 flex justify-center items-center space-x-2">
                <Link to="/" className="hover:underline text-gray-700 font-medium">Home</Link>
                <span className='text-gray-500'>&nbsp; / &nbsp;</span>
                <span className='text-red-500 font-semibold'>Product Details</span>
            </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col md:flex-row items-center gap-10 px-[8%] lg:px-[12%] py-20">
          <div className="w-full md:w-1/2 flex gap-6 justify-between px-[80px] py-[50px] border rounded-xl shadow-md relative">
            {/* Main Image */}
            <div 
              className="relative w-[250px] h-[250px] overflow-hidden rounded-xl shadow-md border cursor-pointer"
              onMouseEnter={()=> setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
              onMouseMove={handleMouseMove}
            >
              <img src={product.ProductsImage} alt={product.Name} className='w-full h-full object-contain' />
            </div>
            {/* Zoomed Image Show */}
            {showZoom && (
              <div className='w-[250px] h-[250px] overflow-hidden hidden rounded-xl shadow-md md:block relative z-20'>
                <img 
                  src={product.ProductsImage} 
                  alt="Zoom" 
                  className='absolute w-[500px] object-conatin pointer-events-none'
                  style={{
                   left:`-${mousePosition.x * 1.2}px`,
                   top:`-${mousePosition.y * 1.2}px`,
                  }}
                  />
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2">
            <p className="text-sm font-semibold bg-red-500 inline-block px-3 py-1 rounded text-white mb-4">{product.Category}</p>
            <h2 className='text-3xl font-bold font-bricolage text-black mb-3'>{product.Name}</h2>

            <div className="text-2xl font-bold text-red-600 mb-2">
              ${product.Price}
              {product.OldPrice && (
                <span className='text-gray-400 text-lg line-through ml-3'>${product.OldPrice}</span>
              )}
            </div>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus, perferendis numquam?</p>
            <div className='flex gap-3'>
              <button
                onClick={handleAddToWishlist}
                className='mt-4 px-6 rounded bg-red-500 text-white hover:bg-yellow-500 transition'
              >
                Add To Cart
              </button>
              <button
                onClick={handleAddToWishlist}
                className='mt-4 px-6 rounded bg-red-500 text-white hover:bg-yellow-500 transition'
              >
                Add To Wishlist
              </button>
            </div>
            <div className='my-3 bg-red-100 p-3'>
              
            </div>
          </div>
        </div>
    </>
  );
}

export default ProductDetails;