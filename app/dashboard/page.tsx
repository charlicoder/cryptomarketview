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
import { useGetCryptocurrenciesQuery, useGetGlobalStatsQuery } from '@/store/services/cryptoApi'
import { useAppSelector } from '@/lib/hooks'


const CryptocurrencyDashboardPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('market_cap_desc')
    const isDark = useAppSelector((state) => state.theme.isDark)
    const [sortConfig, setSortConfig] = useState({ key: 'market_cap_rank', direction: 'asc' });
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [filters, setFilters] = useState({
        sortBy: 'market_cap',
        order: 'desc',
        category: 'all'
    });

    const {
        data: cryptocurrencies,
        isLoading: cryptosLoading,
        refetch: refetchCryptos
    } = useGetCryptocurrenciesQuery({
        search: searchQuery,
        sortBy
    })

    const {
        data: globalStats,
        isLoading: globalLoading
    } = useGetGlobalStatsQuery()

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDark])

    // Auto-refresh every 60 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            refetchCryptos()
        }, 60000)

        return () => clearInterval(interval)
    }, [refetchCryptos])

    const handleSearch = (query: string) => {
        setSearchQuery(query)
    }

    const handleRefresh = () => {
        refetchCryptos()
    }

    const handleSort = (newSortBy: string) => {
        setSortBy(newSortBy)
    }

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
        // Convert filter format to sort config
        setSortConfig({
            key: newFilters?.sortBy === 'market_cap' ? 'market_cap' : newFilters?.sortBy,
            direction: newFilters?.order
        });
    };

    const formatNumber = (num: number) => {
        if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
        if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
        if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
        return `$${num?.toFixed(2) || '0.00'}`
    }

    const vanryCoin = cryptocurrencies?.find(coin => coin.symbol.toLowerCase() === 'vanry')

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
                            isLoading={"false"}
                            searchQuery={searchQuery}
                            sortConfig={sortConfig}
                            onSort={handleSort}
                        />
                    )}
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