import { useState } from 'react';
import Header from '@/components/casino/Header';
import BottomNav from '@/components/casino/BottomNav';
import HomeSection from '@/components/casino/HomeSection';
import GamesSection from '@/components/casino/GamesSection';
import TasksSection from '@/components/casino/TasksSection';
import LeaderboardSection from '@/components/casino/LeaderboardSection';
import AchievementsSection from '@/components/casino/AchievementsSection';
import ProfileSection from '@/components/casino/ProfileSection';
import WheelSection from '@/components/casino/WheelSection';
import ScratchSection from '@/components/casino/ScratchSection';
import PromoSection from '@/components/casino/PromoSection';
import ChatSection from '@/components/casino/ChatSection';

type TabType = 'home' | 'games' | 'tasks' | 'leaderboard' | 'achievements' | 'profile' | 'wheel' | 'scratch' | 'promo' | 'poker' | 'chat';

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [coins, setCoins] = useState(15000);
  const [rubies, setRubies] = useState(250);
  const [vipLevel, setVipLevel] = useState(2);

  const handleNavigate = (section: string) => {
    setActiveTab(section as TabType);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeSection coins={coins} rubies={rubies} onNavigate={handleNavigate} />;
      case 'games':
        return <GamesSection coins={coins} rubies={rubies} />;
      case 'tasks':
        return <TasksSection coins={coins} setCoins={setCoins} rubies={rubies} setRubies={setRubies} />;
      case 'leaderboard':
        return <LeaderboardSection />;
      case 'achievements':
        return <AchievementsSection />;
      case 'profile':
        return <ProfileSection coins={coins} rubies={rubies} vipLevel={vipLevel} />;
      case 'wheel':
        return <WheelSection coins={coins} setCoins={setCoins} rubies={rubies} setRubies={setRubies} />;
      case 'scratch':
        return <ScratchSection coins={coins} setCoins={setCoins} rubies={rubies} setRubies={setRubies} />;
      case 'promo':
        return <PromoSection coins={coins} setCoins={setCoins} rubies={rubies} setRubies={setRubies} />;
      case 'chat':
        return <ChatSection />;
      default:
        return <HomeSection coins={coins} rubies={rubies} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen casino-gradient pb-20">
      <Header coins={coins} rubies={rubies} vipLevel={vipLevel} />
      
      <main className="container mx-auto px-4 py-6 animate-fade-in">
        {renderContent()}
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab as any} />
    </div>
  );
};

export default Index;