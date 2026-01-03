import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface ScratchSectionProps {
  coins: number;
  setCoins: (coins: number) => void;
  rubies: number;
  setRubies: (rubies: number) => void;
}

const ScratchSection = ({ coins, setCoins, rubies, setRubies }: ScratchSectionProps) => {
  const [cards, setCards] = useState([
    { id: 1, cost: 100, costType: 'coins', scratched: false, revealed: false },
    { id: 2, cost: 250, costType: 'coins', scratched: false, revealed: false },
    { id: 3, cost: 10, costType: 'rubies', scratched: false, revealed: false },
    { id: 4, cost: 500, costType: 'coins', scratched: false, revealed: false },
    { id: 5, cost: 20, costType: 'rubies', scratched: false, revealed: false },
    { id: 6, cost: 1000, costType: 'coins', scratched: false, revealed: false },
  ]);

  const prizes = [
    { type: 'coins', value: 150, label: '+150', icon: 'Coins', color: 'yellow' },
    { type: 'coins', value: 500, label: '+500', icon: 'Coins', color: 'yellow' },
    { type: 'rubies', value: 25, label: '+25', icon: 'Gem', color: 'red' },
    { type: 'coins', value: 1500, label: '+1500', icon: 'Coins', color: 'yellow' },
    { type: 'rubies', value: 50, label: '+50', icon: 'Gem', color: 'red' },
    { type: 'freespin', value: 10, label: '10 FS', icon: 'Sparkles', color: 'purple' },
  ];

  const scratchCard = (cardId: number) => {
    const card = cards.find((c) => c.id === cardId);
    if (!card || card.scratched) return;

    if (card.costType === 'coins' && coins < card.cost) {
      return;
    }
    if (card.costType === 'rubies' && rubies < card.cost) {
      return;
    }

    if (card.costType === 'coins') {
      setCoins(coins - card.cost);
    } else {
      setRubies(rubies - card.cost);
    }

    setCards(
      cards.map((c) =>
        c.id === cardId ? { ...c, scratched: true } : c
      )
    );

    setTimeout(() => {
      const prize = prizes[Math.floor(Math.random() * prizes.length)];
      
      if (prize.type === 'coins') {
        setCoins((prev) => prev + prize.value);
      } else if (prize.type === 'rubies') {
        setRubies((prev) => prev + prize.value);
      }

      setCards((prev) =>
        prev.map((c) =>
          c.id === cardId ? { ...c, revealed: true } : c
        )
      );
    }, 1000);
  };

  const resetCards = () => {
    setCards(
      cards.map((card) => ({
        ...card,
        scratched: false,
        revealed: false,
      }))
    );
  };

  const getCardPrize = (cardId: number) => {
    return prizes[cardId % prizes.length];
  };

  return (
    <div className="space-y-6 animate-slide-up max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">
          Скретч-карты
        </h2>
        <p className="text-muted-foreground">Стирай карты и выигрывай ценные призы!</p>
      </div>

      <Card className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-500/30 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-semibold text-lg">Как играть?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Выбери карту, оплати стоимость и узнай, что за ней скрывается
            </p>
          </div>
          <Button
            variant="outline"
            onClick={resetCards}
            className="border-blue-500/30 hover:bg-blue-500/10"
          >
            <Icon name="RotateCcw" size={18} className="mr-2" />
            Обновить
          </Button>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card) => {
          const prize = getCardPrize(card.id);
          return (
            <Card
              key={card.id}
              className={cn(
                'relative overflow-hidden transition-all duration-300 cursor-pointer',
                !card.scratched && 'hover:scale-105 card-glow hover:border-primary/50',
                card.revealed && 'bg-gradient-to-br from-green-900/30 to-green-800/20 border-green-500/30'
              )}
              onClick={() => scratchCard(card.id)}
            >
              <div className="aspect-[3/4] relative">
                {!card.scratched ? (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 flex flex-col items-center justify-center p-6 space-y-4">
                    <Icon name="TicketPercent" size={64} className="text-gray-400" />
                    <div className="text-center space-y-2">
                      <p className="text-sm text-gray-300">Стоимость</p>
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-lg px-3 py-1',
                          card.costType === 'coins'
                            ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                            : 'bg-red-500/10 border-red-500/30 text-red-400'
                        )}
                      >
                        {card.costType === 'coins' ? (
                          <Icon name="Coins" size={16} className="mr-1" />
                        ) : (
                          <Icon name="Gem" size={16} className="mr-1" />
                        )}
                        {card.cost}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-400">Нажми, чтобы стереть</p>
                  </div>
                ) : !card.revealed ? (
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center">
                    <Icon name="Loader2" size={64} className="text-white animate-spin" />
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 flex flex-col items-center justify-center p-6 space-y-4 animate-scale-in">
                    <Icon name="PartyPopper" size={48} className="text-yellow-400" />
                    <div className="text-center space-y-3">
                      <p className="text-sm text-white/80">Вы выиграли!</p>
                      <div
                        className={cn(
                          'w-20 h-20 rounded-full mx-auto flex items-center justify-center',
                          prize.color === 'yellow' && 'bg-yellow-500',
                          prize.color === 'red' && 'bg-red-500',
                          prize.color === 'purple' && 'bg-purple-500'
                        )}
                      >
                        <Icon name={prize.icon as any} size={32} className="text-white" />
                      </div>
                      <p className="text-2xl font-bold text-white">{prize.label}</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6 bg-card border-border">
        <h3 className="font-semibold text-lg mb-4">Возможные призы</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {prizes.map((prize, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border"
            >
              <div
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center',
                  prize.color === 'yellow' && 'bg-yellow-500/20',
                  prize.color === 'red' && 'bg-red-500/20',
                  prize.color === 'purple' && 'bg-purple-500/20'
                )}
              >
                <Icon
                  name={prize.icon as any}
                  size={24}
                  className={cn(
                    prize.color === 'yellow' && 'text-yellow-400',
                    prize.color === 'red' && 'text-red-400',
                    prize.color === 'purple' && 'text-purple-400'
                  )}
                />
              </div>
              <div>
                <p className="font-semibold">{prize.label}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {prize.type === 'freespin' ? 'Free Spins' : prize.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ScratchSection;
