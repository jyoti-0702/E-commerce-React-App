import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import { useCart } from './context/CartContext';

export default function ProductItems({ item }) {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const isWishlisted = wishlist.some(p => p.id === item.id);

  return (
    <div className="group bg-white rounded-3xl p-4 border border-gray-100 hover:border-purple-200 hover:shadow-2xl hover:shadow-purple-100/50 hover:-translate-y-2 transition-all duration-500 animate-fade-in">
      <div className="relative bg-gray-50 rounded-2xl p-6 mb-4 aspect-square flex items-center justify-center overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <button
          onClick={() => toggleWishlist(item)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isWishlisted? 'bg-pink-500 text-white' : 'bg-white/80 text-gray-700 hover:bg-white'
          }`}
        >
          <FiHeart className={isWishlisted? 'fill-current' : ''} />
        </button>
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-sm">
          <FiStar className="text-yellow-500 fill-current" />
          <span className="font-semibold">{item.rating?.rate || 4.5}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="text-xs text-purple-600 font-medium uppercase tracking-wide">
          {item.category}
        </p>
        <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-12 group-hover:text-purple-600 transition">
          {item.title}
        </h3>
        <div className="flex items-center justify-between pt-2">
          <p className="text-2xl font-bold text-gray-900">${item.price}</p>
          <button
            onClick={() => addToCart(item)}
            className="bg-gray-900 text-white p-3 rounded-2xl hover:bg-purple-600 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
          >
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
}