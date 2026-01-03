import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

const LiveWins = () => {
  const [wins, setWins] = useState([
    {
      id: 1,
      user: 'Игрок1337',
      game: 'Gates of Olympus',
      amount: 15420,
      currency: 'coins',
      multiplier: 'x156',
      timestamp: Date.now(),
    },
    {
      id: 2,
      user: 'LuckyOne',
      game: 'Sweet Bonanza',
      amount: 250,
      currency: 'rubies',
      multiplier: 'x25',
      timestamp: Date.now() - 15000,
    },
    {
      id: 3,
      user: 'ProGamer',
      game: 'Crazy Time',
      amount: 8900,
      currency: 'coins',
      multiplier: 'x89',
      timestamp: Date.now() - 30000,
    },
  ]);

  const gameIcons: { [key: string]: string } = {
    'Gates of Olympus': '⚡',
    'Sweet Bonanza': '🍬',
    'Crazy Time': '🎪',
    'Book of Dead': '📖',
    'Starburst': '⭐',
    'Mega Moolah': '🦁',
  };

  const possibleWins = [
    { user: 'MegaWin', game: 'Book of Dead', amount: 12340, currency: 'coins', multiplier: 'x123' },
    { user: 'SlotKing', game: 'Starburst', amount: 450, currency: 'rubies', multiplier: 'x45' },
    { user: 'WinMaster', game: 'Mega Moolah', amount: 23100, currency: 'coins', multiplier: 'x231' },
    { user: 'RubyHunter', game: 'Gates of Olympus', amount: 890, currency: 'rubies', multiplier: 'x89' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomWin = possibleWins[Math.floor(Math.random() * possibleWins.length)];
      const newWin = {
        ...randomWin,
        id: Date.now(),
        timestamp: Date.now(),
      };

      setWins((prev) => [newWin, ...prev.slice(0, 4)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}с назад`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}м назад`;
    return `${Math.floor(minutes / 60)}ч назад`;
  };

  return (
    <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <h3 className="text-xl font-heading font-bold">Последние выигрыши</h3>
        </div>
        <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-400">
          <Icon name="TrendingUp" size={14} className="mr-1" />
          Live
        </Badge>
      </div>

      <div className="space-y-3">
        {wins.map((win, index) => (
          <div
            key={win.id}
            className={cn(
              'flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border transition-all duration-500',
              index === 0 && 'animate-slide-up bg-green-500/10 border-green-500/30'
            )}
          >
            <Avatar className="w-12 h-12 border-2 border-primary/30 shrink-0">
              <AvatarFallback className="bg-gradient-to-br from-red-600 to-red-800 text-white font-semibold">
                {win.user.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-sm truncate">{win.user}</p>
                <span className="text-xs text-muted-foreground">•</span>
                <p className="text-xs text-muted-foreground">{formatTime(win.timestamp)}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{gameIcons[win.game] || '🎰'}</span>
                <p className="text-sm text-muted-foreground truncate">{win.game}</p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div
                className={cn(
                  'flex items-center gap-1 font-bold text-lg mb-1',
                  win.currency === 'coins' ? 'text-yellow-400' : 'text-red-400'
                )}
              >
                <Icon name={win.currency === 'coins' ? 'Coins' : 'Gem'} size={18} />
                <span>{win.amount.toLocaleString()}</span>
              </div>
              <Badge
                variant="outline"
                className="bg-green-500/10 border-green-500/30 text-green-400 text-xs"
              >
                {win.multiplier}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-yellow-400">1,247</p>
            <p className="text-xs text-muted-foreground">Онлайн</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-400">₽2.4M</p>
            <p className="text-xs text-muted-foreground">Выиграно сегодня</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-400">342</p>
            <p className="text-xs text-muted-foreground">Джекпотов</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LiveWins;
