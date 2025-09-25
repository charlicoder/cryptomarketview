// app/page.tsx (or app/dashboard/page.tsx if you prefer a sub-route)

'use client'; // Required for client components that use hooks like useState, useEffect, etc.

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'; // Import Next.js navigation hooks

import Header from '@/components/dashboard/ui/Header'; // Assuming Header is a reusable component
import SearchInterface from '@/components/dashboard/ui/SearchInterface'; // Assuming SearchInterface is a reusable component
import CryptoTable from '@/components/dashboard/CryptoTable'; // Assuming CryptoTable is a reusable component
import CryptoMobileCard from '@/components/dashboard/CryptoMobileCard'; // Assuming CryptoMobileCard is a reusable component
import MarketStats from '@/components/dashboard/MarketStats'; // Assuming MarketStats is a reusable component
import CoinDetailModal from '@/components/dashboard/CoinDetailModal'; // Assuming CoinDetailModal is a reusable component
import Icon from '@/components/dashboard/AppIcon'; // Assuming AppIcon is a reusable component
import Button from '@/components/dashboard/ui/Button'; // Assuming Button is a reusable component

// Mock data - in a real Next.js app, this would likely come from an API call
const mockCryptoData = [
    {
        id: 'vanry',
        symbol: 'vanry',
        name: 'VANRY',
        image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=64&h=64&fit=crop&crop=center',
        current_price: 0.1245,
        market_cap: 124500000,
        market_cap_rank: 1,
        price_change_percentage_24h: 8.45,
        total_volume: 15600000,
        high_24h: 0.1289,
        low_24h: 0.1156,
        circulating_supply: 1000000000,
        total_supply: 1000000000
    },
    {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin',
        image: 'https://images.unsplash.com/photo-1518544007950-f410f1b80c15?w=64&h=64&fit=crop&crop=center',
        current_price: 43250.75,
        market_cap: 847500000000,
        market_cap_rank: 2,
        price_change_percentage_24h: 2.34,
        total_volume: 28400000000,
        high_24h: 43890.12,
        low_24h: 42156.89,
        circulating_supply: 19600000,
        total_supply: 21000000
    },
    {
        id: 'ethereum',
        symbol: 'eth',
        name: 'Ethereum',
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=64&h=64&fit=crop&crop=center',
        current_price: 2645.89,
        market_cap: 318200000000,
        market_cap_rank: 3,
        price_change_percentage_24h: -1.23,
        total_volume: 15800000000,
        high_24h: 2698.45,
        low_24h: 2589.12,
        circulating_supply: 120280000,
        total_supply: null
    },
    {
        id: 'binancecoin',
        symbol: 'bnb',
        name: 'BNB',
        image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=64&h=64&fit=crop&crop=center',
        current_price: 315.67,
        market_cap: 47200000000,
        market_cap_rank: 4,
        price_change_percentage_24h: 0.89,
        total_volume: 1240000000,
        high_24h: 318.45,
        low_24h: 312.34,
        circulating_supply: 149500000,
        total_supply: 149500000
    },
    {
        id: 'solana',
        symbol: 'sol',
        name: 'Solana',
        image: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=64&h=64&fit=crop&crop=center',
        current_price: 98.45,
        market_cap: 42800000000,
        market_cap_rank: 5,
        price_change_percentage_24h: 5.67,
        total_volume: 2890000000,
        high_24h: 102.34,
        low_24h: 94.12,
        circulating_supply: 434800000,
        total_supply: null
    },
    {
        id: 'cardano',
        symbol: 'ada',
        name: 'Cardano',
        image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=64&h=64&fit=crop&crop=center',
        current_price: 0.4567,
        market_cap: 16200000000,
        market_cap_rank: 6,
        price_change_percentage_24h: -2.34,
        total_volume: 456000000,
        high_24h: 0.4789,
        low_24h: 0.4456,
        circulating_supply: 35480000000,
        total_supply: 45000000000
    },
    {
        id: 'avalanche',
        symbol: 'avax',
        name: 'Avalanche',
        image: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=64&h=64&fit=crop&crop=center',
        current_price: 36.78,
        market_cap: 13500000000,
        market_cap_rank: 7,
        price_change_percentage_24h: 3.45,
        total_volume: 789000000,
        high_24h: 38.12,
        low_24h: 35.67,
        circulating_supply: 367000000,
        total_supply: 720000000
    },
    {
        id: 'dogecoin',
        symbol: 'doge',
        name: 'Dogecoin',
        image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=64&h=64&fit=crop&crop=center',
        current_price: 0.0789,
        market_cap: 11200000000,
        market_cap_rank: 8,
        price_change_percentage_24h: 1.23,
        total_volume: 567000000,
        high_24h: 0.0812,
        low_24h: 0.0756,
        circulating_supply: 142000000000,
        total_supply: null
    },
    {
        id: 'polygon',
        symbol: 'matic',
        name: 'Polygon',
        image: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=64&h=64&fit=crop&crop=center',
        current_price: 0.8934,
        market_cap: 8900000000,
        market_cap_rank: 9,
        price_change_percentage_24h: -0.67,
        total_volume: 234000000,
        high_24h: 0.9123,
        low_24h: 0.8756,
        circulating_supply: 9960000000,
        total_supply: 10000000000
    },
    {
        id: 'chainlink',
        symbol: 'link',
        name: 'Chainlink',
        image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=64&h=64&fit=crop&crop=center',
        current_price: 14.56,
        market_cap: 8100000000,
        market_cap_rank: 10,
        price_change_percentage_24h: 2.89,
        total_volume: 345000000,
        high_24h: 14.89,
        low_24h: 14.12,
        circulating_supply: 556000000,
        total_supply: 1000000000
    }
];

