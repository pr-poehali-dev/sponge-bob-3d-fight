import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Box, Plane, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface GameState {
  position: [number, number, number];
  health: number;
  inBattle: boolean;
  currentRoom: 'street' | 'house' | 'room';
}

const Player = ({ gameState, setGameState }: { 
  gameState: GameState, 
  setGameState: React.Dispatch<React.SetStateAction<GameState>> 
}) => {
  const { camera } = useThree();
  const [keys, setKeys] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeys(prev => ({ ...prev, [event.code]: true }));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setKeys(prev => ({ ...prev, [event.code]: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    const speed = 0.1;
    const direction = new THREE.Vector3();
    
    if (keys['KeyW']) direction.z -= speed;
    if (keys['KeyS']) direction.z += speed;
    if (keys['KeyA']) direction.x -= speed;
    if (keys['KeyD']) direction.x += speed;

    if (direction.length() > 0) {
      camera.position.add(direction);
      setGameState(prev => ({
        ...prev,
        position: [camera.position.x, camera.position.y, camera.position.z]
      }));
    }
  });

  return null;
};

const Street = () => {
  return (
    <group>
      {/* Ground */}
      <Plane args={[50, 50]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Plane>
      
      {/* Street */}
      <Plane args={[4, 50]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.9, 0]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Plane>

      {/* Houses */}
      {Array.from({ length: 6 }, (_, i) => (
        <Box
          key={`house-${i}`}
          args={[6, 4, 8]}
          position={[i % 2 === 0 ? -8 : 8, 0, i * -8]}
        >
          <meshStandardMaterial color="#4a3728" />
        </Box>
      ))}

      {/* Street lamps */}
      {Array.from({ length: 10 }, (_, i) => (
        <group key={`lamp-${i}`} position={[2, 0, i * -5]}>
          <Box args={[0.2, 4, 0.2]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#333" />
          </Box>
          <Box args={[0.5, 0.3, 0.5]} position={[0, 2, 0]}>
            <meshStandardMaterial color="#ffeb3b" />
          </Box>
          <pointLight position={[0, 2, 0]} intensity={0.5} color="#ffeb3b" />
        </group>
      ))}

      {/* Atmospheric fog */}
      <fog attach="fog" args={['#4a148c', 10, 50]} />
    </group>
  );
};

const House = ({ onEnterRoom }: { onEnterRoom: () => void }) => {
  return (
    <group>
      {/* House walls */}
      <Box args={[10, 5, 10]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#3e2723" />
      </Box>
      
      {/* Door */}
      <Box args={[1.5, 3, 0.2]} position={[0, -1, 5]}>
        <meshStandardMaterial color="#2e1a0a" />
      </Box>
      
      {/* Door trigger */}
      <Box 
        args={[2, 1, 2]} 
        position={[0, -2, 6]}
        onClick={onEnterRoom}
      >
        <meshStandardMaterial color="#ff9800" transparent opacity={0.3} />
      </Box>
      
      <Text
        position={[0, 1, 6]}
        fontSize={0.5}
        color="#ff9800"
        anchorX="center"
        anchorY="middle"
      >
        Войти в дом
      </Text>
    </group>
  );
};

const Room = ({ onStartBattle }: { onStartBattle: () => void }) => {
  return (
    <group>
      {/* Room walls */}
      <Box args={[8, 4, 8]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a0e0a" />
      </Box>
      
      {/* Floor */}
      <Plane args={[7.5, 7.5]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <meshStandardMaterial color="#2d1810" />
      </Plane>
      
      {/* SpongeBob */}
      <Box args={[1, 2, 1]} position={[0, -1, -2]} onClick={onStartBattle}>
        <meshStandardMaterial color="#ffeb3b" />
      </Box>
      
      <Text
        position={[0, 1, -2]}
        fontSize={0.4}
        color="#ffeb3b"
        anchorX="center"
        anchorY="middle"
      >
        Губка Боб
      </Text>
      
      <Text
        position={[0, 2, 0]}
        fontSize={0.3}
        color="#ff5722"
        anchorX="center"
        anchorY="middle"
      >
        "Иди сюда! Сейчас будем тебе резать жору!"
      </Text>
    </group>
  );
};

const BattleScene = ({ gameState, setGameState }: {
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
}) => {
  const [enemyHealth, setEnemyHealth] = useState(100);
  
  const handleAttack = () => {
    setEnemyHealth(prev => Math.max(0, prev - 25));
    if (enemyHealth <= 25) {
      setGameState(prev => ({ ...prev, inBattle: false }));
    }
  };

  return (
    <group>
      {/* Battle arena */}
      <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <meshStandardMaterial color="#4a148c" />
      </Plane>
      
      {/* Enemy */}
      <Box args={[1.5, 2.5, 1.5]} position={[0, -0.5, -3]}>
        <meshStandardMaterial color="#ffeb3b" />
      </Box>
      
      {/* Player weapon indicator */}
      <Box args={[0.3, 0.3, 1]} position={[1, -1, 1]}>
        <meshStandardMaterial color="#9c27b0" />
      </Box>
      
      {/* Health bars */}
      <Text
        position={[-3, 2, 0]}
        fontSize={0.3}
        color="#4caf50"
        anchorX="left"
        anchorY="middle"
      >
        Ваше здоровье: {gameState.health}
      </Text>
      
      <Text
        position={[-3, 1.5, 0]}
        fontSize={0.3}
        color="#f44336"
        anchorX="left"
        anchorY="middle"
      >
        Здоровье врага: {enemyHealth}
      </Text>
      
      <Text
        position={[0, -3, 0]}
        fontSize={0.2}
        color="#fff"
        anchorX="center"
        anchorY="middle"
      >
        Нажмите на врага для атаки
      </Text>
      
      <Box 
        args={[1.5, 2.5, 1.5]} 
        position={[0, -0.5, -3]}
        onClick={handleAttack}
      >
        <meshStandardMaterial color="#ffeb3b" transparent opacity={0.1} />
      </Box>
    </group>
  );
};

const Game3D = () => {
  const [gameState, setGameState] = useState<GameState>({
    position: [0, 0, 5],
    health: 100,
    inBattle: false,
    currentRoom: 'street'
  });

  const enterHouse = () => {
    setGameState(prev => ({ ...prev, currentRoom: 'house' }));
  };

  const enterRoom = () => {
    setGameState(prev => ({ ...prev, currentRoom: 'room' }));
  };

  const startBattle = () => {
    setGameState(prev => ({ ...prev, inBattle: true }));
  };

  return (
    <div className="w-full h-screen bg-black">
      <Canvas
        camera={{ position: gameState.position, fov: 75 }}
        style={{ height: '100vh' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[0, 10, 5]} intensity={0.8} />
        
        <Player gameState={gameState} setGameState={setGameState} />
        
        {gameState.inBattle ? (
          <BattleScene gameState={gameState} setGameState={setGameState} />
        ) : (
          <>
            {gameState.currentRoom === 'street' && (
              <>
                <Street />
                <House onEnterRoom={enterHouse} />
              </>
            )}
            
            {gameState.currentRoom === 'house' && (
              <House onEnterRoom={enterRoom} />
            )}
            
            {gameState.currentRoom === 'room' && (
              <Room onStartBattle={startBattle} />
            )}
          </>
        )}
        
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute top-4 left-4 text-white z-10">
        <div className="bg-black/50 p-4 rounded-lg backdrop-blur-sm">
          <p className="text-sm">Здоровье: {gameState.health}/100</p>
          <p className="text-sm">Локация: {gameState.currentRoom}</p>
          <p className="text-xs mt-2 text-gray-300">
            WASD - движение | Мышь - осмотр
          </p>
        </div>
      </div>
    </div>
  );
};

export default Game3D;