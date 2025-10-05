import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { 
  ShoppingBagIcon, 
  CalendarIcon, 
  CurrencyDollarIcon,
  ArrowRightIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

function Order() {
  const orders = useSelector((state) => state.orders.list);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gradient font-display mb-2">
          My Orders
        </h1>
        <p className="text-secondary-600">
          Track and manage your order history
        </p>
      </div>

      {/* Orders List */}
      <div className="space-y-4 stagger-animation">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 bg-secondary-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBagIcon className="h-12 w-12 text-secondary-400" />
            </div>
            <h3 className="text-xl font-semibold text-secondary-900 mb-2">
              No orders yet
            </h3>
            <p className="text-secondary-600 mb-6">
              Start shopping to see your orders here
            </p>
            <NavLink 
              to="/home" 
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Start Shopping</span>
              <ArrowRightIcon className="h-4 w-4" />
            </NavLink>
          </div>
        ) : (
          orders.map((order, index) => (
            <NavLink
              to={`/home/my-orders/${index}`}
              key={order.id}
              className="card p-6 hover:shadow-medium transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <ShoppingBagIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-secondary-900">
                        Order #{order.id.toString().slice(-6)}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                        <ClockIcon className="h-3 w-3 mr-1" />
                        Completed
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-secondary-600">
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{order.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ShoppingBagIcon className="h-4 w-4" />
                        <span>{order.items.length} items</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-lg font-bold text-primary-600">
                      <CurrencyDollarIcon className="h-5 w-5" />
                      <span>{order.total.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-secondary-500">Total</p>
                  </div>
                  
                  <ArrowRightIcon className="h-5 w-5 text-secondary-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="mt-4 pt-4 border-t border-secondary-100">
                <div className="flex -space-x-2">
                  {order.items.slice(0, 4).map((item, itemIndex) => (
                    <div key={itemIndex} className="relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-8 w-8 rounded-full border-2 border-white object-cover"
                      />
                      {item.quantity > 1 && (
                        <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                          {item.quantity}
                        </span>
                      )}
                    </div>
                  ))}
                  {order.items.length > 4 && (
                    <div className="h-8 w-8 rounded-full border-2 border-white bg-secondary-100 flex items-center justify-center">
                      <span className="text-xs font-medium text-secondary-600">
                        +{order.items.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </NavLink>
          ))
        )}
      </div>
    </div>
  );
}

export default Order;