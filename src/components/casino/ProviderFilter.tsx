import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProviderFilterProps {
  onSelectProvider: (provider: string | null) => void;
}

const ProviderFilter = ({ onSelectProvider }: ProviderFilterProps) => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const providers = [
    { id: 'all', name: 'Все', logo: '🎰', count: 150 },
    { id: 'pragmatic', name: 'Pragmatic Play', logo: '⚡', count: 45 },
    { id: 'netent', name: 'NetEnt', logo: '🌟', count: 38 },
    { id: 'evolution', name: 'Evolution', logo: '🎪', count: 22 },
    { id: 'playtech', name: 'Playtech', logo: '🦁', count: 28 },
    { id: 'microgaming', name: 'Microgaming', logo: '👑', count: 17 },
  ];

  const handleSelect = (providerId: string) => {
    const newProvider = providerId === 'all' ? null : providerId;
    setSelectedProvider(newProvider);
    onSelectProvider(newProvider);
  };

  return (
    <Card className="bg-card border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-heading font-bold">Провайдеры</h3>
        <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
          {providers.reduce((sum, p) => sum + p.count, 0)} игр
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {providers.map((provider) => (
          <button
            key={provider.id}
            onClick={() => handleSelect(provider.id)}
            className={cn(
              'relative p-4 rounded-lg border-2 transition-all duration-200 text-center space-y-2 hover:scale-105',
              selectedProvider === provider.id || (selectedProvider === null && provider.id === 'all')
                ? 'border-primary bg-primary/10 shadow-lg'
                : 'border-border bg-card/50 hover:border-primary/50'
            )}
          >
            {(selectedProvider === provider.id || (selectedProvider === null && provider.id === 'all')) && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
            
            <div className="text-3xl mb-2">{provider.logo}</div>
            <div>
              <p className="font-semibold text-sm truncate">{provider.name}</p>
              <p className="text-xs text-muted-foreground">{provider.count} игр</p>
            </div>
          </button>
        ))}
      </div>

      {selectedProvider && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSelect('all')}
            className="w-full"
          >
            Сбросить фильтр
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ProviderFilter;
