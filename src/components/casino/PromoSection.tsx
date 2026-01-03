import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface PromoSectionProps {
  coins: number;
  setCoins: (coins: number) => void;
  rubies: number;
  setRubies: (rubies: number) => void;
}

const PromoSection = ({ coins, setCoins, rubies, setRubies }: PromoSectionProps) => {
  const [promoCode, setPromoCode] = useState('');
  const [isActivating, setIsActivating] = useState(false);
  const [activatedCodes, setActivatedCodes] = useState<string[]>([]);

  const promoCodes = [
    { code: 'WELCOME2024', reward: { coins: 1000, rubies: 20 }, uses: Infinity, description: 'Приветственный бонус' },
    { code: 'FREESPIN', reward: { freespins: 10 }, uses: Infinity, description: '10 бесплатных вращений' },
    { code: 'LUCKY100', reward: { coins: 500 }, uses: 1, description: 'Счастливая сотня' },
    { code: 'RUBY50', reward: { rubies: 50 }, uses: 1, description: 'Рубиновый дождь' },
    { code: 'MEGA', reward: { coins: 2000, rubies: 30, freespins: 15 }, uses: 1, description: 'Мега бонус' },
  ];

  const activatePromo = () => {
    if (!promoCode.trim()) {
      toast.error('Введите промокод');
      return;
    }

    if (activatedCodes.includes(promoCode.toUpperCase())) {
      toast.error('Этот промокод уже активирован');
      return;
    }

    setIsActivating(true);

    setTimeout(() => {
      const promo = promoCodes.find((p) => p.code.toLowerCase() === promoCode.toLowerCase());

      if (!promo) {
        toast.error('Промокод не найден');
        setIsActivating(false);
        return;
      }

      if (promo.reward.coins) {
        setCoins(coins + promo.reward.coins);
      }
      if (promo.reward.rubies) {
        setRubies(rubies + promo.reward.rubies);
      }

      setActivatedCodes([...activatedCodes, promoCode.toUpperCase()]);
      toast.success('Промокод активирован!', {
        description: promo.description,
      });

      setPromoCode('');
      setIsActivating(false);
    }, 1500);
  };

  const history = [
    { code: 'WELCOME2024', date: '2024-01-15', reward: '1000 монет, 20 рубинов' },
    { code: 'LUCKY100', date: '2024-01-10', reward: '500 монет' },
  ];

  return (
    <div className="space-y-6 animate-slide-up max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          Промокоды
        </h2>
        <p className="text-muted-foreground">Активируй промокод и получи бонусы</p>
      </div>

      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30 p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Icon name="TicketPercent" className="text-purple-400" size={32} />
            <div>
              <h3 className="font-heading font-semibold text-lg">Введи промокод</h3>
              <p className="text-sm text-muted-foreground">Получи монетки, рубины или FREESPIN</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="Введите промокод..."
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              className="flex-1 bg-card/50 border-border text-foreground uppercase"
              onKeyDown={(e) => e.key === 'Enter' && activatePromo()}
            />
            <Button
              onClick={activatePromo}
              disabled={isActivating || !promoCode.trim()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
            >
              {isActivating ? (
                <>
                  <Icon name="Loader2" className="mr-2 animate-spin" size={18} />
                  Проверка...
                </>
              ) : (
                <>
                  <Icon name="Check" className="mr-2" size={18} />
                  Активировать
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-heading font-bold">Доступные промокоды</h3>
        <div className="grid gap-4">
          {promoCodes.map((promo, index) => {
            const isActivated = activatedCodes.includes(promo.code);
            const isExpired = promo.uses === 1 && isActivated;

            return (
              <Card
                key={index}
                className={`p-5 transition-all duration-300 ${
                  isExpired
                    ? 'opacity-50 bg-muted border-border'
                    : 'bg-card border-border hover:border-primary/50 card-glow'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className="bg-purple-500/10 border-purple-500/30 text-purple-400 font-mono text-base px-3 py-1"
                      >
                        {promo.code}
                      </Badge>
                      {isActivated && (
                        <Badge className="bg-green-500/10 border-green-500/30 text-green-400">
                          <Icon name="Check" size={14} className="mr-1" />
                          Активирован
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground">{promo.description}</p>

                    <div className="flex flex-wrap items-center gap-2">
                      {promo.reward.coins && (
                        <Badge variant="outline" className="bg-yellow-500/10 border-yellow-500/30 text-yellow-400">
                          <Icon name="Coins" size={14} className="mr-1" />
                          +{promo.reward.coins}
                        </Badge>
                      )}
                      {promo.reward.rubies && (
                        <Badge variant="outline" className="bg-red-500/10 border-red-500/30 text-red-400">
                          <Icon name="Gem" size={14} className="mr-1" />
                          +{promo.reward.rubies}
                        </Badge>
                      )}
                      {promo.reward.freespins && (
                        <Badge variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-400">
                          <Icon name="Sparkles" size={14} className="mr-1" />
                          +{promo.reward.freespins} FS
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button
                    size="sm"
                    disabled={isActivated}
                    onClick={() => {
                      setPromoCode(promo.code);
                      activatePromo();
                    }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                  >
                    {isActivated ? 'Использован' : 'Применить'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {history.length > 0 && (
        <Card className="p-6 bg-card border-border">
          <h3 className="font-semibold text-lg mb-4">История активаций</h3>
          <div className="space-y-3">
            {history.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border"
              >
                <div className="space-y-1">
                  <p className="font-semibold font-mono">{item.code}</p>
                  <p className="text-sm text-muted-foreground">{item.reward}</p>
                </div>
                <p className="text-xs text-muted-foreground">{item.date}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-500/30 p-6">
        <div className="flex items-start gap-4">
          <Icon name="Info" className="text-orange-400 mt-1" size={24} />
          <div className="space-y-2">
            <h3 className="font-semibold">Как получить промокоды?</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Подписывайся на наши соцсети</li>
              <li>Участвуй в турнирах и конкурсах</li>
              <li>Получай за достижения в игре</li>
              <li>Следи за специальными акциями</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PromoSection;
