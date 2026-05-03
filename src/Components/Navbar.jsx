import { useState } from 'react';
import { FiShoppingCart, FiSearch, FiHeart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import WishlistSidebar from './WishlistSidebar';

export default function Navbar({ onSearch, onCartClick }) {
  const [search, setSearch] = useState('');
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const { cartCount, wishlist } = useCart();

  const handleSearch = (e) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer">
              ShopHub
            </h1>
            
            <div className="hidden md:flex relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 w-80 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition"
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Wishlist Button - NOW OPENS SIDEBAR */}
              <button 
                onClick={() => setWishlistOpen(true)}
                className="relative p-2 hover:bg-gray-800 rounded-full transition group"
              >
                <FiHeart className="text-xl text-gray-300 group-hover:text-pink-400 transition" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </button>
              
              {/* Cart Button */}
              <button 
                onClick={onCartClick}
                className="relative p-2 hover:bg-gray-800 rounded-full transition group"
              >
                <FiShoppingCart className="text-xl text-gray-300 group-hover:text-purple-400 transition" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden py-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Wishlist Sidebar - This is what opens when you click heart */}
      <WishlistSidebar 
        isOpen={wishlistOpen} 
        onClose={() => setWishlistOpen(false)} 
      />
    </>
  );
}