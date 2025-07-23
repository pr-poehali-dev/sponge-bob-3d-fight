import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [battleMode, setBattleMode] = useState(false);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [enemyHealth, setEnemyHealth] = useState(100);

  const handleAttack = () => {
    if (enemyHealth > 0) {
      setEnemyHealth(prev => Math.max(0, prev - 25));
      // Enemy counter-attack
      setTimeout(() => {
        if (playerHealth > 0) {
          setPlayerHealth(prev => Math.max(0, prev - 15));
        }
      }, 1000);
    }
  };

  const startBattle = () => {
    setBattleMode(true);
    setPlayerHealth(100);
    setEnemyHealth(100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: 'url(/img/bc03f453-71bf-4252-a383-87aff07d83e6.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        
        <div className="relative z-10 text-center text-white max-w-4xl px-6">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent animate-fade-in">
            3D ADVENTURE
          </h1>
          <p className="text-2xl mb-4 text-gray-300 animate-fade-in">
            Мистический дом полон опасностей
          </p>
          <div className="mb-8 p-4 bg-black/30 rounded-lg backdrop-blur-sm animate-scale-in">
            <p className="text-lg italic text-orange-300">
              "Если ехать на трамвае, то нет туалета..."
            </p>
            <p className="text-sm text-gray-400 mt-2">— Загадочный чувак</p>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={startBattle}
              className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-xl px-8 py-4 h-auto"
            >
              <Icon name="Sword" className="mr-2" />
              Войти в дом
            </Button>
            <Button 
              variant="outline" 
              className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white text-xl px-8 py-4 h-auto"
            >
              <Icon name="Map" className="mr-2" />
              Исследовать улицу
            </Button>
          </div>
        </div>
      </section>

      {/* Characters Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 text-white">
            Персонажи и враги
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* SpongeBob */}
            <Card className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-orange-500/30 hover:scale-105 transition-transform">
              <CardHeader>
                <div 
                  className="h-48 bg-cover bg-center rounded-lg mb-4"
                  style={{ backgroundImage: 'url(/img/46867808-37d5-4781-b68e-adab46e8c494.jpg)' }}
                />
                <CardTitle className="text-orange-400">Губка Боб</CardTitle>
                <CardDescription className="text-gray-300">
                  Опасный повар с темными намерениями
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Badge variant="destructive">Враг</Badge>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Здоровье</p>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Урон</p>
                    <Progress value={60} className="h-2" />
                  </div>
                  <p className="text-sm text-yellow-300 italic">
                    "Иди сюда! Сейчас будем тебе резать жору!"
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Player */}
            <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/30 hover:scale-105 transition-transform">
              <CardHeader>
                <div className="h-48 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg mb-4 flex items-center justify-center">
                  <Icon name="User" size={80} className="text-white" />
                </div>
                <CardTitle className="text-purple-400">Игрок</CardTitle>
                <CardDescription className="text-gray-300">
                  Герой с перчаткой бесконечности
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Badge className="bg-purple-600">Протагонист</Badge>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Здоровье</p>
                    <Progress value={playerHealth} className="h-2" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Сила</p>
                    <Progress value={90} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mysterious Guy */}
            <Card className="bg-gradient-to-br from-gray-900/50 to-slate-900/50 border-gray-500/30 hover:scale-105 transition-transform">
              <CardHeader>
                <div className="h-48 bg-gradient-to-br from-gray-600 to-slate-600 rounded-lg mb-4 flex items-center justify-center">
                  <Icon name="UserX" size={80} className="text-white" />
                </div>
                <CardTitle className="text-gray-400">Загадочный чувак</CardTitle>
                <CardDescription className="text-gray-300">
                  Предупреждает о трамваях
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Badge variant="secondary">NPC</Badge>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Мудрость</p>
                    <Progress value={100} className="h-2" />
                  </div>
                  <p className="text-sm text-blue-300 italic">
                    "В трамвае туалета нет, запомни это..."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Battle System */}
      {battleMode && (
        <section className="py-20 px-6 bg-gradient-to-br from-red-900/30 to-purple-900/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">
              Битва началась!
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Player Status */}
              <Card className="bg-purple-900/50 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-400">Игрок</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Здоровье: {playerHealth}/100</p>
                      <Progress value={playerHealth} className="h-3" />
                    </div>
                    <div 
                      className="h-32 bg-cover bg-center rounded-lg"
                      style={{ backgroundImage: 'url(/img/8ae221ac-e004-46a2-badd-0bafc34360ac.jpg)' }}
                    />
                    <p className="text-sm text-purple-300">Перчатка бесконечности готова к бою!</p>
                  </div>
                </CardContent>
              </Card>

              {/* Enemy Status */}
              <Card className="bg-orange-900/50 border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-orange-400">Губка Боб</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Здоровье: {enemyHealth}/100</p>
                      <Progress value={enemyHealth} className="h-3" />
                    </div>
                    <div 
                      className="h-32 bg-cover bg-center rounded-lg"
                      style={{ backgroundImage: 'url(/img/46867808-37d5-4781-b68e-adab46e8c494.jpg)' }}
                    />
                    <p className="text-sm text-orange-300">
                      {enemyHealth > 0 ? "Смеется и какает пистолетами!" : "Побежден!"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Battle Actions */}
            <div className="text-center space-y-4">
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={handleAttack}
                  disabled={enemyHealth === 0 || playerHealth === 0}
                  className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
                >
                  <Icon name="Zap" className="mr-2" />
                  Атака перчаткой
                </Button>
                <Button 
                  variant="outline"
                  className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white"
                >
                  <Icon name="Shield" className="mr-2" />
                  Защита
                </Button>
              </div>
              
              {enemyHealth === 0 && (
                <div className="p-4 bg-green-900/30 rounded-lg border border-green-500/30">
                  <p className="text-green-400 text-xl font-bold">Победа! Губка Боб повержен!</p>
                  <p className="text-gray-300 mt-2">Теперь можете исследовать остальную часть дома</p>
                </div>
              )}
              
              {playerHealth === 0 && (
                <div className="p-4 bg-red-900/30 rounded-lg border border-red-500/30">
                  <p className="text-red-400 text-xl font-bold">Поражение! Пистолеты оказались сильнее...</p>
                  <Button 
                    onClick={() => {
                      setPlayerHealth(100);
                      setEnemyHealth(100);
                    }}
                    className="mt-4"
                  >
                    Попробовать снова
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Game Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 text-white">
            Особенности игры
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-purple-900/30 to-purple-900/10 border-purple-500/20 hover:scale-105 transition-transform">
              <CardHeader>
                <Icon name="Home" size={40} className="text-purple-400 mb-4" />
                <CardTitle className="text-purple-400">Старый дом</CardTitle>
                <CardDescription className="text-gray-300">
                  Исследуйте мрачные комнаты и открывайте двери
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/30 to-orange-900/10 border-orange-500/20 hover:scale-105 transition-transform">
              <CardHeader>
                <Icon name="Swords" size={40} className="text-orange-400 mb-4" />
                <CardTitle className="text-orange-400">Боевая система</CardTitle>
                <CardDescription className="text-gray-300">
                  Сражайтесь с различными персонажами
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 border-blue-500/20 hover:scale-105 transition-transform">
              <CardHeader>
                <Icon name="Gamepad2" size={40} className="text-blue-400 mb-4" />
                <CardTitle className="text-blue-400">3D Графика</CardTitle>
                <CardDescription className="text-gray-300">
                  Реалистичная 3D графика с детализированными текстурами
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black/30">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
            3D Adventure Game
          </h3>
          <p className="text-gray-400 mb-6">
            Погрузитесь в мир безумных приключений и эпических сражений
          </p>
          <Button className="bg-gradient-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700">
            <Icon name="Download" className="mr-2" />
            Скачать игру
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Index;