import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

interface ProfileSectionProps {
  coins: number;
  rubies: number;
  vipLevel: number;
}

const ProfileSection = ({ coins, rubies, vipLevel }: ProfileSectionProps) => {
  const playerId = 'SF-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  const vipProgress = 65;
  const nextVipBonus = (vipLevel + 1) * 10;

  const stats = [
    { label: 'Всего спинов', value: '2,547', icon: 'Sparkles' },
    { label: 'Побед', value: '342', icon: 'Trophy' },
    { label: 'Выигрыш', value: '₽125,430', icon: 'TrendingUp' },
    { label: 'Дней подряд', value: '7', icon: 'Calendar' },
  ];

  return (
    <div className="space-y-6 animate-slide-up max-w-2xl mx-auto">
      <Card className="bg-gradient-to-br from-red-900/30 to-black border-red-500/30 p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="w-24 h-24 border-4 border-red-500/50 shadow-lg">
            <AvatarFallback className="bg-gradient-to-br from-red-600 to-red-800 text-white text-3xl font-bold">
              PL
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <h2 className="text-2xl font-heading font-bold">Игрок</h2>
              <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black border-none font-bold w-fit mx-auto md:mx-0">
                VIP {vipLevel}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">ID: {playerId}</p>
            
            <div className="flex items-center gap-4 justify-center md:justify-start pt-2">
              <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-3 py-1">
                <Icon name="Coins" className="text-yellow-400" size={18} />
                <span className="font-semibold text-yellow-100">{coins.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-1">
                <Icon name="Gem" className="text-red-400" size={18} />
                <span className="font-semibold text-red-100">{rubies.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <Button variant="outline" className="border-red-500/30 hover:bg-red-500/10">
            <Icon name="Settings" size={18} className="mr-2" />
            Настройки
          </Button>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">VIP прогресс</h3>
              <p className="text-sm text-muted-foreground">До VIP {vipLevel + 1}: {100 - vipProgress}%</p>
            </div>
            <div className="text-yellow-400 font-bold text-xl gold-glow">
              +{vipLevel * 10}%
            </div>
          </div>
          <Progress value={vipProgress} className="h-3" />
          <p className="text-xs text-muted-foreground">
            Выполняйте задания, чтобы повысить VIP уровень и получать бонус +{nextVipBonus}%
          </p>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <h3 className="font-semibold text-lg mb-4">Статистика</h3>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Icon name={stat.icon as any} className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-lg font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-card border-border space-y-4">
        <h3 className="font-semibold text-lg">Быстрые действия</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="justify-start">
            <Icon name="Gift" size={18} className="mr-2" />
            Ежедневная награда
          </Button>
          <Button variant="outline" className="justify-start">
            <Icon name="Share2" size={18} className="mr-2" />
            Пригласить друга
          </Button>
          <Button variant="outline" className="justify-start">
            <Icon name="History" size={18} className="mr-2" />
            История игр
          </Button>
          <Button variant="outline" className="justify-start">
            <Icon name="HelpCircle" size={18} className="mr-2" />
            Поддержка
          </Button>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-r from-red-900/20 to-orange-900/20 border-red-500/30">
        <div className="flex items-center gap-4">
          <Icon name="LogOut" className="text-red-400" size={32} />
          <div className="flex-1">
            <h3 className="font-semibold">Выход из аккаунта</h3>
            <p className="text-sm text-muted-foreground">Вход через Telegram или Google</p>
          </div>
          <Button variant="destructive">
            Выйти
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProfileSection;
