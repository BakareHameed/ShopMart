import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    setWishlist(storedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this item from wishlist',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedWishlist = wishlist.filter(item => item.Id !== id);
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
        toast.success('Item removed from wishlist');
      }
    });
  };

  const addToCart = (product) => {
    toast.success(`${product.Name} added to cart`);
  };

return (
    <div className='w-full px-4 sm:px-8 lg:px-[12%] py-12 bg-white text-gray-800'>
      <Toaster position='top-right' reverseOrder={false} />
      <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 font-bricolage'>
        <i className='ri-heart-3-line text-pink-300 mr-2'></i>My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className='text-center py-10 text-gray-500'>
          <i className='ri-emotion-sad-line text-2xl mr-2'></i>No Items In Your Wishlist
        </div>
      ) : (
        <>
          {/* Desktop View */}
          <div className='overflow-hidden hidden md:block'>
            <table className='w-full text-left border-separate border-spacing-y-6'>
              <thead>
                <tr className='text-sm text-gray-500 border-b border-gray-200'>
                  <th></th>
                  <th className='py-3'>Product</th>
                  <th className='text-center'>Unit Price</th>
                  <th className='text-center'>Stock</th>
                  <th className='text-center'>Action</th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map(product => (
                  <tr className='bg-white border rounded-xl shadow-sm' key={product.Id}>
                    <td className='align-middle text-center'>
                      <button
                        onClick={() => removeFromWishlist(product.Id)}
                        className='text-xl text-gray-400 hover:text-red-500 p-3'
                        title='Remove'
                      >
                        <i className="ri-close-line"></i>
                      </button>
                    </td>
                    <td className="flex items-center gap-4 py-4 px-4">
                      <img src={product.ProductsImage} alt={product.Name} className='w-24 h-24 object-contain p-2 rounded-lg' />
                      <div>
                        <h3 className='text-lg font-medium text-gray-900'>{product.Name}</h3>
                        <p className='text-sm text-gray-500'>{product.Cagtegory}</p>
                      </div>
                    </td>
                    <td className='text-center text-gray-800 font-semibold text-base'>
                      ${parseFloat(product.Price).toFixed(2)}
                    </td>
                    <td className='text-center'>
                      <span className='inline-flex items-center gap-1 text-green-600 text-sm font-medium'>
                        <i className="ri-checkbox-circle text-lg"></i> In Stock
                      </span>
                    </td>
                    <td className='text-center'>
                      <button
                        onClick={() => addToCart(product)}
                        className='inline-flex items-center gap-2 rounded-full bg-yellow-500 px-4 py-2 text-sm font-semibold hover:bg-yellow-600 transition'
                      >
                        <i className="ri-shopping-cart-2-line"></i>Add to Cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className='grid gap-6 md:hidden'>
            {wishlist.map(product => (
              <div key={product.Id} className='bg-white p-4 rounded-xl shadow-sm flex flex-col gap-4'>
                <div className='flex items-center justify-between'>
                  <img src={product.ProductsImage} alt={product.Name} className='w-20 h-20 object-contain rounded-lg' />
                  <button
                    onClick={() => removeFromWishlist(product.Id)}
                    className='text-xl text-gray-400 hover:text-red-500'
                  >
                    <i className="ri-close-line"></i>
                  </button>
                </div>
                <div>
                  <h3 className='text-lg font-medium text-gray-900'>{product.Name}</h3>
                  <p className='text-sm text-gray-500'>{product.Cagtegory}</p>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-800 font-semibold'>
                    ${parseFloat(product.Price).toFixed(2)}
                  </span>
                  <span className='inline-flex items-center gap-1 text-green-600 text-sm font-medium'>
                    <i className="ri-checkbox-circle text-lg"></i> In Stock
                  </span>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className='w-full inline-flex items-center justify-center gap-2 rounded-full bg-yellow-500 py-2 text-sm font-semibold hover:bg-yellow-600 transition'
                >
                  <i className="ri-shopping-cart-2-line"></i>Add to Cart
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Continue Shopping Link */}
      <div className='mt-10 text-center'>
        <Link 
          to='/shop'
          className='inline-flex items-center gap-2 px-6 py-2 text-sm font-semibold text-yellow-500 border border-yellow-500 rounded-full hover:bg-yellow-500 hover:text-white transition-all'
        >
          <i className="ri-arrow-left-line"></i>Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default Wishlist;
