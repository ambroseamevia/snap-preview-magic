import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, Heart, Star, Bot, Facebook, Instagram, Twitter, Phone, Mail, ChevronRight, Filter, Package, Truck, Shield, ArrowUp } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  featured: boolean;
  inStock: boolean;
  selarLink: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Earbuds",
    price: 250,
    originalPrice: 350,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400",
    category: "Electronics",
    rating: 4.8,
    reviews: 124,
    featured: true,
    inStock: true,
    selarLink: "https://selar.co/your-product-1"
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 450,
    originalPrice: 600,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    category: "Electronics",
    rating: 4.9,
    reviews: 89,
    featured: true,
    inStock: true,
    selarLink: "https://selar.co/your-product-2"
  },
  {
    id: 3,
    name: "Designer Backpack",
    price: 180,
    originalPrice: 250,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    category: "Fashion",
    rating: 4.7,
    reviews: 156,
    featured: false,
    inStock: true,
    selarLink: "https://selar.co/your-product-3"
  },
  {
    id: 4,
    name: "LED Desk Lamp",
    price: 95,
    originalPrice: 130,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
    category: "Home",
    rating: 4.6,
    reviews: 203,
    featured: false,
    inStock: true,
    selarLink: "https://selar.co/your-product-4"
  },
  {
    id: 5,
    name: "Fitness Tracker Band",
    price: 120,
    originalPrice: 180,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400",
    category: "Electronics",
    rating: 4.5,
    reviews: 92,
    featured: true,
    inStock: true,
    selarLink: "https://selar.co/your-product-5"
  },
  {
    id: 6,
    name: "Organic Face Care Set",
    price: 75,
    originalPrice: 100,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400",
    category: "Beauty",
    rating: 4.9,
    reviews: 187,
    featured: false,
    inStock: true,
    selarLink: "https://selar.co/your-product-6"
  }
];

const CATEGORIES = ["All", "Electronics", "Fashion", "Home", "Beauty"];

