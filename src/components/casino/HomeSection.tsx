import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HomeSectionProps {
  coins: number;
  rubies: number;
  onNavigate: (section: string) => void;
}

const HomeSection = ({ coins, rubies, onNavigate }: HomeSectionProps) => {
  const categories = [
    { id: 'slots', name: 'Слоты', icon: '🎰', count: 150, color: 'from-red-600 to-red-800' },
    { id: 'poker', name: 'Покер', icon: '♠️', count: 12, color: 'from-green-600 to-green-800' },
    { id: 'wheel', name: 'Колесо', icon: '🎡', count: 1, color: 'from-purple-600 to-purple-800' },
    { id: 'scratch', name: 'Скретч', icon: '🎫', count: 6, color: 'from-blue-600 to-blue-800' },
  ];

  const topGames = [
    { id: 1, name: 'Gates of Olympus', provider: 'Pragmatic Play', icon: '⚡', hot: true, players: 1247 },
    { id: 2, name: 'Sweet Bonanza', provider: 'Pragmatic Play', icon: '🍬', hot: true, players: 982 },
    { id: 3, name: 'Book of Dead', provider: 'NetEnt', icon: '📖', hot: false, players: 756 },
    { id: 4, name: 'Starburst', provider: 'NetEnt', icon: '⭐', hot: false, players: 654 },
    { id: 5, name: 'Crazy Time', provider: 'Evolution', icon: '🎪', hot: true, players: 1543 },
    { id: 6, name: 'Mega Moolah', provider: 'Playtech', icon: '🦁', hot: false, players: 432 },
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 via-orange-600 to-yellow-600 p-8 md:p-12">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 text-9xl">🎰</div>
          <div className="absolute bottom-10 left-10 text-7xl">💎</div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] opacity-30">
            🔥
          </div>
        </div>

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="flex items-center gap-3">
            <Badge className="bg-yellow-400 text-black border-none font-bold text-sm px-4 py-1">
              🔥 НОВИНКА
            </Badge>
            <Badge className="bg-black/30 backdrop-blur-sm text-white border-white/30 font-semibold text-sm px-4 py-1">
              x2 БОНУС
            </Badge>
          </div>

          <h1 className="text-4xl md:text-6xl font-heading font-black text-white leading-tight">
            Лучшие слоты<br />всего мира
          </h1>

          <p className="text-white/90 text-lg md:text-xl font-medium max-w-lg">
            Играй бесплатно, выигрывай монеты и рубины, участвуй в турнирах
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 font-bold text-lg px-8 py-6 shadow-2xl"
              onClick={() => onNavigate('games')}
            >
              <Icon name="Play" size={24} className="mr-2" />
              Начать играть
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/20 font-bold text-lg px-8 py-6 backdrop-blur-sm"
              onClick={() => onNavigate('promo')}
            >
              <Icon name="Gift" size={24} className="mr-2" />
              Получить бонус
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <Card
            key={category.id}
            className="group relative overflow-hidden cursor-pointer border-border hover:border-primary/50 transition-all duration-300 card-glow"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => onNavigate(category.id)}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
            <div className="relative p-6 text-center space-y-3">
              <div className="text-5xl mb-2">{category.icon}</div>
              <h3 className="font-heading font-bold text-lg">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.count} игр</p>
              <Icon name="ChevronRight" className="mx-auto text-primary group-hover:translate-x-1 transition-transform" size={20} />
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-heading font-bold flex items-center gap-2">
            <span className="text-3xl">🔥</span>
            Популярные игры
          </h2>
          <Button variant="ghost" className="text-primary hover:text-primary/80" onClick={() => onNavigate('games')}>
            Смотреть все
            <Icon name="ArrowRight" className="ml-2" size={18} />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {topGames.map((game, index) => (
            <Card
              key={game.id}
              className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer card-glow"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => onNavigate('games')}
            >
              {game.hot && (
                <div className="absolute top-3 right-3 z-10">
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 border-none text-white font-bold">
                    HOT 🔥
                  </Badge>
                </div>
              )}

              <div className="aspect-[4/3] bg-gradient-to-br from-red-900/30 via-black to-red-900/30 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="relative z-10">{game.icon}</div>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-base truncate">{game.name}</h3>
                <p className="text-xs text-muted-foreground">{game.provider}</p>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1 text-xs text-green-400">
                    <Icon name="Users" size={14} />
                    <span>{game.players}</span>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-xs h-7">
                    Играть
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="relative overflow-hidden bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30 p-6 cursor-pointer hover:scale-[1.02] transition-transform" onClick={() => onNavigate('wheel')}>
          <div className="absolute top-0 right-0 text-8xl opacity-20">🎡</div>
          <div className="relative space-y-3">
            <Badge className="bg-purple-500 text-white border-none font-bold">
              Каждые 2 часа
            </Badge>
            <h3 className="text-2xl font-heading font-bold">Колесо фортуны</h3>
            <p className="text-sm text-muted-foreground">
              Крути колесо и выигрывай до 1000 монет или 10 рубинов
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 w-full">
              <Icon name="CircleDot" size={18} className="mr-2" />
              Крутить колесо
            </Button>
          </div>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/30 p-6 cursor-pointer hover:scale-[1.02] transition-transform" onClick={() => onNavigate('scratch')}>
          <div className="absolute top-0 right-0 text-8xl opacity-20">🎫</div>
          <div className="relative space-y-3">
            <Badge className="bg-blue-500 text-white border-none font-bold">
              От 100 монет
            </Badge>
            <h3 className="text-2xl font-heading font-bold">Скретч-карты</h3>
            <p className="text-sm text-muted-foreground">
              Стирай карточки и получай случайные призы до x10
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 w-full">
              <Icon name="TicketPercent" size={18} className="mr-2" />
              Стереть карту
            </Button>
          </div>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-500/30 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="text-6xl">🎁</div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <h3 className="text-2xl font-heading font-bold">Ежедневная награда</h3>
            <p className="text-muted-foreground">
              Заходи каждый день и получай бонусы!
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
              <Badge variant="outline" className="bg-yellow-500/10 border-yellow-500/30 text-yellow-400 text-sm px-3 py-1">
                <Icon name="Coins" size={16} className="mr-1" />
                +500
              </Badge>
              <Badge variant="outline" className="bg-red-500/10 border-red-500/30 text-red-400 text-sm px-3 py-1">
                <Icon name="Gem" size={16} className="mr-1" />
                +10
              </Badge>
              <Badge variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-400 text-sm px-3 py-1">
                <Icon name="Sparkles" size={16} className="mr-1" />
                +5 FS
              </Badge>
            </div>
          </div>
          <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:from-yellow-400 hover:to-orange-400 font-bold px-8 py-6">
            <Icon name="Gift" size={20} className="mr-2" />
            Забрать
          </Button>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card
          className="p-6 bg-card border-border hover:border-primary/50 transition-all cursor-pointer group"
          onClick={() => onNavigate('leaderboard')}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
              👑
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-base">Топ игроков</h4>
              <p className="text-sm text-muted-foreground truncate">1,247 участников</p>
            </div>
            <Icon name="ChevronRight" className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </div>
        </Card>

        <Card
          className="p-6 bg-card border-border hover:border-primary/50 transition-all cursor-pointer group"
          onClick={() => onNavigate('achievements')}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Icon name="Award" size={28} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-base">Достижения</h4>
              <p className="text-sm text-muted-foreground truncate">1 из 6 выполнено</p>
            </div>
            <Icon name="ChevronRight" className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </div>
        </Card>

        <Card
          className="p-6 bg-card border-border hover:border-primary/50 transition-all cursor-pointer group"
          onClick={() => onNavigate('promo')}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Icon name="Percent" size={28} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-base">Промокоды</h4>
              <p className="text-sm text-muted-foreground truncate">Активируй бонусы</p>
            </div>
            <Icon name="ChevronRight" className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomeSection;
