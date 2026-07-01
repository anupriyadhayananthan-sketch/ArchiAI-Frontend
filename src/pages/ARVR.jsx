import { Canvas } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

function Movement() {
  const keys = useRef({});

  useEffect(() => {
    const down = (e) => {
      keys.current[e.key.toLowerCase()] = true;
    };

    const up = (e) => {
      keys.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useFrame(({ camera }) => {
    const speed = 0.1;

    if (keys.current.w) camera.translateZ(-speed);
    if (keys.current.s) camera.translateZ(speed);
    if (keys.current.a) camera.translateX(-speed);
    if (keys.current.d) camera.translateX(speed);

    camera.position.y = 1.7;
  });

  return <PointerLockControls />;
}

// FIX: import useFrame separately
import { useFrame } from "@react-three/fiber";

function Scene({ houseData }) {
  return (
    <group>
      {/* FLOOR */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#ddd" />
      </mesh>

      {/* ROOMS FROM PLANNER */}
      {houseData?.rooms?.map((room) => {
        return (
          <mesh
            key={room.id}
            position={[room.x / 2, 0.5, room.z / 2]}
          >
            <boxGeometry
              args={[room.w / 2, 1, room.h / 2]}
            />
            <meshStandardMaterial
              color={
                room.type === "bedroom"
                  ? "#60a5fa"
                  : room.type === "kitchen"
                  ? "#f97316"
                  : room.type === "bathroom"
                  ? "#34d399"
                  : room.type === "living"
                  ? "#a78bfa"
                  : "#94a3b8"
              }
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function ARVR() {
  const [houseData, setHouseData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("houseData");
    if (data) {
      setHouseData(JSON.parse(data));
    }
  }, []);

  return (
    <div className="w-full h-screen bg-black relative">
      <Canvas camera={{ position: [0, 2, 8], fov: 75 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 5]} intensity={2} />

        <Scene houseData={houseData} />
        <Movement />
      </Canvas>

      {/* UI HELP TEXT */}
      <div className="absolute top-5 left-5 bg-black/70 text-white p-4 rounded-xl text-sm">
        <h2 className="font-bold">🏠 ARVR Mode</h2>
        <p>Click screen to lock pointer</p>
        <p>W A S D → Move</p>
        <p>Mouse → Look around</p>
      </div>
    </div>
  );
}