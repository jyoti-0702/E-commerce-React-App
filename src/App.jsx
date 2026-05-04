import { useEffect, useState } from 'react';
import axios from 'axios';
import { CartProvider } from './context/CartContext';
import Navbar from './Components/Navbar';
import ProductItems from './ProductItems';
import Category from './Category';
import CartSidebar from './Components/CartSidebar';

function AppContent() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
  const [productsRes, categoriesRes] = await Promise.all([
    axios.get('https://fakestoreapi.com/products'),
    axios.get('https://fakestoreapi.com/products/categories')
  ]);
  setProducts(productsRes.data);
  setFilteredProducts(productsRes.data);
  setCategories(categoriesRes.data);
} catch (error) {
  console.error(error);
  alert('❌ Failed to load products. Please check your internet connection and try again.');
} finally {
  setLoading(false);
}
    };
    fetchData();
  }, []);

  const filterProducts = (cat) => {
    if (cat === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(p => p.category === cat);
      setFilteredProducts(filtered);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(p =>
        p.title.toLowerCase().includes(term.toLowerCase()) ||
        p.category.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSearch={handleSearch} onCartClick={() => setCartOpen(true)} />
      
      <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Shop the latest trends with unbeatable prices
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Browse Categories</h2>
          <Category categories={categories} filterProducts={filterProducts} />
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Products <span className="text-gray-500 text-lg">({filteredProducts.length})</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-4 animate-pulse">
                <div className="bg-gray-200 rounded-2xl aspect-square mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))
          ) : (
            filteredProducts.map(product => (
              <ProductItems key={product.id} item={product} />
            ))
          )}
        </div>

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No products found</p>
          </div>
        )}
      </main>

      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 ShopHub.</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}