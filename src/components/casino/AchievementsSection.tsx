import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const AchievementsSection = () => {
  const achievements = [
    {
      id: 1,
      title: 'Первый спин',
      description: 'Сделайте свою первую ставку',
      icon: 'Sparkles',
      reward: { coins: 100 },
      completed: true,
      progress: 1,
      total: 1,
      category: 'spins',
    },
    {
      id: 2,
      title: 'Спин-мастер',
      description: 'Сделайте 100 спинов',
      icon: 'Zap',
      reward: { coins: 500, rubies: 10 },
      completed: false,
      progress: 67,
      total: 100,
      category: 'spins',
    },
    {
      id: 3,
      title: 'Большой выигрыш',
      description: 'Выиграйте 10,000 монет за один спин',
      icon: 'TrendingUp',
      reward: { rubies: 25 },
      completed: false,
      progress: 5800,
      total: 10000,
      category: 'wins',
    },
    {
      id: 4,
      title: 'Активный игрок',
      description: 'Заходите в игру 7 дней подряд',
      icon: 'Calendar',
      reward: { coins: 1000 },
      completed: false,
      progress: 4,
      total: 7,
      category: 'activity',
    },
    {
      id: 5,
      title: 'Покер про',
      description: 'Выиграйте 10 покерных раздач',
      icon: 'Spade',
      reward: { coins: 800, rubies: 15 },
      completed: false,
      progress: 3,
      total: 10,
      category: 'poker',
    },
    {
      id: 6,
      title: 'Коллекционер',
      description: 'Выполните 50 заданий',
      icon: 'ListChecks',
      reward: { rubies: 50 },
      completed: false,
      progress: 12,
      total: 50,
      category: 'tasks',
    },
  ];

  const categories = [
    { id: 'all', label: 'Все', icon: 'Grid3x3' },
    { id: 'spins', label: 'Спины', icon: 'Sparkles' },
    { id: 'wins', label: 'Выигрыши', icon: 'TrendingUp' },
    { id: 'activity', label: 'Активность', icon: 'Calendar' },
    { id: 'poker', label: 'Покер', icon: 'Spade' },
    { id: 'tasks', label: 'Задания', icon: 'ListChecks' },
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-heading font-bold">Достижения</h2>
        <p className="text-muted-foreground">Выполняйте задачи и получайте награды</p>
      </div>

      <Card className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-500/30 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Прогресс достижений</h3>
            <p className="text-sm text-muted-foreground mt-1">1 из 6 завершено</p>
          </div>
          <div className="text-3xl font-bold text-yellow-400 gold-glow">16%</div>
        </div>
        <Progress value={16} className="mt-4 h-3" />
      </Card>

      <div className="grid gap-4">
        {achievements.map((achievement, index) => (
          <Card
            key={achievement.id}
            className={`p-5 transition-all duration-300 ${
              achievement.completed
                ? 'bg-gradient-to-r from-green-900/30 to-green-800/20 border-green-500/30'
                : 'bg-card border-border hover:border-primary/50 card-glow'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex gap-4">
              <div
                className={`flex items-center justify-center w-16 h-16 rounded-xl ${
                  achievement.completed
                    ? 'bg-gradient-to-br from-green-500 to-green-600'
                    : 'bg-gradient-to-br from-red-600 to-red-800'
                } shadow-lg`}
              >
                <Icon name={achievement.icon as any} size={32} className="text-white" />
              </div>

              <div className="flex-1 space-y-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{achievement.title}</h3>
                    {achievement.completed && (
                      <Icon name="CheckCircle2" className="text-green-500" size={20} />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                </div>

                {!achievement.completed && (
                  <div className="space-y-2">
                    <Progress value={(achievement.progress / achievement.total) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {achievement.progress} / {achievement.total}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  {achievement.reward.coins && (
                    <Badge variant="outline" className="bg-yellow-500/10 border-yellow-500/30 text-yellow-400">
                      <Icon name="Coins" size={14} className="mr-1" />
                      +{achievement.reward.coins}
                    </Badge>
                  )}
                  {achievement.reward.rubies && (
                    <Badge variant="outline" className="bg-red-500/10 border-red-500/30 text-red-400">
                      <Icon name="Gem" size={14} className="mr-1" />
                      +{achievement.reward.rubies}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection;
