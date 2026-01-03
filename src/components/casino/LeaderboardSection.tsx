import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const LeaderboardSection = () => {
  const players = [
    { id: 1, name: 'Игрок1337', coins: 125000, rank: 1, vip: 5, wins: 342 },
    { id: 2, name: 'ProGamer', coins: 98500, rank: 2, vip: 4, wins: 289 },
    { id: 3, name: 'LuckyOne', coins: 87200, rank: 3, vip: 3, wins: 256 },
    { id: 4, name: 'SlotKing', coins: 76400, rank: 4, vip: 3, wins: 234 },
    { id: 5, name: 'WinMaster', coins: 65800, rank: 5, vip: 2, wins: 198 },
    { id: 6, name: 'MegaWin', coins: 54300, rank: 6, vip: 2, wins: 187 },
    { id: 7, name: 'SpinLord', coins: 43200, rank: 7, vip: 1, wins: 156 },
    { id: 8, name: 'RubyHunter', coins: 32100, rank: 8, vip: 1, wins: 142 },
  ];

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-500 to-yellow-600';
      case 2:
        return 'from-gray-300 to-gray-400';
      case 3:
        return 'from-orange-600 to-orange-700';
      default:
        return 'from-gray-600 to-gray-700';
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '👑';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          Топ игроков
        </h2>
        <p className="text-muted-foreground">Лучшие из лучших SLOTSFIGHT</p>
      </div>

      <div className="grid gap-4">
        {players.map((player, index) => (
          <Card
            key={player.id}
            className={`p-4 transition-all duration-300 ${
              player.rank <= 3
                ? 'bg-gradient-to-r border-2 card-glow hover:scale-[1.02]'
                : 'bg-card border-border hover:border-primary/50'
            } ${player.rank === 1 ? 'from-yellow-900/30 to-yellow-800/20 border-yellow-500/50' : ''} ${
              player.rank === 2 ? 'from-gray-800/30 to-gray-700/20 border-gray-400/50' : ''
            } ${player.rank === 3 ? 'from-orange-900/30 to-orange-800/20 border-orange-500/50' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${getRankColor(
                  player.rank
                )} font-bold text-white text-lg shadow-lg`}
              >
                {getRankIcon(player.rank)}
              </div>

              <Avatar className="w-12 h-12 border-2 border-primary/30">
                <AvatarFallback className="bg-gradient-to-br from-red-600 to-red-800 text-white font-semibold">
                  {player.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg truncate">{player.name}</h3>
                  <Badge variant="outline" className="bg-yellow-500/10 border-yellow-500/30 text-yellow-400 text-xs">
                    VIP {player.vip}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Icon name="Trophy" size={14} className="text-yellow-500" />
                    {player.wins} побед
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 text-yellow-400 font-bold text-lg">
                  <Icon name="Coins" size={20} />
                  <span>{player.coins.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardSection;
