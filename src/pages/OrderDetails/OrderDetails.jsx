import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ArrowLeftIcon, 
  ShoppingBagIcon, 
  CalendarIcon, 
  CurrencyDollarIcon,
  TruckIcon,
  CheckCircleIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

function OrderDetails() {
  const { id } = useParams();
  const orders = useSelector((state) => state.orders.list);
  const order = orders[id];
  const navigate = useNavigate();

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 bg-accent-100 rounded-full flex items-center justify-center mb-4">
            <ShoppingBagIcon className="h-12 w-12 text-accent-400" />
          </div>
          <h3 className="text-xl font-semibold text-secondary-900 mb-2">
            Order not found
          </h3>
          <p className="text-secondary-600 mb-6">
            The order you're looking for doesn't exist
          </p>
          <button
            onClick={() => navigate('/home/my-orders')}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span>Back to Orders</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/home/my-orders')}
          className="inline-flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200 mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span>Back to Orders</span>
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient font-display mb-2">
              Order Details
            </h1>
            <p className="text-secondary-600">
              Order #{order.id.toString().slice(-6)}
            </p>
          </div>
          
          <div className="flex items-center space-x-2 px-4 py-2 bg-success-100 rounded-full">
            <CheckCircleIcon className="h-5 w-5 text-success-600" />
            <span className="text-sm font-medium text-success-800">Completed</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Items */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">
              Order Items
            </h2>
            
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-secondary-50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-16 w-16 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-secondary-900 truncate">
                      {item.title}
                    </h3>
                    <p className="text-sm text-secondary-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-semibold text-primary-600">
                      ${item.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-secondary-500">
                      each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          {/* Order Info */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">
              Order Information
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CalendarIcon className="h-5 w-5 text-secondary-400" />
                <div>
                  <p className="text-sm font-medium text-secondary-900">Order Date</p>
                  <p className="text-sm text-secondary-600">{order.date}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <ShoppingBagIcon className="h-5 w-5 text-secondary-400" />
                <div>
                  <p className="text-sm font-medium text-secondary-900">Items</p>
                  <p className="text-sm text-secondary-600">{order.items.length} products</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <TruckIcon className="h-5 w-5 text-secondary-400" />
                <div>
                  <p className="text-sm font-medium text-secondary-900">Shipping</p>
                  <p className="text-sm text-success-600">Free shipping</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Total */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">
              Order Summary
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-secondary-600">Subtotal</span>
                <span className="text-secondary-900">${order.total.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-secondary-600">Shipping</span>
                <span className="text-success-600">Free</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-secondary-600">Tax</span>
                <span className="text-secondary-900">$0.00</span>
              </div>
              
              <div className="border-t border-secondary-200 pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-secondary-900">Total</span>
                  <span className="text-xl font-bold text-primary-600">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Status */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">
              Order Status
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-success-100 rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="h-5 w-5 text-success-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-secondary-900">Order Placed</p>
                  <p className="text-xs text-secondary-500">{order.date}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-success-100 rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="h-5 w-5 text-success-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-secondary-900">Processing</p>
                  <p className="text-xs text-secondary-500">Order confirmed</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-success-100 rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="h-5 w-5 text-success-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-secondary-900">Shipped</p>
                  <p className="text-xs text-secondary-500">On the way</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-success-100 rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="h-5 w-5 text-success-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-secondary-900">Delivered</p>
                  <p className="text-xs text-secondary-500">Order completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;