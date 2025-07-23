import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import Game3D from '@/components/Game3D';

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  if (gameStarted) {
    return <Game3D />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: 'url(/img/a2468cda-1aad-4e3c-94e8-04c1a3c1610b.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        
        <div className="relative z-10 text-center text-white max-w-5xl px-6">
          <h1 className="text-8xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent animate-fade-in">
            3D ADVENTURE
          </h1>
          <h2 className="text-3xl mb-6 text-gray-200 animate-fade-in">
            Игра от первого лица
          </h2>
          
          <div className="mb-8 p-6 bg-black/40 rounded-lg backdrop-blur-sm animate-scale-in max-w-2xl mx-auto">
            <p className="text-xl italic text-orange-300 mb-2">
              "Если ехать на трамвае, то нет туалета..."
            </p>
            <p className="text-sm text-gray-400">— Загадочный чувак предупреждает</p>
          </div>

          {showInstructions && (
            <div className="mb-8 p-6 bg-purple-900/30 rounded-lg backdrop-blur-sm animate-scale-in max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-purple-300">🎮 Управление</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-lg mb-2"><kbd className="bg-gray-700 px-2 py-1 rounded">W A S D</kbd> - Движение</p>
                  <p className="text-lg mb-2"><kbd className="bg-gray-700 px-2 py-1 rounded">Мышь</kbd> - Осмотр</p>
                </div>
                <div>
                  <p className="text-lg mb-2"><kbd className="bg-gray-700 px-2 py-1 rounded">Клик</kbd> - Взаимодействие</p>
                  <p className="text-lg mb-2"><kbd className="bg-gray-700 px-2 py-1 rounded">ЛКМ</kbd> - Атака в бою</p>
                </div>
              </div>
              <Button
                onClick={() => setShowInstructions(false)}
                variant="outline"
                className="mt-4 border-purple-500 text-purple-300"
              >
                Понятно
              </Button>
            </div>
          )}
          
          <div className="flex gap-6 justify-center">
            <Button 
              onClick={() => setGameStarted(true)}
              className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-2xl px-12 py-6 h-auto"
            >
              <Icon name="Play" className="mr-3" size={28} />
              НАЧАТЬ ИГРУ
            </Button>
            <Button 
              onClick={() => setShowInstructions(true)}
              variant="outline" 
              className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white text-2xl px-12 py-6 h-auto"
            >
              <Icon name="Info" className="mr-3" size={28} />
              Управление
            </Button>
          </div>
        </div>
      </section>

      {/* Game Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-6xl font-bold text-center mb-20 text-white">
            Особенности 3D игры
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <Card className="bg-gradient-to-br from-purple-900/40 to-purple-900/10 border-purple-500/30 hover:scale-105 transition-all duration-300">
              <CardHeader className="text-center">
                <div 
                  className="h-48 bg-cover bg-center rounded-lg mb-4"
                  style={{ backgroundImage: 'url(/img/a2468cda-1aad-4e3c-94e8-04c1a3c1610b.jpg)' }}
                />
                <Icon name="Navigation" size={50} className="text-purple-400 mb-4 mx-auto" />
                <CardTitle className="text-purple-400 text-xl">3D Улица</CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  Исследуйте реалистичную 3D улицу от первого лица
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/40 to-orange-900/10 border-orange-500/30 hover:scale-105 transition-all duration-300">
              <CardHeader className="text-center">
                <div 
                  className="h-48 bg-cover bg-center rounded-lg mb-4"
                  style={{ backgroundImage: 'url(/img/6113bebd-146b-499c-8597-caafbbc198c1.jpg)' }}
                />
                <Icon name="Home" size={50} className="text-orange-400 mb-4 mx-auto" />
                <CardTitle className="text-orange-400 text-xl">Старый дом</CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  Заходите в комнаты и встречайте опасных персонажей
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/40 to-blue-900/10 border-blue-500/30 hover:scale-105 transition-all duration-300">
              <CardHeader className="text-center">
                <div 
                  className="h-48 bg-cover bg-center rounded-lg mb-4"
                  style={{ backgroundImage: 'url(/img/84e7f342-6873-42ef-bcd5-0180472e6004.jpg)' }}
                />
                <Icon name="Zap" size={50} className="text-blue-400 mb-4 mx-auto" />
                <CardTitle className="text-blue-400 text-xl">Перчатка бесконечности</CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  Сражайтесь с врагами используя мощное оружие
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Characters Preview */}
      <section className="py-20 px-6 bg-gradient-to-br from-black/50 to-purple-900/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-6xl font-bold text-center mb-20 text-white">
            Персонажи
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-orange-500/40 hover:scale-105 transition-all duration-300">
              <CardHeader className="text-center">
                <div 
                  className="h-64 bg-cover bg-center rounded-lg mb-6"
                  style={{ backgroundImage: 'url(/img/46867808-37d5-4781-b68e-adab46e8c494.jpg)' }}
                />
                <CardTitle className="text-orange-400 text-3xl">Губка Боб</CardTitle>
                <CardDescription className="text-gray-300 text-xl">
                  Главный антагонист с темными намерениями
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge variant="destructive" className="text-lg px-4 py-2 mb-4">Враг</Badge>
                <p className="text-xl text-yellow-300 italic">
                  "Иди сюда! Сейчас будем тебе резать жору!"
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/40 hover:scale-105 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="h-64 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg mb-6 flex items-center justify-center">
                  <Icon name="User" size={120} className="text-white" />
                </div>
                <CardTitle className="text-purple-400 text-3xl">Игрок</CardTitle>
                <CardDescription className="text-gray-300 text-xl">
                  Герой с перчаткой бесконечности
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge className="bg-purple-600 text-lg px-4 py-2 mb-4">Протагонист</Badge>
                <p className="text-xl text-purple-300 italic">
                  Готов к любым испытаниям и сражениям
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="py-16 px-6 bg-black/40">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
            3D Adventure Game
          </h3>
          <p className="text-gray-300 mb-8 text-xl">
            Полноценная 3D игра от первого лица в браузере
          </p>
          <Button 
            onClick={() => setGameStarted(true)}
            className="bg-gradient-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700 text-xl px-8 py-4 h-auto"
          >
            <Icon name="Gamepad2" className="mr-3" />
            Играть сейчас
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Index;