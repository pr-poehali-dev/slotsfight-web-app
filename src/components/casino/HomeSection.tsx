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
  const hotGames = [
    { id: 1, name: 'Gates of Olympus', icon: '🎰', minBet: 100 },
    { id: 2, name: 'Sweet Bonanza', icon: '🍬', minBet: 50 },
    { id: 3, name: 'Crazy Time', icon: '🎡', minBet: 300 },
    { id: 4, name: 'Gonzo Quest', icon: '🗿', minBet: 180 },
  ];

  const features = [
    {
      title: 'Колесо фортуны',
      description: 'Крути колесо каждые 2 часа',
      icon: 'CircleDot',
      color: 'from-purple-600 to-purple-800',
      reward: '+1000',
      action: () => onNavigate('wheel'),
    },
    {
      title: 'Скретч-карты',
      description: 'Стирай и выигрывай призы',
      icon: 'TicketPercent',
      color: 'from-blue-600 to-blue-800',
      reward: 'x5',
      action: () => onNavigate('scratch'),
    },
    {
      title: 'Покер',
      description: 'Играй с реальными игроками',
      icon: 'Spade',
      color: 'from-green-600 to-green-800',
      reward: 'Турниры',
      action: () => onNavigate('poker'),
    },
  ];

  const dailyBonus = {
    coins: 500,
    rubies: 10,
    freespins: 5,
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <Card className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-orange-600 border-none p-8 md:p-12">
        <div className="absolute top-0 right-0 opacity-10 text-[200px]">🎰</div>
        <div className="relative z-10 space-y-4">
          <Badge className="bg-yellow-400 text-black border-none font-bold">
            🔥 ЭКСКЛЮЗИВ
          </Badge>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white">
            Добро пожаловать в<br />SLOTSFIGHT
          </h2>
          <p className="text-white/90 text-lg max-w-xl">
            Бесплатное социальное казино с эксклюзивными слотами, покером и ежедневными наградами
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 font-bold"
              onClick={() => onNavigate('games')}
            >
              <Icon name="Sparkles" size={20} className="mr-2" />
              Играть сейчас
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={() => onNavigate('tasks')}
            >
              Получить бонус
            </Button>
          </div>
        </div>
      </Card>

      <Card className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-500/30 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Icon name="Gift" className="text-yellow-400" size={28} />
              <h3 className="text-xl font-heading font-bold">Ежедневная награда</h3>
            </div>
            <p className="text-sm text-muted-foreground">Забирай бонусы каждый день!</p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="outline" className="bg-yellow-500/10 border-yellow-500/30 text-yellow-400">
                <Icon name="Coins" size={14} className="mr-1" />
                +{dailyBonus.coins}
              </Badge>
              <Badge variant="outline" className="bg-red-500/10 border-red-500/30 text-red-400">
                <Icon name="Gem" size={14} className="mr-1" />
                +{dailyBonus.rubies}
              </Badge>
              <Badge variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-400">
                <Icon name="Sparkles" size={14} className="mr-1" />
                +{dailyBonus.freespins} FREESPIN
              </Badge>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:from-yellow-400 hover:to-orange-400 font-bold">
            Забрать
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        <h3 className="text-2xl font-heading font-bold flex items-center gap-2">
          <span>🔥</span>
          Горячие игры
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {hotGames.map((game, index) => (
            <Card
              key={game.id}
              className="group cursor-pointer bg-card border-border hover:border-primary/50 transition-all duration-300 card-glow overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => onNavigate('games')}
            >
              <div className="aspect-square bg-gradient-to-br from-red-900/20 to-black flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                {game.icon}
              </div>
              <div className="p-3 space-y-2">
                <h4 className="font-semibold text-sm truncate">{game.name}</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-yellow-400">
                    <Icon name="Coins" size={12} />
                    <span>от {game.minBet}</span>
                  </div>
                  <Badge className="bg-red-500 text-white text-xs">HOT</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-heading font-bold">Развлечения</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group cursor-pointer bg-card border-border hover:border-primary/50 transition-all duration-300 card-glow p-6"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={feature.action}
            >
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <Icon name={feature.icon as any} size={32} className="text-white" />
              </div>
              <h4 className="font-heading font-bold text-lg mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
              <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
                {feature.reward}
              </Badge>
            </Card>
          ))}
        </div>
      </div>

      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30 p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Icon name="Percent" className="text-purple-400" size={28} />
              <h3 className="text-xl font-heading font-bold">Есть промокод?</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Активируй промокод и получи FREESPIN, монетки или рубины
            </p>
          </div>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400"
            onClick={() => onNavigate('promo')}
          >
            <Icon name="TicketPercent" size={20} className="mr-2" />
            Активировать
          </Button>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card
          className="p-6 bg-card border-border hover:border-primary/50 transition-all cursor-pointer"
          onClick={() => onNavigate('leaderboard')}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-2xl">
              👑
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">Топ игроков</h4>
              <p className="text-sm text-muted-foreground">Войди в ТОП-10</p>
            </div>
            <Icon name="ChevronRight" className="text-muted-foreground" />
          </div>
        </Card>

        <Card
          className="p-6 bg-card border-border hover:border-primary/50 transition-all cursor-pointer"
          onClick={() => onNavigate('achievements')}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
              <Icon name="Award" size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">Достижения</h4>
              <p className="text-sm text-muted-foreground">1 из 6 выполнено</p>
            </div>
            <Icon name="ChevronRight" className="text-muted-foreground" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomeSection;
