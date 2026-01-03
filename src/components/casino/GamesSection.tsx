import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface GamesSectionProps {
  coins: number;
  rubies: number;
}

const GamesSection = ({ coins, rubies }: GamesSectionProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const providers = ['Все', 'Pragmatic Play', 'NetEnt', 'Evolution', 'Playtech'];
  
  const games = [
    { id: 1, name: 'Gates of Olympus', provider: 'Pragmatic Play', image: '🎰', hot: true, minBet: 100 },
    { id: 2, name: 'Sweet Bonanza', provider: 'Pragmatic Play', image: '🍬', hot: true, minBet: 50 },
    { id: 3, name: 'Book of Dead', provider: 'NetEnt', image: '📖', hot: false, minBet: 200 },
    { id: 4, name: 'Starburst', provider: 'NetEnt', image: '⭐', hot: false, minBet: 150 },
    { id: 5, name: 'Crazy Time', provider: 'Evolution', image: '🎡', hot: true, minBet: 300 },
    { id: 6, name: 'Mega Moolah', provider: 'Playtech', image: '🦁', hot: false, minBet: 250 },
    { id: 7, name: 'Wolf Gold', provider: 'Pragmatic Play', image: '🐺', hot: false, minBet: 100 },
    { id: 8, name: 'Gonzo Quest', provider: 'NetEnt', image: '🗿', hot: true, minBet: 180 },
  ];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProvider = !selectedProvider || selectedProvider === 'Все' || game.provider === selectedProvider;
    return matchesSearch && matchesProvider;
  });

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Поиск игр..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border text-foreground"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {providers.map((provider) => (
            <Button
              key={provider}
              variant={selectedProvider === provider ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedProvider(provider === 'Все' ? null : provider)}
              className={selectedProvider === provider ? 'bg-primary hover:bg-primary/90' : ''}
            >
              {provider}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredGames.map((game, index) => (
          <Card
            key={game.id}
            className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer card-glow"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {game.hot && (
              <Badge className="absolute top-2 right-2 z-10 bg-gradient-to-r from-orange-500 to-red-500 border-none text-white">
                🔥 HOT
              </Badge>
            )}
            
            <div className="aspect-square bg-gradient-to-br from-red-900/20 to-black flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
              {game.image}
            </div>
            
            <div className="p-3 space-y-2">
              <h3 className="font-semibold text-sm truncate text-foreground">{game.name}</h3>
              <p className="text-xs text-muted-foreground">{game.provider}</p>
              
              <div className="flex items-center gap-1 text-xs text-yellow-400">
                <Icon name="Coins" size={14} />
                <span>от {game.minBet}</span>
              </div>
              
              <Button size="sm" className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400">
                Играть
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-12">
          <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Игры не найдены</p>
        </div>
      )}
    </div>
  );
};

export default GamesSection;