const Index = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showChat, setShowChat] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    toast.success(`${product.name} added to cart!`);
  };

  const toggleWishlist = (product: Product) => {
    const isInWishlist = wishlist.find(item => item.id === product.id);
    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
      toast.info(`${product.name} removed from wishlist`);
    } else {
      setWishlist([...wishlist, product]);
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-card shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar */}
          <div className="border-b border-border py-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-4">
                <a href="tel:0545599550" className="flex items-center gap-1 text-muted-foreground hover:text-accent transition">
                  <Phone className="w-4 h-4" /> 054 559 9550
                </a>
                <a href="mailto:brivonecommerce@gmail.com" className="hidden md:flex items-center gap-1 text-muted-foreground hover:text-accent transition">
                  <Mail className="w-4 h-4" /> brivonecommerce@gmail.com
                </a>
              </div>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/share/173VYCkaAq/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition transform hover:scale-110">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://www.instagram.com/brivonecommerce/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition transform hover:scale-110">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://www.tiktok.com/@brivonecommerce" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition transform hover:scale-110">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a href="https://x.com/brivonecommerce" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition transform hover:scale-110">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Main Header */}
          <div className="py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="Brivon Logo"
                className="h-24 w-auto"
              />
              <span className="hidden md:inline text-xs bg-gradient-primary text-primary-foreground px-3 py-1 rounded-full font-semibold animate-pulse">
                AI-Powered
              </span>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 group-hover:text-accent transition" />
                <input
                  type="text"
                  placeholder="Search products powered by AI..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-background border-2 border-input rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Cart & Menu */}
            <div className="flex items-center gap-3">
              <button 
                className="relative p-2 hover:bg-accent/10 rounded-lg transition group"
              >
                <Heart className="w-6 h-6 text-foreground group-hover:text-accent transition" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                    {wishlist.length}
                  </span>
                )}
              </button>
              <button 
                className="relative p-2 hover:bg-accent/10 rounded-lg transition group"
              >
                <ShoppingCart className="w-6 h-6 text-foreground group-hover:text-accent transition" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                    {cart.length}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-muted rounded-lg"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border-2 border-input rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-hero text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-background rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4 animate-fade-in">
              <Bot className="w-8 h-8 animate-bounce" />
              <span className="text-sm font-semibold bg-background/20 backdrop-blur-sm px-4 py-2 rounded-full border border-background/30">
                AI-Powered Shopping Experience
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              Shop Smarter with Brivon
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-up">
              Discover quality products curated by artificial intelligence
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
              <button className="bg-background text-primary px-8 py-3 rounded-lg font-semibold hover:bg-background/90 transition transform hover:scale-105 flex items-center justify-center gap-2 shadow-elevated">
                Explore Products <ChevronRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-background text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-background/10 backdrop-blur-sm transition transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group hover:transform hover:scale-105 transition p-6 rounded-xl hover:shadow-elevated bg-card">
              <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce shadow-card">
                <Bot className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-primary">AI-Powered Search</h3>
              <p className="text-muted-foreground">Find exactly what you need with intelligent recommendations</p>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition p-6 rounded-xl hover:shadow-elevated bg-card">
              <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce shadow-card">
                <Truck className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-primary">Fast Delivery</h3>
              <p className="text-muted-foreground">Quick and reliable shipping across Ghana</p>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition p-6 rounded-xl hover:shadow-elevated bg-card">
              <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce shadow-card">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-primary">Secure Payment</h3>
              <p className="text-muted-foreground">Safe and trusted payment methods</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-muted sticky top-[130px] z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-primary" />
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-lg font-medium whitespace-nowrap transition transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-primary text-primary-foreground shadow-elevated'
                    : 'bg-card text-card-foreground hover:shadow-card'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-primary">
              {selectedCategory === 'All' ? 'Featured Products' : selectedCategory}
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Package className="w-4 h-4" />
              <span>{filteredProducts.length} products</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-card rounded-xl shadow-card overflow-hidden hover:shadow-elevated transition-all duration-300 group transform hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                  />
                  {product.featured && (
                    <span className="absolute top-3 left-3 bg-gradient-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-semibold shadow-card animate-pulse">
                      Featured
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full font-bold">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  )}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-12 right-3 bg-card p-2.5 rounded-full shadow-card hover:scale-110 transition transform"
                  >
                    <Heart 
                      className={`w-5 h-5 transition ${
                        wishlist.find(item => item.id === product.id)
                          ? 'fill-destructive text-destructive' 
                          : 'text-muted-foreground'
                      }`}
                    />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-background text-primary px-4 py-2 rounded-lg font-semibold hover:bg-background/90 transition flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Quick Add
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 text-card-foreground group-hover:text-accent transition">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
                        />
                      ))}
                      <span className="text-sm ml-1 font-semibold">{product.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold gradient-text">
                        GH¢{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          GH¢{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <a
                      href={product.selarLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-primary text-primary-foreground px-5 py-2.5 rounded-lg hover:shadow-elevated transition transform hover:scale-105 font-semibold"
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Chat Bot */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 bg-gradient-primary text-primary-foreground p-4 rounded-full shadow-elevated hover:shadow-glow transition z-50 transform hover:scale-110 animate-bounce"
      >
        <Bot className="w-6 h-6" />
      </button>

      {showChat && (
        <div className="fixed bottom-24 right-6 bg-card rounded-xl shadow-elevated w-80 z-50 animate-slide-up border-2 border-border">
          <div className="bg-gradient-primary text-primary-foreground p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 animate-pulse" />
              <span className="font-semibold">AI Assistant</span>
            </div>
            <button onClick={() => setShowChat(false)} className="hover:bg-background/20 rounded-full p-1 transition">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 h-64 overflow-y-auto bg-background">
            <div className="bg-card rounded-lg p-3 mb-3 shadow-card border-l-4 border-accent">
              <p className="text-sm text-card-foreground">Hello! 👋 I'm your AI shopping assistant. How can I help you find the perfect product today?</p>
            </div>
          </div>
          <div className="p-4 border-t border-border bg-card rounded-b-xl">
            <input
              type="text"
              placeholder="Ask me anything..."
              className="w-full px-3 py-2 bg-background border-2 border-input rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 bg-gradient-primary text-primary-foreground p-3 rounded-full shadow-elevated hover:shadow-glow transition z-40 transform hover:scale-110"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Footer */}
      <footer className="gradient-hero text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart className="w-6 h-6 text-accent" />
                <h3 className="font-bold text-xl">Brivon</h3>
              </div>
              <p className="text-primary-foreground/80">AI-powered e-commerce platform bringing you the best products in Ghana.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-accent">Quick Links</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-primary-foreground transition hover:translate-x-1 inline-block">About Us</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition hover:translate-x-1 inline-block">Products</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition hover:translate-x-1 inline-block">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-accent">Categories</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-primary-foreground transition hover:translate-x-1 inline-block">Electronics</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition hover:translate-x-1 inline-block">Fashion</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition hover:translate-x-1 inline-block">Home & Living</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition hover:translate-x-1 inline-block">Beauty</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-accent">Contact Us</h4>
              <ul className="space-y-3 text-primary-foreground/80">
                <li className="flex items-center gap-2 hover:text-primary-foreground transition">
                  <Phone className="w-4 h-4 text-accent" /> 054 559 9550
                </li>
                <li className="flex items-center gap-2 hover:text-primary-foreground transition">
                  <Mail className="w-4 h-4 text-accent" /> brivonecommerce@gmail.com
                </li>
              </ul>
              <div className="flex gap-3 mt-4">
                <a href="https://www.facebook.com/share/173VYCkaAq/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition transform hover:scale-125">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/brivonecommerce/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition transform hover:scale-125">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.tiktok.com/@brivonecommerce" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition transform hover:scale-125">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a href="https://x.com/brivonecommerce" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition transform hover:scale-125">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80">
            <p>&copy; 2024 Brivon E-Commerce. All rights reserved. Powered by AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
