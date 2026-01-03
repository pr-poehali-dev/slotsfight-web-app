import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: 'games' | 'tasks' | 'leaderboard' | 'achievements' | 'profile') => void;
}

const BottomNav = ({ activeTab, setActiveTab }: BottomNavProps) => {
  const navItems = [
    { id: 'leaderboard', icon: 'Trophy', label: 'Топ' },
    { id: 'achievements', icon: 'Award', label: 'Достижения' },
    { id: 'profile', icon: 'User', label: 'Профиль' },
    { id: 'games', icon: 'Sparkles', label: 'Игры' },
    { id: 'tasks', icon: 'ListChecks', label: 'Задания' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-red-900/30 z-50">
      <div className="container mx-auto px-2">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200',
                activeTab === item.id
                  ? 'bg-gradient-to-t from-red-600/30 to-red-500/20 text-red-400 scale-110'
                  : 'text-gray-400 hover:text-gray-200'
              )}
            >
              <Icon 
                name={item.icon as any} 
                size={22} 
                className={activeTab === item.id ? 'drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]' : ''} 
              />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
