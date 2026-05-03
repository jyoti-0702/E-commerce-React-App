import { FiX, FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function WishlistSidebar({ isOpen, onClose }) {
  const { wishlist, removeFromWishlist, moveToCart, cart } = useCart();

  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-gray-900 z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } flex flex-col shadow-2xl border-l border-gray-800`}>
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-white">
            Wishlist <span className="text-purple-400">❤️</span>
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-800 rounded-full text-gray-300 transition"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlist.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-5xl mb-4">💔</p>
              <p className="text-lg">Your wishlist is empty</p>
              <p className="text-sm mt-2">Save your favorite items here!</p>
            </div>
          ) : (
            wishlist.map(item => (
              <div key={item.id} className="flex gap-4 bg-gray-800 p-4 rounded-2xl hover:bg-gray-750 transition">
                {/* Product Image */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-20 h-20 object-contain bg-gray-900 rounded-xl p-2" 
                />
                
                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-white line-clamp-2 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-lg font-bold text-purple-400">${item.price}</p>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-3">
                    {isInCart(item.id) ? (
                      <button 
                        disabled
                        className="flex-1 bg-green-600/50 text-white py-2 rounded-xl text-sm font-medium cursor-not-allowed"
                      >
                        ✓ In Cart
                      </button>
                    ) : (
                      <button 
                        onClick={() => moveToCart(item)}
                        className="flex-1 bg-purple-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-purple-500 transition-all flex items-center justify-center gap-2"
                      >
                        <FiShoppingCart size={14} /> Move to Cart
                      </button>
                    )}
                    
                    <button 
                      onClick={() => removeFromWishlist(item.id)}
                      className="p-2 bg-red-600/20 text-red-400 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="border-t border-gray-800 p-6">
            <p className="text-center text-gray-400 text-sm">
              {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} in wishlist
            </p>
          </div>
        )}
      </div>
    </>
  );
}