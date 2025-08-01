'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  ChevronDown,
  Settings,
  LogOut,
  UserCircle
} from 'lucide-react'

// Types
export interface NavItem {
  label: string
  href: string
  subItems?: NavItem[]
}

export interface User {
  name: string
  email?: string
  avatarUrl?: string
}

export interface NavbarProps {
  logo?: React.ReactNode
  navItems?: NavItem[]
  user?: User | null
  cartCount?: number
  isDarkMode?: boolean
  isSticky?: boolean
  className?: string
  onSearch?: (query: string) => void
  onSignIn?: () => void
  onSignOut?: () => void
  onThemeToggle?: () => void
  onCartClick?: () => void
}

// Custom hook for navbar state management
const useNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle scroll for sticky navbar elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null)
      setIsUserMenuOpen(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false)
        setActiveDropdown(null)
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // Debounced search
  const debouncedSearch = useCallback((query: string, onSearch?: (query: string) => void) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    searchTimeoutRef.current = setTimeout(() => {
      onSearch?.(query)
    }, 300)
  }, [])

  const handleSearchChange = useCallback((query: string, onSearch?: (query: string) => void) => {
    setSearchQuery(query)
    debouncedSearch(query, onSearch)
  }, [debouncedSearch])

  const handleDropdownHover = useCallback((itemLabel: string | null) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    
    if (itemLabel) {
      setActiveDropdown(itemLabel)
    } else {
      dropdownTimeoutRef.current = setTimeout(() => {
        setActiveDropdown(null)
      }, 150)
    }
  }, [])

  return {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    activeDropdown,
    setActiveDropdown,
    isUserMenuOpen,
    setIsUserMenuOpen,
    searchQuery,
    setSearchQuery,
    isScrolled,
    handleSearchChange,
    handleDropdownHover
  }
}

// Dropdown Menu Component
const DropdownMenu: React.FC<{
  items: NavItem[]
  isOpen: boolean
  onClose: () => void
}> = ({ items, isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div 
      className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
      role="menu"
      aria-orientation="vertical"
    >
      {items.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          role="menuitem"
          onClick={onClose}
        >
          {item.label}
        </a>
      ))}
    </div>
  )
}

// User Menu Component
const UserMenu: React.FC<{
  user: User
  isOpen: boolean
  onClose: () => void
  onSignOut?: () => void
}> = ({ user, isOpen, onClose, onSignOut }) => {
  if (!isOpen) return null

  return (
    <div 
      className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
      role="menu"
      aria-orientation="vertical"
    >
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
        {user.email && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
        )}
      </div>
      <a
        href="/profile"
        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        role="menuitem"
        onClick={onClose}
      >
        <UserCircle className="w-4 h-4 mr-2" />
        Profile
      </a>
      <a
        href="/settings"
        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        role="menuitem"
        onClick={onClose}
      >
        <Settings className="w-4 h-4 mr-2" />
        Settings
      </a>
      <button
        onClick={() => {
          onSignOut?.()
          onClose()
        }}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        role="menuitem"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </button>
    </div>
  )
}

// Mobile Menu Component
const MobileMenu: React.FC<{
  isOpen: boolean
  navItems: NavItem[]
  user?: User | null
  onClose: () => void
  onSignIn?: () => void
  onSignOut?: () => void
}> = ({ isOpen, navItems, user, onClose, onSignIn, onSignOut }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="fixed top-0 right-0 w-full max-w-sm h-full bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-4 overflow-y-auto">
          {navItems.map((item, index) => (
            <div key={index}>
              <a
                href={item.href}
                className="block py-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={onClose}
              >
                {item.label}
              </a>
              {item.subItems && (
                <div className="ml-4 mt-2 space-y-2">
                  {item.subItems.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href={subItem.href}
                      className="block py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      onClick={onClose}
                    >
                      {subItem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            {user ? (
              <div className="space-y-2">
                <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                <button
                  onClick={() => {
                    onSignOut?.()
                    onClose()
                  }}
                  className="block w-full text-left py-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onSignIn?.()
                  onClose()
                }}
                className="block w-full text-left py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Navbar Component
export const Navbar: React.FC<NavbarProps> = ({
  logo,
  navItems = [],
  user,
  cartCount = 0,
  isDarkMode = false,
  isSticky = true,
  className = '',
  onSearch,
  onSignIn,
  onSignOut,
  onThemeToggle,
  onCartClick
}) => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    activeDropdown,
    setActiveDropdown,
    isUserMenuOpen,
    setIsUserMenuOpen,
    searchQuery,
    isScrolled,
    handleSearchChange,
    handleDropdownHover
  } = useNavbar()

  // Handle search input keyboard shortcut
  const searchRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [])

  const navClasses = `
    ${isSticky ? 'sticky top-0 z-40' : ''}
    ${isScrolled ? 'backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-lg' : 'bg-white dark:bg-gray-900'}
    border-b border-gray-200 dark:border-gray-700 transition-all duration-200
    ${className}
  `.trim()

  return (
    <>
      <nav className={navClasses} role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              {logo || (
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Brand
                </span>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item, index) => (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => handleDropdownHover(item.subItems ? item.label : null)}
                    onMouseLeave={() => handleDropdownHover(null)}
                  >
                    <a
                      href={item.href}
                      className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                      aria-expanded={item.subItems ? activeDropdown === item.label : undefined}
                      aria-haspopup={item.subItems ? 'menu' : undefined}
                    >
                      {item.label}
                      {item.subItems && (
                        <ChevronDown className="ml-1 w-3 h-3" />
                      )}
                    </a>
                    {item.subItems && (
                      <DropdownMenu
                        items={item.subItems}
                        isOpen={activeDropdown === item.label}
                        onClose={() => setActiveDropdown(null)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search... (Press / to focus)"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value, onSearch)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  aria-label="Search"
                />
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={onThemeToggle}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* Cart */}
              <button
                onClick={onCartClick}
                className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                aria-label={`Shopping cart with ${cartCount} items`}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full min-w-[1.25rem]">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>

              {/* User Menu */}
              {user ? (
                <div className="relative hidden lg:block">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsUserMenuOpen(!isUserMenuOpen)
                    }}
                    className="flex items-center p-1 text-sm rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="menu"
                    aria-label="User menu"
                  >
                    {user.avatarUrl ? (
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={user.avatarUrl}
                        alt={user.name}
                      />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </button>
                  <UserMenu
                    user={user}
                    isOpen={isUserMenuOpen}
                    onClose={() => setIsUserMenuOpen(false)}
                    onSignOut={onSignOut}
                  />
                </div>
              ) : (
                <button
                  onClick={onSignIn}
                  className="hidden lg:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  Sign In
                </button>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                aria-expanded={isMobileMenuOpen}
                aria-label="Main menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        navItems={navItems}
        user={user}
        onClose={() => setIsMobileMenuOpen(false)}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
      />
    </>
  )
}

export default Navbar