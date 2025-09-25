// app/page.tsx (or any other page where you want to use this header)

'use client'; // This directive is necessary for client components in Next.js App Router

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Import Next.js navigation hooks

// Adjust the import paths to match your project structure
import Icon from '@/components/dashboard/AppIcon';
import Button from '@/components/dashboard/ui/Button';

const HeaderPage = ({ onSearch, searchQuery = '', className = '' }) => {
  const router = useRouter(); // Use Next.js router
  const pathname = usePathname(); // Get the current pathname

  const [isDark, setIsDark] = useState(false);
  const [searchValue, setSearchValue] = useState(searchQuery);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Effect for theme initialization
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')?.matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    setIsDark(shouldBeDark);
    document.documentElement?.classList?.toggle('dark', shouldBeDark);
  }, []);

  // Effect to update search value if prop changes
  useEffect(() => {
    setSearchValue(searchQuery);
  }, [searchQuery]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement?.classList?.toggle('dark', newTheme);
  };

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    // Use pathname from next/navigation
    if (searchValue?.trim() && pathname !== '/search-results') {
      // In Next.js, you typically pass query params in the URL
      router.push(`/search-results?query=${searchValue.trim()}`);
    }
    setIsMobileSearchOpen(false);
  };

  const handleLogoClick = () => {
    router.push('/cryptocurrency-dashboard'); // Use router.push for navigation
    setSearchValue('');
    if (onSearch) {
      onSearch('');
    }
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
  };

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/cryptocurrency-dashboard',
      icon: 'BarChart3',
    },
  ];

  // Use pathname for active path check
  const isActivePath = (path) => {
    return pathname === path;
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 glass border-b border-border/50 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={handleLogoClick}
                className="flex items-center space-x-2 focus-ring rounded-lg p-1 -ml-1 transition-all duration-150 hover:scale-102"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center shadow-elevation-2">
                  <Icon name="TrendingUp" size={20} color="white" strokeWidth={2.5} />
                </div>
                <span className="text-xl font-bold text-foreground font-sans tracking-tight">
                  CryptoView
                </span>
              </button>
            </div>

            {/* Desktop Navigation & Search */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Navigation Items */}
              <nav className="flex items-center space-x-1">
                {navigationItems?.map((item) => (
                  <button
                    key={item?.path}
                    // Use router.push for navigation
                    onClick={() => router.push(item?.path)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 focus-ring ${isActivePath(item?.path)
                      ? 'bg-accent text-accent-foreground shadow-elevation-1'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </button>
                ))}
              </nav>

              {/* Search */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative">
                  <Icon
                    name="Search"
                    size={16}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
                  />
                  <input
                    type="text"
                    placeholder="Search cryptocurrencies..."
                    value={searchValue}
                    onChange={handleSearchChange}
                    className="w-64 pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-150 placeholder:text-muted-foreground"
                  />
                </div>
              </form>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="w-9 h-9"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <Icon
                  name={isDark ? 'Sun' : 'Moon'}
                  size={18}
                  className="transition-transform duration-150 hover:scale-110"
                />
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileSearch}
                className="w-9 h-9"
                aria-label="Search"
              >
                <Icon name="Search" size={18} />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="w-9 h-9"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <Icon name={isDark ? 'Sun' : 'Moon'} size={18} />
              </Button>
            </div>
          </div>
        </div>
      </header>
      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={toggleMobileSearch} />
          <div className="relative bg-card border-b border-border p-4">
            <form onSubmit={handleSearchSubmit} className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <Icon
                  name="Search"
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
                />
                <input
                  type="text"
                  placeholder="Search cryptocurrencies..."
                  value={searchValue}
                  onChange={handleSearchChange}
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-150 placeholder:text-muted-foreground"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileSearch}
                className="w-10 h-10 flex-shrink-0"
                aria-label="Close search"
              >
                <Icon name="X" size={20} />
              </Button>
            </form>
          </div>
        </div>
      )}
      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
};

// Export the component as the default export for a Next.js page
export default HeaderPage;
