import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface PromoBannerProps {
  onNavigate: (section: string) => void;
}

const PromoBanner = ({ onNavigate }: PromoBannerProps) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const banners = [
    {
      id: 1,
      title: 'Лучшие слоты\nвсего мира',
      description: 'Играй бесплатно, выигрывай монеты и рубины',
      gradient: 'from-red-600 via-orange-600 to-yellow-600',
      badge: '🔥 НОВИНКА',
      badge2: 'x2 БОНУС',
      emoji: '🎰',
      action: () => onNavigate('games'),
      buttonText: 'Начать играть',
      buttonIcon: 'Play',
    },
    {
      id: 2,
      title: 'Колесо фортуны\nКаждые 2 часа',
      description: 'Крути колесо и выигрывай до 1000 монет',
      gradient: 'from-purple-600 via-pink-600 to-purple-800',
      badge: '⏰ ДОСТУПНО',
      emoji: '🎡',
      action: () => onNavigate('wheel'),
      buttonText: 'Крутить колесо',
      buttonIcon: 'CircleDot',
    },
    {
      id: 3,
      title: 'Турнир по покеру\n100,000 призовой',
      description: 'Стань чемпионом и забери главный приз',
      gradient: 'from-green-600 via-emerald-600 to-teal-700',
      badge: '🏆 ТУРНИР',
      badge2: 'Старт 18:00',
      emoji: '♠️',
      action: () => onNavigate('poker'),
      buttonText: 'Участвовать',
      buttonIcon: 'Trophy',
    },
    {
      id: 4,
      title: 'Промокод дня\nWELCOME2024',
      description: 'Активируй и получи 1000 монет + 20 рубинов',
      gradient: 'from-blue-600 via-cyan-600 to-blue-800',
      badge: '🎁 БОНУС',
      emoji: '💎',
      action: () => onNavigate('promo'),
      buttonText: 'Активировать',
      buttonIcon: 'Gift',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl group">
      <div className="relative h-[400px] md:h-[450px]">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={cn(
              'absolute inset-0 transition-all duration-700 ease-in-out',
              index === activeSlide
                ? 'opacity-100 translate-x-0'
                : index < activeSlide
                ? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'
            )}
          >
            <div className={cn('h-full bg-gradient-to-br p-8 md:p-12', banner.gradient)}>
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 right-10 text-9xl animate-pulse">{banner.emoji}</div>
                <div className="absolute bottom-10 left-10 text-7xl opacity-50">💫</div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] opacity-30">
                  {banner.emoji}
                </div>
              </div>

              <div className="relative z-10 h-full flex flex-col justify-center max-w-2xl space-y-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge className="bg-yellow-400 text-black border-none font-bold text-sm px-4 py-1">
                    {banner.badge}
                  </Badge>
                  {banner.badge2 && (
                    <Badge className="bg-black/30 backdrop-blur-sm text-white border-white/30 font-semibold text-sm px-4 py-1">
                      {banner.badge2}
                    </Badge>
                  )}
                </div>

                <h1 className="text-4xl md:text-6xl font-heading font-black text-white leading-tight whitespace-pre-line">
                  {banner.title}
                </h1>

                <p className="text-white/90 text-lg md:text-xl font-medium max-w-lg">
                  {banner.description}
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Button
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-100 font-bold text-lg px-8 py-6 shadow-2xl"
                    onClick={banner.action}
                  >
                    <Icon name={banner.buttonIcon as any} size={24} className="mr-2" />
                    {banner.buttonText}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 z-20"
      >
        <Icon name="ChevronLeft" size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 z-20"
      >
        <Icon name="ChevronRight" size={24} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              index === activeSlide ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/70'
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoBanner;
