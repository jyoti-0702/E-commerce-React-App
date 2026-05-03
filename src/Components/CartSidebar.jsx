import { FiX, FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function CartSidebar({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQty, cartTotal } = useCart();

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
      <div className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-gray-900 z-50 transform transition-transform duration-300 ${
        isOpen? 'translate-x-0' : 'translate-x-full'
      } flex flex-col shadow-2xl border-l border-gray-800`}>
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full text-gray-300">
            <FiX size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg">Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 bg-gray-800 p-4 rounded-2xl">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-contain bg-gray-900 rounded-xl p-2" />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-white line-clamp-2 mb-2">{item.title}</h3>
                  <p className="text-lg font-bold text-white">${item.price}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="p-1 bg-gray-700 rounded-lg text-white hover:bg-gray-600">
                      <FiMinus size={14} />
                    </button>
                    <span className="font-semibold text-white">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="p-1 bg-gray-700 rounded-lg text-white hover:bg-gray-600">
                      <FiPlus size={14} />
                    </button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:bg-red-500/10 p-2 rounded-lg h-fit">
                  <FiTrash2 />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-gray-800 p-6 space-y-4">
  <div className="flex justify-between text-xl font-bold text-white">
    <span>Total:</span>
    <span>${cartTotal.toFixed(2)}</span>
  </div>
  <div className="flex gap-3">
    <button 
      onClick={() => {
        if (window.confirm('Clear all items from cart?')) {
          cart.forEach(item => removeFromCart(item.id));
        }
      }}
      className="w-1/3 bg-red-600/20 text-red-400 py-3 rounded-2xl font-semibold hover:bg-red-600 hover:text-white transition-all"
    >
      Clear All
    </button>
    <button 
      onClick={() => alert(`✅ Proceeding to checkout! Total: $${cartTotal.toFixed(2)}`)}
      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-2xl font-semibold hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 transition-all"
    >
      Checkout
    </button>
  </div>
</div>
          
        )}
      </div>
    </>
  );
}