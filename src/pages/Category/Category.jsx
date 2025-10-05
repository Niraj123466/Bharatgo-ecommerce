import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setCategory } from "../../store/slices/categorySlice";
import { getProductsByCategory } from "../../services/product";
import { addToCart } from "../../store/slices/cartSlice";
import { openProductDetail } from "../../store/slices/modalSlice";
import { addToast } from "../../store/slices/toastSlice";
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  AdjustmentsHorizontalIcon,
  ShoppingCartIcon,
  EyeIcon,
  HeartIcon,
  StarIcon
} from "@heroicons/react/24/outline";

function Category() {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(setCategory(slug ? slug : "All"));
  }, [slug, dispatch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await getProductsByCategory(slug);
  
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
          setFilteredProducts(data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [slug]);  

  useEffect(() => {
    let result = [...products];

    if (search) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredProducts(result);
  }, [search, sort, priceRange, products]);

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
    }));
    
    dispatch(addToast({
      message: `${product.title} added to cart`,
      type: 'success',
      duration: 2000
    }));
  };

  const handleViewDetails = (product) => {
    dispatch(openProductDetail({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      description: product.description
    }));
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header Skeleton */}
          <div className="text-center">
            <div className="loading-skeleton h-8 w-48 mx-auto mb-4"></div>
            <div className="loading-skeleton h-4 w-64 mx-auto"></div>
          </div>
          
          {/* Filters Skeleton */}
          <div className="flex flex-wrap gap-4 justify-center">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="loading-skeleton h-10 w-32"></div>
            ))}
          </div>
          
          {/* Products Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="card p-4">
                <div className="loading-skeleton h-48 w-full mb-4"></div>
                <div className="loading-skeleton h-4 w-3/4 mb-2"></div>
                <div className="loading-skeleton h-4 w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8 fade-in">
        <h1 className="text-4xl font-bold text-gradient font-display mb-4">
          {slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'All Products'}
        </h1>
        <p className="text-secondary-600 text-lg">
          Discover amazing products at great prices
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white"
            />
          </div>
        </div>

        {/* Filter Toggle */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
          >
            <FunnelIcon className="h-4 w-4" />
            <span>Filters</span>
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-soft border border-secondary-100 p-6 slide-down">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Price Range
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Results Count */}
              <div className="flex items-end">
                <div className="text-sm text-secondary-600">
                  {filteredProducts.length} products found
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-animation">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => {
            const isInCart = cartItems.some((item) => item.id === product.id);

            return (
              <div 
                key={product.id} 
                className="product-card group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(product)}
                        className="p-2 bg-white rounded-full shadow-soft hover:shadow-medium transition-all duration-200 hover:scale-110"
                      >
                        <EyeIcon className="h-4 w-4 text-secondary-600" />
                      </button>
                      <button className="p-2 bg-white rounded-full shadow-soft hover:shadow-medium transition-all duration-200 hover:scale-110">
                        <HeartIcon className="h-4 w-4 text-secondary-600" />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`absolute top-2 right-2 p-2 rounded-full shadow-soft transition-all duration-200 ${
                      isInCart 
                        ? "bg-success-500 text-white" 
                        : "bg-white text-secondary-600 hover:bg-primary-600 hover:text-white"
                    }`}
                  >
                    <ShoppingCartIcon className="h-4 w-4" />
                  </button>
                </div>

                <div className="p-4">
                  <h3 
                    className="text-lg font-semibold text-secondary-900 mb-2 line-clamp-2 cursor-pointer hover:text-primary-600 transition-colors duration-200"
                    onClick={() => handleViewDetails(product)}
                  >
                    {product.title}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon 
                          key={star} 
                          className="h-4 w-4 text-yellow-400 fill-current" 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-secondary-500 ml-2">(4.5)</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary-600">
                      ${product.price}
                    </span>
                    <span className="text-sm text-secondary-500">
                      Free shipping
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-secondary-400 mb-4">
              <MagnifyingGlassIcon className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-secondary-900 mb-2">
              No products found
            </h3>
            <p className="text-secondary-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;