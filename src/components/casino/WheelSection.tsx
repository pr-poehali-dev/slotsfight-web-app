import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface WheelSectionProps {
  coins: number;
  setCoins: (coins: number) => void;
  rubies: number;
  setRubies: (rubies: number) => void;
}

const WheelSection = ({ coins, setCoins, rubies, setRubies }: WheelSectionProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [canSpin, setCanSpin] = useState(true);
  const [timeUntilSpin, setTimeUntilSpin] = useState(0);
  const [lastPrize, setLastPrize] = useState<any>(null);

  const prizes = [
    { id: 1, label: '100', type: 'coins', value: 100, color: 'from-yellow-500 to-yellow-600' },
    { id: 2, label: '5', type: 'rubies', value: 5, color: 'from-red-500 to-red-600' },
    { id: 3, label: '250', type: 'coins', value: 250, color: 'from-yellow-500 to-yellow-600' },
    { id: 4, label: '3 FS', type: 'freespin', value: 3, color: 'from-purple-500 to-purple-600' },
    { id: 5, label: '500', type: 'coins', value: 500, color: 'from-yellow-500 to-yellow-600' },
    { id: 6, label: '10', type: 'rubies', value: 10, color: 'from-red-500 to-red-600' },
    { id: 7, label: '1000', type: 'coins', value: 1000, color: 'from-yellow-500 to-yellow-600' },
    { id: 8, label: '5 FS', type: 'freespin', value: 5, color: 'from-purple-500 to-purple-600' },
  ];

  useEffect(() => {
    if (timeUntilSpin > 0) {
      const interval = setInterval(() => {
        setTimeUntilSpin((prev) => {
          if (prev <= 1) {
            setCanSpin(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timeUntilSpin]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const spinWheel = () => {
    if (!canSpin || isSpinning) return;

    setIsSpinning(true);
    const randomPrizeIndex = Math.floor(Math.random() * prizes.length);
    const prize = prizes[randomPrizeIndex];
    
    const baseRotation = 360 * 5;
    const prizeAngle = (360 / prizes.length) * randomPrizeIndex;
    const finalRotation = rotation + baseRotation + (360 - prizeAngle) + (360 / prizes.length / 2);

    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setLastPrize(prize);
      
      if (prize.type === 'coins') {
        setCoins(coins + prize.value);
      } else if (prize.type === 'rubies') {
        setRubies(rubies + prize.value);
      }

      setCanSpin(false);
      setTimeUntilSpin(7200);
    }, 4000);
  };

  return (
    <div className="space-y-6 animate-slide-up max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          Колесо фортуны
        </h2>
        <p className="text-muted-foreground">Крути колесо каждые 2 часа и выигрывай призы!</p>
      </div>

      {!canSpin && (
        <Card className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-500/30 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Clock" className="text-orange-400" size={32} />
              <div>
                <h3 className="font-heading font-semibold text-lg">Следующее вращение</h3>
                <p className="text-sm text-muted-foreground">Возвращайся позже</p>
              </div>
            </div>
            <div className="text-2xl font-bold font-heading text-orange-400">
              {formatTime(timeUntilSpin)}
            </div>
          </div>
        </Card>
      )}

      <div className="relative flex items-center justify-center p-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
          <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-red-500 drop-shadow-lg" />
        </div>

        <div className="relative w-full max-w-md aspect-square">
          <div
            className={cn(
              'w-full h-full rounded-full relative transition-transform duration-[4000ms] ease-out',
              isSpinning && 'pointer-events-none'
            )}
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none',
            }}
          >
            {prizes.map((prize, index) => {
              const angle = (360 / prizes.length) * index;
              return (
                <div
                  key={prize.id}
                  className={cn(
                    'absolute w-full h-full',
                    `bg-gradient-to-br ${prize.color}`
                  )}
                  style={{
                    clipPath: `polygon(50% 50%, ${
                      50 + 50 * Math.cos((angle * Math.PI) / 180)
                    }% ${50 + 50 * Math.sin((angle * Math.PI) / 180)}%, ${
                      50 + 50 * Math.cos(((angle + 360 / prizes.length) * Math.PI) / 180)
                    }% ${50 + 50 * Math.sin(((angle + 360 / prizes.length) * Math.PI) / 180)}%)`,
                    transform: 'rotate(0deg)',
                  }}
                >
                  <div
                    className="absolute top-[20%] left-1/2 -translate-x-1/2 text-white font-bold text-lg"
                    style={{
                      transform: `rotate(${angle + 360 / prizes.length / 2}deg)`,
                    }}
                  >
                    {prize.label}
                  </div>
                </div>
              );
            })}

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-300 shadow-2xl flex items-center justify-center border-4 border-red-500">
              <Icon name="Sparkles" className="text-red-500" size={32} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          size="lg"
          disabled={!canSpin || isSpinning}
          onClick={spinWheel}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-lg px-12 py-6 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {isSpinning ? (
            <>
              <Icon name="Loader2" className="mr-2 animate-spin" size={24} />
              Вращение...
            </>
          ) : canSpin ? (
            <>
              <Icon name="CircleDot" className="mr-2" size={24} />
              Крутить колесо
            </>
          ) : (
            <>
              <Icon name="Lock" className="mr-2" size={24} />
              Недоступно
            </>
          )}
        </Button>
      </div>

      {lastPrize && (
        <Card className="bg-gradient-to-r from-green-900/30 to-green-800/20 border-green-500/30 p-6 animate-scale-in">
          <div className="text-center space-y-3">
            <Icon name="PartyPopper" className="mx-auto text-yellow-400" size={48} />
            <h3 className="text-2xl font-heading font-bold">Поздравляем!</h3>
            <p className="text-muted-foreground">Вы выиграли:</p>
            <Badge
              variant="outline"
              className={cn(
                'text-lg px-4 py-2',
                lastPrize.type === 'coins' && 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
                lastPrize.type === 'rubies' && 'bg-red-500/10 border-red-500/30 text-red-400',
                lastPrize.type === 'freespin' && 'bg-purple-500/10 border-purple-500/30 text-purple-400'
              )}
            >
              {lastPrize.type === 'coins' && <Icon name="Coins" size={18} className="mr-2" />}
              {lastPrize.type === 'rubies' && <Icon name="Gem" size={18} className="mr-2" />}
              {lastPrize.type === 'freespin' && <Icon name="Sparkles" size={18} className="mr-2" />}
              {lastPrize.label}
            </Badge>
          </div>
        </Card>
      )}

      <Card className="p-6 bg-card border-border">
        <h3 className="font-semibold text-lg mb-4">Возможные призы</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {prizes.map((prize) => (
            <div
              key={prize.id}
              className={cn(
                'p-4 rounded-lg bg-gradient-to-br text-center space-y-2 border-2 border-transparent hover:border-white/20 transition-colors',
                prize.color
              )}
            >
              <div className="text-2xl font-bold text-white">{prize.label}</div>
              <div className="text-xs text-white/80 capitalize">{prize.type === 'freespin' ? 'Free Spins' : prize.type}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default WheelSection;