const mockMarketData = {
    total_market_cap: {
        usd: 1750000000000
    },
    total_volume: {
        usd: 89500000000
    },
    market_cap_percentage: {
        btc: 48.5,
        eth: 18.2
    },
    market_cap_change_percentage_24h_usd: 2.34,
    active_cryptocurrencies: 10847
};

const CryptocurrencyDashboardPage = () => {
    const router = useRouter(); // Use useRouter for navigation
    const pathname = usePathname(); // Get current pathname
    const searchParams = useSearchParams(); // Get search parameters

    const [cryptocurrencies, setCryptocurrencies] = useState([]);
    const [marketData, setMarketData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'market_cap_rank', direction: 'asc' });
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [filters, setFilters] = useState({
        sortBy: 'market_cap',
        order: 'desc',
        category: 'all'
    });

    // Effect for handling mobile view
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Effect for loading initial data
    useEffect(() => {
        // In a real Next.js app, you'd fetch this data using Next.js data fetching methods
        // like getStaticProps, getServerSideProps, or client-side fetching with SWR/React Query.
        // For this example, we'll use mock data and simulate loading.
        loadCryptocurrencyData();
        loadMarketData();
    }, []);

    // Function to load cryptocurrency data (using mock data for now)
    const loadCryptocurrencyData = async () => {
        setIsLoading(true);
        // Simulate API delay
        setTimeout(() => {
            setCryptocurrencies(mockCryptoData);
            setIsLoading(false);
        }, 1000);
    };

    // Function to load market data (using mock data for now)
    const loadMarketData = async () => {
        setTimeout(() => {
            setMarketData(mockMarketData);
        }, 800);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        // Optionally, you could navigate to a search results page here or update URL params
        // Example: if (query) { router.push(`/search?q=${query}`); } else { router.push(pathname); }
    };

    const handleSort = (config) => {
        setSortConfig(config);
    };

    const handleCoinClick = (coin) => {
        setSelectedCoin(coin);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedCoin(null);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setSortConfig({
            key: newFilters?.sortBy === 'market_cap' ? 'market_cap' : newFilters?.sortBy,
            direction: newFilters?.order
        });
    };

    const handleRefresh = () => {
        loadCryptocurrencyData();
        loadMarketData();
    };

    const handleNavigateToSearch = () => {
        router.push('/search-results'); // Navigate to a dedicated search results page
    };

    const handleViewVanryDetails = () => {
        // Example of navigating to a coin detail page or updating search params
        router.push('/coins/vanry'); // Assuming a route like /coins/[id]
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header Component - Assumes Header handles its own navigation logic */}
            <Header onSearch={handleSearch} searchQuery={searchQuery} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground mb-2">
                                Cryptocurrency Dashboard
                            </h1>
                            <p className="text-muted-foreground font-medium">
                                Track top 100 cryptocurrencies with real-time market data
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={handleRefresh}
                            iconName="RefreshCw"
                            iconPosition="left"
                            disabled={isLoading}
                            className="hidden sm:flex border-border/40 shadow-sm"
                        >
                            Refresh
                        </Button>
                    </div>

                    {/* Featured Badge for VANRY */}
                    <div className="glass rounded-lg p-4 mb-6 border border-accent/30 shadow-md">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center border border-accent/30">
                                <Icon name="Star" size={20} className="text-accent" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Featured Trading Pair</h3>
                                <p className="text-sm text-muted-foreground font-medium">
                                    VANRY/USDT is prominently featured as our primary trading pair
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Market Stats */}
                <MarketStats marketData={marketData} isLoading={isLoading} />

                {/* Search Interface */}
                <div className="mb-6">
                    <SearchInterface
                        onSearch={handleSearch}
                        placeholder="Search cryptocurrencies by name or symbol..."
                        value={searchQuery}
                        showFilters={true}
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        className="max-w-2xl"
                    />
                </div>

                {/* Cryptocurrency List */}
                <div className="mb-8">
                    {isMobile ? (
                        <CryptoMobileCard
                            cryptocurrencies={cryptocurrencies}
                            onCoinClick={handleCoinClick}
                            isLoading={isLoading}
                            searchQuery={searchQuery}
                        />
                    ) : (
                        <CryptoTable
                            cryptocurrencies={cryptocurrencies}
                            onCoinClick={handleCoinClick}
                            isLoading={isLoading}
                            searchQuery={searchQuery}
                            sortConfig={sortConfig}
                            onSort={handleSort}
                        />
                    )}
                </div>

                {/* Quick Actions */}
                <div className="glass rounded-xl p-6 border border-border/30 shadow-md">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Button
                            variant="outline"
                            onClick={handleNavigateToSearch}
                            iconName="Search"
                            iconPosition="left"
                            className="justify-start border-border/40 shadow-sm"
                        >
                            Advanced Search
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleRefresh}
                            iconName="TrendingUp"
                            iconPosition="left"
                            className="justify-start border-border/40 shadow-sm"
                        >
                            Market Analysis
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleViewVanryDetails}
                            iconName="Star"
                            iconPosition="left"
                            className="justify-start border-border/40 shadow-sm"
                        >
                            View VANRY Details
                        </Button>
                    </div>
                </div>
            </main>

            {/* Coin Detail Modal */}
            <CoinDetailModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                coin={selectedCoin}
            />

            {/* Footer - Assuming Footer is a reusable component */}
            <footer className="border-t border-border/40 mt-16 bg-card/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-accent to-accent/80 rounded-md flex items-center justify-center shadow-sm">
                                <Icon name="TrendingUp" size={14} color="white" />
                            </div>
                            <span className="font-semibold text-foreground">CryptoView</span>
                        </div>
                        <div className="text-sm text-muted-foreground font-medium">
                            © {new Date().getFullYear()} CryptoView. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CryptocurrencyDashboardPage;