'use client'

import { useState } from "react"
import { Navbar, NavItem, User } from "./components/Navbar"

const ExamplePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [cartCount, setCartCount] = useState(3)
  const [user, setUser] = useState<User | null>({
    name: "John Doe",
    email: "john@example.com",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face&auto=format"
  })

  // Navigation items with nested dropdowns
  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    {
      label: "Products",
      href: "/products",
      subItems: [
        { label: "Apple Watch", href: "/products/apple-watch" },
        { label: "Accessories", href: "/products/accessories" },
        { label: "New Arrivals", href: "/products/new" }
      ]
    },
    {
      label: "Categories",
      href: "/categories",
      subItems: [
        { label: "Electronics", href: "/categories/electronics" },
        { label: "Fashion", href: "/categories/fashion" },
        { label: "Home & Garden", href: "/categories/home" }
      ]
    },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ]

  // Custom logo component
  const logo = (
    <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
      Grab
    </h1>
  )

  // Event handlers
  const handleSearch = (query: string) => {
    console.log("Search query:", query)
    // Implement your search logic here
  }

  const handleSignIn = () => {
    console.log("Sign in clicked")
    // Implement sign in logic
  }

  const handleSignOut = () => {
    console.log("Sign out clicked")
    setUser(null)
  }

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode)
    // Apply theme to your app (e.g., toggle dark class on document.documentElement)
    document.documentElement.classList.toggle('dark')
  }

  const handleCartClick = () => {
    console.log("Cart clicked")
    // Navigate to cart or open cart drawer
  }

  // Products data (same as your original)
  const products = [
    {
      id: 1,
      image: "https://www.apple.com/v/watch/bq/images/overview/select/product_s10__c724044usymq_medium.png",
      title: "Apple Watch Series 10",
      price: "₹46900"
    },
    {
      id: 2,
      image: "https://www.apple.com/v/watch/bq/images/overview/select/product_se__c83w8hz9gre6_medium.png",
      title: "Apple Watch SE",
      price: "₹24900"
    },
    {
      id: 3,
      image: "https://www.apple.com/in/watch/images/overview/select/product_u2__hedpiz396nue_medium.png",
      title: "Apple Watch Ultra", 
      price: "₹89900"
    }
  ]

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-gradient-to-b from-gray-900 to-black text-white`}>
      {/* Replace your old header with the new Navbar */}
      <Navbar
        logo={logo}
        navItems={navItems}
        user={user}
        cartCount={cartCount}
        isDarkMode={isDarkMode}
        isSticky={true}
        onSearch={handleSearch}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
        onThemeToggle={handleThemeToggle}
        onCartClick={handleCartClick}
        className="border-gray-800"
      />

      {/* Hero Section - Same as your original */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          className="absolute w-full h-full object-cover opacity-40"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://storage.coverr.co/videos/z6KeeXHaZ02iop1E7KhUrw2pb1DF4qa00S?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjQwMTU2MTgxfQ.RQ9jQFxtncTS-ri_7n5j6mJPoNnN7JG7aRSNF_aOxK8"
            type="video/mp4"
          />
          Your browser does not support video playback.
        </video>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Welcome to <span className="text-yellow-400">Grab</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-300">
            Discover premium products with exceptional quality and style
          </p>
          <button 
            onClick={() => setCartCount(cartCount + 1)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Add Item to Cart (Test)
          </button>
        </div>
      </section>

      {/* Rest of your content remains the same... */}
      {/* Featured Products Section */}
      <section className="py-16 px-6 bg-black/60">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map(product => (
              <div key={product.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="p-4">
                  <img className="h-48 w-full object-contain" src={product.image} alt={product.title} />
                  <h3 className="mt-4 text-lg font-medium text-white">{product.title}</h3>
                  <div className="flex items-center mt-2 mb-3">
                    {[...Array(4)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">4.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">{product.price}</span>
                    <button 
                      onClick={() => setCartCount(cartCount + 1)}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Call to Action Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-blue-600 to-blue-900 rounded-xl p-8 flex flex-col justify-center items-center text-center hover:shadow-xl transition-all transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-4">Special Offers</h3>
              <p className="mb-6">Get 20% off on selected items when you order this week</p>
              <button className="bg-white text-blue-800 font-bold py-2 px-6 rounded-md hover:bg-gray-100">
                Shop Now
              </button>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 rounded-xl p-8 flex flex-col justify-center items-center text-center hover:shadow-xl transition-all transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-4">Join Premium</h3>
              <p className="mb-6">Subscribe for exclusive deals and early access</p>
              <button className="bg-black text-yellow-500 font-bold py-2 px-6 rounded-md hover:bg-gray-900">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Login Section - Simplified since navbar handles auth */}
      <section className="py-16 px-6 bg-gradient-to-t from-black to-gray-900">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">
            {user ? `Welcome back, ${user.name}!` : 'Join Our Community'}
          </h2>
          {user ? (
            <div className="space-y-4">
              <p className="text-gray-300 mb-6">
                Thanks for being a valued member. Explore our latest products and exclusive offers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-md transition-colors">
                  View My Orders
                </button>
                <button className="bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold py-3 px-6 rounded-md transition-colors">
                  Browse Products
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700 p-8">
              <p className="text-gray-300 mb-6">
                Sign in to access exclusive features, track your orders, and get personalized recommendations.
              </p>
              <button 
                onClick={handleSignIn}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 px-4 rounded-md transition-colors mb-4"
              >
                Get Started
              </button>
              <p className="text-sm text-gray-400">
                New here? Sign up for free and get 10% off your first order!
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-black py-8 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>© 2025 Grab. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <button 
              onClick={handleThemeToggle}
              className="text-sm hover:text-white transition-colors"
            >
              Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
            </button>
            <span className="text-gray-600">|</span>
            <span className="text-sm">Cart Items: {cartCount}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ExamplePage