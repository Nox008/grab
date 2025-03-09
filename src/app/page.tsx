"use client"

import { useState } from "react"; // Import useState for mobile menu toggle
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

// Define types for props
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
}

interface SocialLoginButtonProps {
  icon: React.ElementType;
  provider: string;
  bgColor?: string;
}

// Reusable components
const NavLink = ({ href, children }: NavLinkProps) => (
  <a href={href} className="text-gray-200 hover:text-yellow-400 transition-colors duration-300 px-4">
    {children}
  </a>
);

const ProductCard = ({ image, title, price }: ProductCardProps) => (
  <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="p-4">
      <img className="h-48 w-full object-contain" src={image} alt={title} />
      <h3 className="mt-4 text-lg font-medium text-white">{title}</h3>
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
        <span className="text-2xl font-bold text-white">{price}</span>
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors">
          Add to cart
        </button>
      </div>
    </div>
  </div>
);

const SocialLoginButton = ({ icon: Icon, provider, bgColor = "bg-gray-700" }: SocialLoginButtonProps) => (
  <button className={`w-full flex items-center justify-center ${bgColor} text-white py-3 px-4 rounded-md hover:opacity-90 focus:ring-2 focus:ring-yellow-400 transition-all duration-200`}>
    <Icon className="w-5 h-5 mr-3" />
    Login with {provider}
  </button>
);

const Page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle

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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header with Mobile Menu Toggle */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Grab</h1>
          <nav className="hidden md:flex space-x-2">
            <NavLink href="#">Home</NavLink>
            <NavLink href="#">Products</NavLink>
            <NavLink href="#">About</NavLink>
            <NavLink href="#">Contact</NavLink>
          </nav>
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 p-4">
            <NavLink href="#">Home</NavLink>
            <NavLink href="#">Products</NavLink>
            <NavLink href="#">About</NavLink>
            <NavLink href="#">Contact</NavLink>
          </div>
        )}
      </header>

      {/* Hero Section */}
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
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
            Explore Now
          </button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-6 bg-black/60">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} image={product.image} title={product.title} price={product.price} />
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

      {/* Login Section */}
      <section className="py-16 px-6 bg-gradient-to-t from-black to-gray-900">
        <div className="container mx-auto max-w-md">
          <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-center mb-8 text-white">Sign In</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 px-4 rounded-md transition-colors mb-6">
                SIGN IN
              </button>
              
              <div className="flex items-center mb-6">
                <div className="flex-grow h-px bg-gray-700"></div>
                <span className="px-4 text-sm text-gray-400">OR CONTINUE WITH</span>
                <div className="flex-grow h-px bg-gray-700"></div>
              </div>
              
              <div className="space-y-3">
                <SocialLoginButton icon={FcGoogle} provider="Google" bgColor="bg-gray-700" />
                <SocialLoginButton icon={FaGithub} provider="GitHub" bgColor="bg-gray-800" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-black py-8 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>© 2025 Grab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Page;