import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { 
  UserIcon, 
  EnvelopeIcon, 
  CalendarIcon, 
  CogIcon,
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
  HeartIcon,
  ShoppingBagIcon
} from "@heroicons/react/24/outline";

function Account() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const menuItems = [
    {
      icon: UserIcon,
      title: "Personal Information",
      description: "Update your personal details",
      href: "#"
    },
    {
      icon: ShieldCheckIcon,
      title: "Security",
      description: "Password and security settings",
      href: "#"
    },
    {
      icon: HeartIcon,
      title: "Wishlist",
      description: "Your saved items",
      href: "#"
    },
    {
      icon: ShoppingBagIcon,
      title: "Order History",
      description: "View your past orders",
      href: "/home/my-orders"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gradient font-display mb-2">
          My Account
        </h1>
        <p className="text-secondary-600">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="card p-6 text-center">
            <div className="mx-auto h-24 w-24 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <UserIcon className="h-12 w-12 text-primary-600" />
            </div>
            
            <h2 className="text-xl font-semibold text-secondary-900 mb-2">
              {user?.name || 'User'}
            </h2>
            <p className="text-secondary-600 mb-6">
              {user?.email}
            </p>
            
            <button
              onClick={handleLogout}
              className="w-full btn-secondary flex items-center justify-center space-x-2"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Account Menu */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="card p-6 hover:shadow-medium transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-secondary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-100 transition-colors duration-200">
                    <item.icon className="h-6 w-6 text-secondary-600 group-hover:text-primary-600 transition-colors duration-200" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-secondary-600">
                      {item.description}
                    </p>
                  </div>
                  
                  <ArrowRightOnRectangleIcon className="h-5 w-5 text-secondary-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Account Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 text-center">
          <div className="mx-auto h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
            <ShoppingBagIcon className="h-6 w-6 text-primary-600" />
          </div>
          <h3 className="text-2xl font-bold text-secondary-900 mb-1">0</h3>
          <p className="text-secondary-600">Total Orders</p>
        </div>
        
        <div className="card p-6 text-center">
          <div className="mx-auto h-12 w-12 bg-success-100 rounded-lg flex items-center justify-center mb-3">
            <HeartIcon className="h-6 w-6 text-success-600" />
          </div>
          <h3 className="text-2xl font-bold text-secondary-900 mb-1">0</h3>
          <p className="text-secondary-600">Wishlist Items</p>
        </div>
        
        <div className="card p-6 text-center">
          <div className="mx-auto h-12 w-12 bg-accent-100 rounded-lg flex items-center justify-center mb-3">
            <CalendarIcon className="h-6 w-6 text-accent-600" />
          </div>
          <h3 className="text-2xl font-bold text-secondary-900 mb-1">0</h3>
          <p className="text-secondary-600">Days as Member</p>
        </div>
      </div>
    </div>
  );
}

export default Account;