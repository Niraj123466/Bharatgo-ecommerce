import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../store/slices/categorySlice";
import { getCategories } from "../../services/product";
import { openCart } from "../../store/slices/modalSlice";
import { 
  ShoppingBagIcon, 
  UserIcon, 
  Bars3Icon, 
  XMarkIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";

function Navbar() {
  const {user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const selected = useSelector((state) => state.category.selectedCategory);
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const profileRef = useRef();

  const isCategoryPage = location.pathname === "/" || categories.some(c => `/${c.slug}` === location.pathname);

  useEffect(() => {
    if (!isCategoryPage) {
      dispatch(setCategory(null));
    }
  }, [location.pathname, isCategoryPage, dispatch]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        if (res.status === 200) {
          const data = await res.json();
          const formatted = data.map((category) => ({
            name: category.name,
            slug: category.slug,
          }));
          setCategories(formatted);
        }
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const visibleCategories = categories
    .filter((category) => !category.name.includes(" "))
    .slice(0, 4);
  const moreCategories = categories.filter(
    (cat) => cat.name.includes(" ") || !visibleCategories.includes(cat)
  );

  const handleClick = (categorySlug) => {
    dispatch(setCategory(categorySlug));
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  if (loading) {
    return (
      <nav className="bg-white shadow-soft border-b border-secondary-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="loading-skeleton h-8 w-24"></div>
              <div className="hidden md:flex space-x-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="loading-skeleton h-4 w-16"></div>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="loading-skeleton h-6 w-6 rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-soft border-b border-secondary-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink 
              to="/home" 
              className="text-2xl font-bold text-gradient font-display"
            >
              Shopi
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavLink
              to="/home"
              onClick={() => handleClick("All")}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                selected === "All" 
                  ? "text-primary-600 bg-primary-50" 
                  : "text-secondary-600 hover:text-primary-600 hover:bg-primary-50"
              }`}
            >
              All
            </NavLink>

            {visibleCategories.map((category) => (
              <NavLink
                key={category.slug}
                to={`/home/${category.slug}`}
                onClick={() => handleClick(category.slug)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  selected === category.slug 
                    ? "text-primary-600 bg-primary-50" 
                    : "text-secondary-600 hover:text-primary-600 hover:bg-primary-50"
                }`}
              >
                {category.name}
              </NavLink>
            ))}

            {moreCategories.length > 0 && (
              <div className="relative group">
                <button className="flex items-center px-3 py-2 text-sm font-medium text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200">
                  More
                  <ChevronDownIcon className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-strong border border-secondary-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {moreCategories.map((category) => (
                    <NavLink
                      key={category.slug}
                      to={`/home/${category.slug}`}
                      onClick={() => handleClick(category.slug)}
                      className="block px-4 py-2 text-sm text-secondary-600 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {category.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>

            {/* Wishlist */}
            <button className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200">
              <HeartIcon className="h-5 w-5" />
            </button>

            {/* Cart */}
            <button
              onClick={() => dispatch(openCart())}
              className="relative p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
            >
              <ShoppingBagIcon className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce-gentle">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
              >
                <UserIcon className="h-5 w-5" />
                <span className="hidden sm:block text-sm font-medium">
                  {user?.email?.split('@')[0] || 'User'}
                </span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-strong border border-secondary-100 py-2 scale-in">
                  <div className="px-4 py-2 border-b border-secondary-100">
                    <p className="text-sm font-medium text-secondary-900">{user?.name || 'User'}</p>
                    <p className="text-xs text-secondary-500">{user?.email}</p>
                  </div>
                  <NavLink
                    to="/home/my-orders"
                    className="block px-4 py-2 text-sm text-secondary-600 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    My Orders
                  </NavLink>
                  <NavLink
                    to="/home/my-account"
                    className="block px-4 py-2 text-sm text-secondary-600 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    My Account
                  </NavLink>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-secondary-100 py-4 slide-down">
            <div className="max-w-md mx-auto">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-secondary-100 py-4 slide-down">
            <div className="space-y-2">
              <NavLink
                to="/home"
                onClick={() => handleClick("All")}
                className={`block px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  selected === "All" 
                    ? "text-primary-600 bg-primary-50" 
                    : "text-secondary-600 hover:text-primary-600 hover:bg-primary-50"
                }`}
              >
                All
              </NavLink>

              {categories.map((category) => (
                <NavLink
                  key={category.slug}
                  to={`/home/${category.slug}`}
                  onClick={() => handleClick(category.slug)}
                  className={`block px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    selected === category.slug 
                      ? "text-primary-600 bg-primary-50" 
                      : "text-secondary-600 hover:text-primary-600 hover:bg-primary-50"
                  }`}
                >
                  {category.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;