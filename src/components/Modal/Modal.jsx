import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeCart, closeProductDetail } from '../../store/slices/modalSlice';
import { addToCart, updateQuantity, removeFromCart, clearCart } from '../../store/slices/cartSlice';
import { addOrder } from '../../store/slices/orderslice';
import { addToast } from '../../store/slices/toastSlice';
import { useNavigate } from 'react-router-dom';
import { 
  XMarkIcon, 
  PlusIcon, 
  MinusIcon, 
  TrashIcon,
  ShoppingBagIcon,
  HeartIcon,
  StarIcon
} from '@heroicons/react/24/outline';

function Modal() {
  const dispatch = useDispatch();
  const { cartOpen, productDetail = {} } = useSelector((state) => state.modal);
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();
  const orders = useSelector((state) => state.orders.list);

  if (!cartOpen && (!productDetail || !productDetail.open)) return null;

  const closeAll = () => {
    dispatch(closeCart());
    dispatch(closeProductDetail());
  };

  const handleCheckOut = () => {
    if(cartItems.length === 0) return;

    const newOrder = {
      id : Date.now(),
      items : cartItems,
      total : totalPrice,
      date : new Date().toLocaleString(),
    };

    const newOrderIndex = orders.length;
    dispatch(addOrder(newOrder));
    dispatch(clearCart());
    dispatch(addToast({
      message: 'Order placed successfully!',
      type: 'success',
      duration: 3000
    }));
    closeAll();
    navigate(`/home/my-orders/${newOrderIndex}`)
  }

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      {/* Backdrop */}
      <div 
        className='fixed inset-0 bg-black bg-opacity-50 transition-opacity' 
        onClick={closeAll}
      />
      
      {/* Modal Content */}
      <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
        <div className='relative transform overflow-hidden rounded-t-2xl sm:rounded-2xl bg-white text-left shadow-strong transition-all sm:my-8 sm:w-full sm:max-w-lg'>
          {cartOpen && (
            <div className='bg-white'>
              {/* Header */}
              <div className='flex items-center justify-between p-6 border-b border-secondary-100'>
                <div className='flex items-center space-x-2'>
                  <ShoppingBagIcon className='h-6 w-6 text-primary-600' />
                  <h2 className='text-xl font-semibold text-secondary-900'>
                    Shopping Cart
                  </h2>
                  <span className='bg-primary-100 text-primary-600 text-sm font-medium px-2 py-1 rounded-full'>
                    {cartItems.length}
                  </span>
                </div>
                <button
                  onClick={closeAll}
                  className='p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-50 rounded-lg transition-colors duration-200'
                >
                  <XMarkIcon className='h-5 w-5' />
                </button>
              </div>
              
              {/* Cart Items */}
              <div className='max-h-96 overflow-y-auto scrollbar-hide'>
                {cartItems.length > 0 ? (
                  <div className='p-6 space-y-4'>
                    {cartItems.map((item) => (
                      <div key={item.id} className='flex items-center space-x-4 p-4 bg-secondary-50 rounded-lg'>
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className='h-16 w-16 object-cover rounded-lg'
                        />
                        <div className='flex-1 min-w-0'>
                          <h3 className='text-sm font-medium text-secondary-900 truncate'>
                            {item.title}
                          </h3>
                          <p className='text-sm text-primary-600 font-semibold'>
                            ${item.price}
                          </p>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className='flex items-center space-x-2'>
                          <button
                            onClick={() => {
                              if (item.quantity === 1) {
                                dispatch(removeFromCart(item.id));
                              } else {
                                dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1}))
                              }
                            }}
                            className='p-1 text-secondary-400 hover:text-secondary-600 hover:bg-white rounded transition-colors duration-200'
                          >
                            <MinusIcon className='h-4 w-4' />
                          </button>
                          <span className='text-sm font-medium text-secondary-900 min-w-[2rem] text-center'>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => dispatch(addToCart(item))}
                            className='p-1 text-secondary-400 hover:text-secondary-600 hover:bg-white rounded transition-colors duration-200'
                          >
                            <PlusIcon className='h-4 w-4' />
                          </button>
                        </div>
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className='p-2 text-accent-400 hover:text-accent-600 hover:bg-accent-50 rounded-lg transition-colors duration-200'
                        >
                          <TrashIcon className='h-4 w-4' />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='p-12 text-center'>
                    <ShoppingBagIcon className='h-16 w-16 text-secondary-300 mx-auto mb-4' />
                    <h3 className='text-lg font-medium text-secondary-900 mb-2'>
                      Your cart is empty
                    </h3>
                    <p className='text-secondary-500'>
                      Add some products to get started
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className='border-t border-secondary-100 p-6 bg-secondary-50'>
                  <div className='flex items-center justify-between mb-4'>
                    <span className='text-lg font-semibold text-secondary-900'>
                      Total:
                    </span>
                    <span className='text-2xl font-bold text-primary-600'>
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <button 
                    onClick={handleCheckOut}
                    className='w-full btn-primary flex items-center justify-center space-x-2'
                  >
                    <ShoppingBagIcon className='h-5 w-5' />
                    <span>Proceed to Checkout</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Product Detail Modal */}
          {productDetail.open && productDetail.product && (
            <div className='bg-white'>
              {/* Header */}
              <div className='flex items-center justify-between p-6 border-b border-secondary-100'>
                <h2 className='text-xl font-semibold text-secondary-900'>
                  Product Details
                </h2>
                <button
                  onClick={closeAll}
                  className='p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-50 rounded-lg transition-colors duration-200'
                >
                  <XMarkIcon className='h-5 w-5' />
                </button>
              </div>
              
              {/* Product Content */}
              <div className='p-6'>
                <div className='space-y-6'>
                  {/* Product Image */}
                  <div className='aspect-square overflow-hidden rounded-lg bg-secondary-50'>
                    <img
                      src={productDetail.product.image}
                      alt={productDetail.product.title}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className='space-y-4'>
                    <div>
                      <h3 className='text-2xl font-bold text-secondary-900 mb-2'>
                        {productDetail.product.title}
                      </h3>
                      <div className='flex items-center space-x-2 mb-2'>
                        <div className='flex items-center'>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon 
                              key={star} 
                              className='h-4 w-4 text-yellow-400 fill-current' 
                            />
                          ))}
                        </div>
                        <span className='text-sm text-secondary-500'>(4.5)</span>
                      </div>
                    </div>
                    
                    <div className='flex items-center justify-between'>
                      <span className='text-3xl font-bold text-primary-600'>
                        ${productDetail.product.price}
                      </span>
                      <span className='text-sm text-success-600 font-medium'>
                        Free shipping
                      </span>
                    </div>
                    
                    <p className='text-secondary-600 leading-relaxed'>
                      {productDetail.product.description || "No description available"}
                    </p>
                    
                    {/* Action Buttons */}
                    <div className='flex space-x-3'>
                      <button 
                        onClick={() => {
                          dispatch(addToCart({
                            id: productDetail.product.id,
                            title: productDetail.product.title,
                            price: productDetail.product.price,
                            image: productDetail.product.image,
                          }));
                          dispatch(addToast({
                            message: `${productDetail.product.title} added to cart`,
                            type: 'success',
                            duration: 2000
                          }));
                        }}
                        className='flex-1 btn-primary flex items-center justify-center space-x-2'
                      >
                        <ShoppingBagIcon className='h-5 w-5' />
                        <span>Add to Cart</span>
                      </button>
                      <button className='p-3 border border-secondary-300 text-secondary-600 hover:text-primary-600 hover:border-primary-300 rounded-lg transition-colors duration-200'>
                        <HeartIcon className='h-5 w-5' />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Modal