'use client'

import { useState } from "react"
// Assuming Navbar component is flexible enough to handle new styling via props
import { Navbar, NavItem, User } from "./components/Navbar" 

// --- SVG Icons for UI enhancement ---
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
  </svg>
);


const ExamplePage = () => {
  // --- State Management (Unchanged) ---
  const [isDarkMode, setIsDarkMode] = useState(true) // Start in dark mode by default
  const [cartCount, setCartCount] = useState(3)
  const [user, setUser] = useState<User | null>({
    name: "John Doe",
    email: "john@example.com",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face&auto=format"
  })

  // --- Navigation Data (Unchanged) ---
  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    {
      label: "Products", href: "/products",
      subItems: [
        { label: "Apple Watch", href: "/products/apple-watch" },
        { label: "Accessories", href: "/products/accessories" },
        { label: "New Arrivals", href: "/products/new" }
      ]
    },
    {
      label: "Categories", href: "/categories",
      subItems: [
        { label: "Electronics", href: "/categories/electronics" },
        { label: "Fashion", href: "/categories/fashion" },
        { label: "Home & Garden", href: "/categories/home" }
      ]
    },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ]

  // --- Custom Logo (Refined) ---
  const logo = (
    <h1 className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-zinc-200 to-zinc-400 bg-clip-text text-transparent">
      Grab
    </h1>
  )

  // --- Event Handlers (Unchanged) ---
  const handleSearch = (query: string) => console.log("Search query:", query)
  const handleSignIn = () => console.log("Sign in clicked")
  const handleSignOut = () => setUser(null)
  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark', !isDarkMode)
  }
  const handleCartClick = () => console.log("Cart clicked")

  // --- Product Data (Unchanged) ---
  const products = [
    {
      id: 1,
      image: "https://www.apple.com/v/watch/bq/images/overview/select/product_s10__c724044usymq_medium.png",
      title: "Apple Watch Series 10",
      price: "₹46,900"
    },
    {
      id: 2,
      image: "https://www.apple.com/v/watch/bq/images/overview/select/product_se__c83w8hz9gre6_medium.png",
      title: "Apple Watch SE",
      price: "₹24,900"
    },
    {
      id: 3,
      image: "https://www.apple.com/in/watch/images/overview/select/product_u2__hedpiz396nue_medium.png",
      title: "Apple Watch Ultra 2",
      price: "₹89,900"
    }
  ]
  
  // Set dark mode on initial render
  if (typeof window !== 'undefined') {
    document.documentElement.classList.toggle('dark', isDarkMode)
  }

  return (
    // --- Main Container: Upgraded background and text colors ---
    <div className={`min-h-screen font-sans ${isDarkMode ? 'dark' : ''} bg-white dark:bg-[#111] text-zinc-800 dark:text-zinc-200 transition-colors duration-500`}>
      
      {/* --- Upgraded Navbar with Glassmorphism Effect --- */}
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
        className="bg-white/80 dark:bg-black/50 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800"
      />

      <main>
        {/* --- Hero Section: Refined typography and CTA --- */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <video
            className="absolute w-full h-full object-cover opacity-30 dark:opacity-20"
            autoPlay muted loop playsInline
          >
            <source src="https://storage.coverr.co/videos/z6KeeXHaZ02iop1E7KhUrw2pb1DF4qa00S?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjQwMTU2MTgxfQ.RQ9jQFxtncTS-ri_7n5j6mJPoNnN7JG7aRSNF_aOxK8" type="video/mp4" />
          </video>
          <div className="relative z-10 text-center px-6">
            <h1 className="text-5xl md:text-8xl font-extrabold mb-4 tracking-tighter text-zinc-900 dark:text-white">
              The Future. Now.
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-zinc-600 dark:text-zinc-400">
              Discover our new collection of premium electronics, crafted with precision and designed for a seamless digital life.
            </p>
            <div className="flex justify-center items-center gap-4">
               <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                Shop Collection
              </button>
              <button className="text-zinc-700 dark:text-zinc-300 font-semibold py-3 px-6 rounded-full transition-colors duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 flex items-center gap-2">
                Learn More <ArrowRightIcon />
              </button>
            </div>
          </div>
        </section>

        {/* --- Featured Products Section: Redesigned for a premium, clean look --- */}
        <section className="py-24 sm:py-32 px-6 bg-zinc-50 dark:bg-black">
          <div className="container mx-auto">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-zinc-900 dark:text-white">Our Finest Selections</h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Engineered for excellence. Designed for you. Explore the products everyone is talking about.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {products.map(product => (
                <div key={product.id} className="bg-white dark:bg-zinc-900/50 rounded-2xl shadow-sm hover:shadow-2xl border border-transparent hover:border-blue-500/50 transition-all duration-300 group p-8 text-center flex flex-col">
                  <div className="flex-grow flex items-center justify-center">
                    <img className="h-48 w-auto object-contain transform group-hover:scale-105 transition-transform duration-500" src={product.image} alt={product.title} />
                  </div>
                  <h3 className="mt-8 text-2xl font-bold text-zinc-900 dark:text-white">{product.title}</h3>
                  <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">{product.price}</p>
                  <div className="mt-6 flex items-center justify-center gap-3">
                    <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-full opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 -translate-y-2 transition-all duration-300">
                      Buy
                    </button>
                     <a href="#" className="text-blue-500 font-semibold hover:underline">Learn more &rarr;</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Call to Action Section: Modern, full-width banners --- */}
        <section className="py-20 px-6 bg-white dark:bg-[#111]">
           <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-12 flex flex-col items-start text-left">
                <h3 className="text-3xl font-bold tracking-tight mb-3 text-zinc-900 dark:text-white">Upgrade Your Tech</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-md">Get exclusive trade-in credits and special financing options when you shop with us.</p>
                <button className="bg-transparent text-blue-600 dark:text-blue-400 font-semibold py-2 px-4 rounded-full transition-colors duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 flex items-center gap-2">
                  See Offers <ArrowRightIcon/>
                </button>
             </div>
             <div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-12 flex flex-col items-start text-left">
                <h3 className="text-3xl font-bold tracking-tight mb-3 text-zinc-900 dark:text-white">Become a Grab Insider</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-md">Join our community for early access to new products, exclusive content, and members-only events.</p>
                 <button className="bg-transparent text-blue-600 dark:text-blue-400 font-semibold py-2 px-4 rounded-full transition-colors duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 flex items-center gap-2">
                  Sign Up <ArrowRightIcon/>
                </button>
             </div>
           </div>
        </section>

        {/* --- Final CTA/Login Section: Simplified and elegant --- */}
        <section className="py-24 sm:py-32 px-6 bg-zinc-50 dark:bg-black">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-zinc-900 dark:text-white">
              {user ? `Welcome back, ${user.name}.` : 'Ready to dive in?'}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10">
              {user 
                ? "Your next favorite device is just a click away. Explore our latest arrivals and your personalized recommendations." 
                : "Create an account or sign in to get started. Track orders, save your favorites, and enjoy a seamless checkout experience."
              }
            </p>
            {user ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                  My Orders
                </button>
                <button className="text-zinc-700 dark:text-zinc-300 font-semibold py-3 px-6 rounded-full transition-colors duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-800">
                  Shop All Products
                </button>
              </div>
            ) : (
              <button 
                onClick={handleSignIn}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Get Started
              </button>
            )}
          </div>
        </section>
        
        {/* --- Footer: Expanded and more professional --- */}
        <footer className="bg-zinc-100 dark:bg-black border-t border-zinc-200 dark:border-zinc-800">
          <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
                <div className="space-y-4">
                  <h4 className="font-semibold text-zinc-900 dark:text-white">Shop and Learn</h4>
                  <a href="#" className="block text-zinc-600 dark:text-zinc-400 hover:underline">Store</a>
                  <a href="#" className="block text-zinc-600 dark:text-zinc-400 hover:underline">Accessories</a>
                  <a href="#" className="block text-zinc-600 dark:text-zinc-400 hover:underline">Gift Cards</a>
                </div>
                 <div className="space-y-4">
                  <h4 className="font-semibold text-zinc-900 dark:text-white">Services</h4>
                  <a href="#" className="block text-zinc-600 dark:text-zinc-400 hover:underline">Grab Trade In</a>
                  <a href="#" className="block text-zinc-600 dark:text-zinc-400 hover:underline">Financing</a>
                  <a href="#" className="block text-zinc-600 dark:text-zinc-400 hover:underline">Order Status</a>
                </div>
                 <div className="space-y-4">
                  <h4 className="font-semibold text-zinc-900 dark:text-white">About Grab</h4>
                  <a href="#" className="block text-zinc-600 dark:text-zinc-400 hover:underline">Newsroom</a>
                  <a href="#" className="block text-zinc-600 dark:text-zinc-400 hover:underline">Investors</a>
                  <a href="#" className="block text-zinc-600 dark:text-zinc-400 hover:underline">Careers</a>
                </div>
                 <div className="space-y-4">
                  <h4 className="font-semibold text-zinc-900 dark:text-white">Account</h4>
                  <a href="#" className="block text-zinc-600 dark:text-zinc-400 hover:underline">Manage Your ID</a>
                  <a href="#" className="block text-zinc-600 dark:text-zinc-400 hover:underline">Account Settings</a>
                  <a href="#" className="block text-zinc-600 dark:text-zinc-400 hover:underline">iCloud.com</a>
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-sm text-zinc-500 dark:text-zinc-400 text-center">
              <p>© 2025 Grab Inc. All rights reserved.</p>
               <div className="inline-flex space-x-4 mt-2">
                 <a href="#" className="hover:underline">Privacy Policy</a>
                 <span>|</span>
                 <a href="#" className="hover:underline">Terms of Use</a>
                 <span>|</span>
                 <a href="#" className="hover:underline">Sales Policy</a>
               </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default ExamplePage