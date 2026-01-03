import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';

const ChatSection = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'Игрок1337',
      vip: 5,
      message: 'Только что выиграл 10k на Gates of Olympus! 🎰',
      timestamp: '14:32',
      isSystem: false,
    },
    {
      id: 2,
      user: 'Система',
      message: 'Игрок ProGamer выиграл джекпот 50,000 монет! 🎉',
      timestamp: '14:35',
      isSystem: true,
    },
    {
      id: 3,
      user: 'LuckyOne',
      vip: 3,
      message: 'Кто-нибудь знает хороший промокод?',
      timestamp: '14:38',
      isSystem: false,
    },
    {
      id: 4,
      user: 'SlotKing',
      vip: 3,
      message: 'Попробуй WELCOME2024, работает!',
      timestamp: '14:39',
      isSystem: false,
    },
    {
      id: 5,
      user: 'MegaWin',
      vip: 2,
      message: 'Колесо фортуны дало мне 1000 монет 💰',
      timestamp: '14:42',
      isSystem: false,
    },
    {
      id: 6,
      user: 'Система',
      message: 'Турнир по покеру начнется через 30 минут! Призовой фонд: 100,000 монет',
      timestamp: '14:45',
      isSystem: true,
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      user: 'Вы',
      vip: 2,
      message: message,
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      isSystem: false,
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const onlineCount = 1247;

  return (
    <div className="space-y-4 animate-slide-up max-w-4xl mx-auto h-[calc(100vh-200px)] flex flex-col">
      <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <div>
              <h3 className="font-heading font-semibold text-lg">Общий чат</h3>
              <p className="text-sm text-muted-foreground">Онлайн: {onlineCount.toLocaleString()}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="border-green-500/30">
            <Icon name="Settings" size={16} />
          </Button>
        </div>
      </Card>

      <Card className="flex-1 bg-card border-border p-4 overflow-hidden">
        <ScrollArea className="h-full pr-4" ref={scrollRef as any}>
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.isSystem ? 'justify-center' : ''}`}
              >
                {msg.isSystem ? (
                  <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg px-4 py-2 text-center max-w-lg">
                    <div className="flex items-center justify-center gap-2">
                      <Icon name="Info" size={16} className="text-blue-400" />
                      <p className="text-sm text-blue-200">{msg.message}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{msg.timestamp}</p>
                  </div>
                ) : (
                  <>
                    <Avatar className="w-10 h-10 border-2 border-primary/30 flex-shrink-0">
                      <AvatarFallback className="bg-gradient-to-br from-red-600 to-red-800 text-white text-sm font-semibold">
                        {msg.user.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{msg.user}</span>
                        {msg.vip && (
                          <Badge
                            variant="outline"
                            className="bg-yellow-500/10 border-yellow-500/30 text-yellow-400 text-xs h-5"
                          >
                            VIP {msg.vip}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                      </div>
                      <div className="bg-muted/30 rounded-lg px-3 py-2 inline-block">
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      <Card className="bg-card border-border p-4">
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="Напишите сообщение..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 bg-muted/30 border-border"
          />
          <Button
            onClick={sendMessage}
            disabled={!message.trim()}
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400"
          >
            <Icon name="Send" size={18} />
          </Button>
        </div>

        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
          <Icon name="Info" size={14} />
          <span>Будьте вежливы и соблюдайте правила чата</span>
        </div>
      </Card>
    </div>
  );
};

export default ChatSection;
