import React from 'react';
import Icon from '@/components/dashboard/AppIcon';

const MarketStats = ({ marketData = {}, isLoading = false }) => {
  const formatCurrency = (value) => {
    if (!value) return '$0';
    if (value >= 1e12) return `$${(value / 1e12)?.toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9)?.toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6)?.toFixed(2)}M`;
    return `$${value?.toLocaleString()}`;
  };

  const formatPercentage = (percentage) => {
    if (!percentage) return '0.00%';
    const formatted = Math.abs(percentage)?.toFixed(2);
    return `${percentage >= 0 ? '+' : '-'}${formatted}%`;
  };

  const getPercentageColor = (percentage) => {
    if (!percentage) return 'text-muted-foreground';
    return percentage >= 0 ? 'text-success' : 'text-error';
  };

  const stats = [
    {
      id: 'total_market_cap',
      label: 'Total Market Cap',
      value: marketData?.total_market_cap?.usd,
      change: marketData?.market_cap_change_percentage_24h_usd,
      icon: 'TrendingUp',
      format: 'currency'
    },
    {
      id: 'total_volume',
      label: '24h Volume',
      value: marketData?.total_volume?.usd,
      icon: 'BarChart3',
      format: 'currency'
    },
    {
      id: 'btc_dominance',
      label: 'BTC Dominance',
      value: marketData?.market_cap_percentage?.btc,
      icon: 'Bitcoin',
      format: 'percentage'
    },
    {
      id: 'active_cryptocurrencies',
      label: 'Active Cryptocurrencies',
      value: marketData?.active_cryptocurrencies,
      icon: 'Coins',
      format: 'number'
    }
  ];

  const SkeletonStat = () => (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="w-8 h-8 bg-muted animate-pulse rounded-lg" />
        <div className="w-16 h-4 bg-muted animate-pulse rounded" />
      </div>
      <div className="space-y-2">
        <div className="w-24 h-6 bg-muted animate-pulse rounded" />
        <div className="w-20 h-4 bg-muted animate-pulse rounded" />
      </div>
    </div>
  );

  const formatValue = (value, format) => {
    if (!value) return '0';

    switch (format) {
      case 'currency':
        return formatCurrency(value);
      case 'percentage':
        return `${value?.toFixed(2)}%`;
      case 'number':
        return value?.toLocaleString();
      default:
        return value?.toString();
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 })?.map((_, index) => (
          <SkeletonStat key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats?.map((stat) => (
        <div key={stat?.id} className="glass rounded-xl p-6 hover:shadow-elevation-2 transition-all duration-150">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name={stat?.icon} size={20} className="text-accent" />
            </div>
            {stat?.change && (
              <div className={`text-sm font-medium ${getPercentageColor(stat?.change)}`}>
                {formatPercentage(stat?.change)}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-bold text-foreground font-mono">
              {formatValue(stat?.value, stat?.format)}
            </div>
            <div className="text-sm text-muted-foreground">
              {stat?.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketStats;