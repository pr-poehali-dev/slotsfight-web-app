import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  coins: number;
  rubies: number;
  vipLevel: number;
}

const Header = ({ coins, rubies, vipLevel }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-lg border-b border-red-900/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              SLOTSFIGHT
            </h1>
            <Badge variant="outline" className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black border-yellow-400 font-semibold px-3 py-1">
              VIP {vipLevel}
            </Badge>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-lg px-3 py-2 hover:scale-105 transition-transform">
              <Icon name="Coins" className="text-yellow-400" size={20} />
              <span className="font-semibold text-yellow-100 text-sm md:text-base">
                {coins.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-pink-600/20 border border-red-500/30 rounded-lg px-3 py-2 hover:scale-105 transition-transform">
              <Icon name="Gem" className="text-red-400" size={20} />
              <span className="font-semibold text-red-100 text-sm md:text-base">
                {rubies.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
