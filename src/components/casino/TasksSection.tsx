import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface TasksSectionProps {
  coins: number;
  setCoins: (coins: number) => void;
  rubies: number;
  setRubies: (rubies: number) => void;
}

const TasksSection = ({ coins, setCoins, rubies, setRubies }: TasksSectionProps) => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Войти в игру', reward: { coins: 100 }, completed: true, locked: false },
    { id: 2, title: 'Сыграть 5 спинов', reward: { coins: 250 }, completed: false, locked: false, progress: 3, total: 5 },
    { id: 3, title: 'Выиграть 1000 монет', reward: { rubies: 10 }, completed: false, locked: false, progress: 650, total: 1000 },
    { id: 4, title: 'Сыграть в покер', reward: { coins: 500, rubies: 5 }, completed: false, locked: true, progress: 0, total: 1 },
    { id: 5, title: 'Ежедневная награда', reward: { coins: 300 }, completed: false, locked: true, progress: 0, total: 1 },
  ]);

  const [timeUntilNext, setTimeUntilNext] = useState(1234);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeUntilNext(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const completeTask = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.completed || task.locked) return;

    if (task.reward.coins) setCoins(coins + task.reward.coins);
    if (task.reward.rubies) setRubies(rubies + task.reward.rubies);

    setTasks(tasks.map(t => 
      t.id === taskId 
        ? { ...t, completed: true }
        : t.id === taskId + 1 
          ? { ...t, locked: false }
          : t
    ));
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <Card className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-red-500/30 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Clock" className="text-yellow-400" size={32} />
            <div>
              <h3 className="font-heading font-semibold text-lg">Следующее задание</h3>
              <p className="text-sm text-muted-foreground">Откроется через</p>
            </div>
          </div>
          <div className="text-3xl font-bold font-heading text-yellow-400 gold-glow">
            {formatTime(timeUntilNext)}
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-heading font-bold">Задания</h2>
        
        {tasks.map((task, index) => (
          <Card
            key={task.id}
            className={`p-5 transition-all duration-300 ${
              task.locked 
                ? 'opacity-50 bg-muted border-border' 
                : task.completed
                  ? 'bg-green-900/20 border-green-500/30'
                  : 'bg-card border-border hover:border-primary/50 card-glow'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  {task.locked && <Icon name="Lock" className="text-muted-foreground" size={20} />}
                  {task.completed && <Icon name="CheckCircle2" className="text-green-500" size={20} />}
                  <h3 className="font-semibold text-lg">{task.title}</h3>
                </div>

                {!task.completed && !task.locked && task.progress !== undefined && (
                  <div className="space-y-2">
                    <Progress value={(task.progress / task.total) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Прогресс: {task.progress} / {task.total}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  {task.reward.coins && (
                    <Badge variant="outline" className="bg-yellow-500/10 border-yellow-500/30 text-yellow-400">
                      <Icon name="Coins" size={14} className="mr-1" />
                      +{task.reward.coins}
                    </Badge>
                  )}
                  {task.reward.rubies && (
                    <Badge variant="outline" className="bg-red-500/10 border-red-500/30 text-red-400">
                      <Icon name="Gem" size={14} className="mr-1" />
                      +{task.reward.rubies}
                    </Badge>
                  )}
                </div>
              </div>

              {!task.completed && !task.locked && (
                <Button
                  onClick={() => completeTask(task.id)}
                  size="sm"
                  className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400"
                >
                  Забрать
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TasksSection;
