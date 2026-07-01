
import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { Link } from "react-router-dom";
 
import { 
  Compass, 
  Layers, 
  Sun, 
  Moon, 
  Tv, 
  Home, 
  ChevronRight, 
  Sparkles,
  Info,
  Maximize2,
  Box,
  EyeOff,
  Sliders,
  Play
} from "lucide-react";
 
// ================= PROCEDURAL 3D ASSETS =================
 
/* 🛏️ BEDROOM ASSET */
function Bed3D({ wireframe }) {
  const matProps = wireframe 
    ? { color: "#06b6d4", wireframe: true, transparent: true, opacity: 0.8 } 
    : { roughness: 0.8 };
    
  return (
    
    <group scale={0.7} position={[0, -0.1, 0]}>
      {/* Wooden Frame */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[1.9, 0.25, 1.6]} />
        <meshStandardMaterial {...matProps} color={wireframe ? "#06b6d4" : "#5c4033"} />
      </mesh>
      {/* Headboard */}
      <mesh position={[-0.9, 0.6, 0]}>
        <boxGeometry args={[0.1, 1.0, 1.6]} />
        <meshStandardMaterial {...matProps} color={wireframe ? "#06b6d4" : "#4a3229"} />
      </mesh>
      {/* Mattress */}
      <mesh position={[0.05, 0.28, 0]}>
        <boxGeometry args={[1.7, 0.25, 1.5]} />
        <meshStandardMaterial {...matProps} color={wireframe ? "#06b6d4" : "#f8fafc"} />
      </mesh>
      {/* Pillows */}
      <mesh position={[-0.6, 0.44, 0.35]}>
        <boxGeometry args={[0.3, 0.08, 0.5]} />
        <meshStandardMaterial {...matProps} color={wireframe ? "#06b6d4" : "#e2e8f0"} />
      </mesh>
      <mesh position={[-0.6, 0.44, -0.35]}>
        <boxGeometry args={[0.3, 0.08, 0.5]} />
        <meshStandardMaterial {...matProps} color={wireframe ? "#06b6d4" : "#e2e8f0"} />
      </mesh>
      {/* Blanket fold */}
      <mesh position={[0.45, 0.43, 0]}>
        <boxGeometry args={[0.8, 0.03, 1.51]} />
        <meshStandardMaterial {...matProps} color={wireframe ? "#06b6d4" : "#3b82f6"} />
      </mesh>
    </group>
  );
  
}
 
/* 🛋️ LIVING SOFA & TABLE ASSET */
function Sofa3D({ wireframe }) {
  const matProps = wireframe 
    ? { color: "#06b6d4", wireframe: true, transparent: true, opacity: 0.8 } 
    : { roughness: 0.7 };
    
  return (
    <group scale={0.7} position={[0, -0.15, 0]}>
      {/* Couch Cushion */}
      <mesh position={[0, 0.2, -0.2]}>
        <boxGeometry args={[2.0, 0.3, 0.8]} />
        <meshStandardMaterial {...matProps} color={wireframe ? "#06b6d4" : "#1e293b"} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.55, -0.5]}>
        <boxGeometry args={[2.0, 0.6, 0.2]} />
        <meshStandardMaterial {...matProps} color={wireframe ? "#06b6d4" : "#334155"} />
      </mesh>
      {/* Armrests */}
      <mesh position={[-0.95, 0.35, -0.2]}>
        <boxGeometry args={[0.15, 0.45, 0.8]} />
        <meshStandardMaterial {...matProps} color={wireframe ? "#06b6d4" : "#334155"} />
      </mesh>
      <mesh position={[0.95, 0.35, -0.2]}>
        <boxGeometry args={[0.15, 0.45, 0.8]} />
        <meshStandardMaterial {...matProps} color={wireframe ? "#06b6d4" : "#334155"} />
      </mesh>
      
      {/* Coffee Table */}
      <mesh position={[0, 0.1, 0.6]}>
        <boxGeometry args={[1.0, 0.05, 0.5]} />
        <meshStandardMaterial {...matProps} color={wireframe ? "#06b6d4" : "#d97706"} />
      </mesh>
      {/* Metal table legs */}
      {!wireframe && (
        <>
          <mesh position={[-0.45, 0.05, 0.4]}>
            <cylinderGeometry args={[0.02, 0.02, 0.1]} />
            <meshStandardMaterial color="#475569" />
          </mesh>
          <mesh position={[0.45, 0.05, 0.4]}>
            <cylinderGeometry args={[0.02, 0.02, 0.1]} />
            <meshStandardMaterial color="#475569" />
          </mesh>
          <mesh position={[-0.45, 0.05, 0.8]}>
            <cylinderGeometry args={[0.02, 0.02, 0.1]} />
            <meshStandardMaterial color="#475569" />
          </mesh>
          <mesh position={[0.45, 0.05, 0.8]}>
            <cylinderGeometry args={[0.02, 0.02, 0.1]} />
            <meshStandardMaterial color="#475569" />
          </mesh>
        </>
      )}
    </group>
  );
}
 
/* 🍳 KITCHEN CABINET & FRIDGE ASSET */
function Kitchen3D({ wireframe }) {
  const matProps = wireframe 
    ? { color: "#06b6d4", wireframe: true, transparent: true, opacity: 0.8 } 
    : { roughness: 0.5 };
    
  return (
    <group scale={0.7} position={[0, -0.2, 0]}>
      {/* Cabinets */}
      <mesh position={[0, 0.4, -0.4]}>
        <boxGeometry args={[2.0, 0.8, 0.6]} />
        <meshStandardMaterial {...matProps} color={wireframe ? "#06b6d4" : "#334155"} />
      </mesh>
      {/* Marble Countertop */}
      <mesh position={[0, 0.82, -0.4]}>
        <boxGeometry args={[2.02, 0.04, 0.62]} />
        <meshStandardMaterial {...matProps} color={wireframe ? "#06b6d4" : "#e2e8f0"} />
      </mesh>
      {/* Tall Refrigerator */}
      <mesh position={[0.7, 0.8, 0.1]}>
        <boxGeometry args={[0.55, 1.6, 0.55]} />
        <meshStandardMaterial {...matProps} color={wireframe ? "#06b6d4" : "#94a3b8"} metalness={0.7} />
      </mesh>
    </group>
  );
}
 
/* 🛁 BATHROOM TUB & TOILET ASSET */
function Bathroom3D({ wireframe }) {
  const matProps = wireframe 
    ? { color: "#06b6d4", wireframe: true, transparent: true, opacity: 0.8 } 
    : { roughness: 0.3 };
    
  return (
    <group scale={0.65} position={[0, -0.2, 0]}>
      {/* Bathtub */}
      <mesh position={[0.4, 0.25, -0.2]}>
        <boxGeometry args={[1.5, 0.5, 0.7]} />
        <meshStandardMaterial {...matProps} color={wireframe ? "#06b6d4" : "#f1f5f9"} />
      </mesh>
      {/* Water Plane */}
      {!wireframe && (
        <mesh position={[0.4, 0.45, -0.2]}>
          <boxGeometry args={[1.4, 0.02, 0.6]} />
          <meshStandardMaterial color="#06b6d4" opacity={0.6} transparent />
        </mesh>
      )}
      
      {/* Toilet Base */}
      <mesh position={[-0.6, 0.2, 0.3]}>
        <boxGeometry args={[0.45, 0.4, 0.55]} />
        <meshStandardMaterial {...matProps} color={wireframe ? "#06b6d4" : "#f8fafc"} />
      </mesh>
      {/* Tank */}
      <mesh position={[-0.6, 0.55, 0.5]}>
        <boxGeometry args={[0.45, 0.35, 0.22]} />
        <meshStandardMaterial {...matProps} color={wireframe ? "#06b6d4" : "#f8fafc"} />
      </mesh>
    </group>
  );
}
 
/* 🚗 CAR VEHICLE ASSET */
function Car3D({ wireframe }) {
  const matProps = wireframe 
    ? { color: "#06b6d4", wireframe: true, transparent: true, opacity: 0.8 } 
    : { roughness: 0.2 };
    
  return (
    <group scale={0.8} position={[0, 0, 0]}>
      {/* Main Body Chassis */}
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[3.2, 0.45, 1.4]} />
        <meshStandardMaterial {...matProps} color={wireframe ? "#06b6d4" : "#0284c7"} metalness={0.6} />
      </mesh>
      {/* Cabin Roof */}
      <mesh position={[-0.2, 0.6, 0]}>
        <boxGeometry args={[1.8, 0.35, 1.25]} />
        <meshStandardMaterial {...matProps} color={wireframe ? "#06b6d4" : "#1e293b"} opacity={wireframe ? 1 : 0.8} transparent={!wireframe} />
      </mesh>
      {/* Cylindrical Wheels */}
      {!wireframe && (
        <>
          <mesh position={[0.9, 0.12, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.16, 16]} />
            <meshStandardMaterial color="#0f172a" roughness={0.9} />
          </mesh>
          <mesh position={[-0.9, 0.12, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.16, 16]} />
            <meshStandardMaterial color="#0f172a" roughness={0.9} />
          </mesh>
          <mesh position={[0.9, 0.12, -0.7]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.16, 16]} />
            <meshStandardMaterial color="#0f172a" roughness={0.9} />
          </mesh>
          <mesh position={[-0.9, 0.12, -0.7]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.16, 16]} />
            <meshStandardMaterial color="#0f172a" roughness={0.9} />
          </mesh>
        </>
      )}
    </group>
  );
}
 
/* ⛩️ POOJA MANDIR ALPHAS */
function Pooja3D({ wireframe }) {
  const matProps = wireframe 
    ? { color: "#06b6d4", wireframe: true, transparent: true, opacity: 0.8 } 
    : { roughness: 0.6 };
    
  return (
    <group scale={0.65} position={[0, -0.2, 0]}>
      {/* Altar Pedestal */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.2, 0.4, 1.2]} />
        <meshStandardMaterial {...matProps} color={wireframe ? "#06b6d4" : "#d97706"} />
      </mesh>
      {/* Mini Pillars */}
      <mesh position={[-0.5, 0.7, -0.5]}>
        <cylinderGeometry args={[0.03, 0.03, 0.6]} />
        <meshStandardMaterial color={wireframe ? "#06b6d4" : "#d97706"} />
      </mesh>
      <mesh position={[0.5, 0.7, -0.5]}>
        <cylinderGeometry args={[0.03, 0.03, 0.6]} />
        <meshStandardMaterial color={wireframe ? "#06b6d4" : "#d97706"} />
      </mesh>
      <mesh position={[-0.5, 0.7, 0.5]}>
        <cylinderGeometry args={[0.03, 0.03, 0.6]} />
        <meshStandardMaterial color={wireframe ? "#06b6d4" : "#d97706"} />
      </mesh>
      <mesh position={[0.5, 0.7, 0.5]}>
        <cylinderGeometry args={[0.03, 0.03, 0.6]} />
        <meshStandardMaterial color={wireframe ? "#06b6d4" : "#d97706"} />
      </mesh>
      {/* Golden Dome */}
      <mesh position={[0, 1.1, 0]}>
        <coneGeometry args={[0.7, 0.4, 4]} />
        <meshStandardMaterial {...matProps} color={wireframe ? "#06b6d4" : "#fbbf24"} metalness={0.5} />
      </mesh>
      {!wireframe && (
        <pointLight position={[0, 0.5, 0]} intensity={1.5} color="#f59e0b" distance={4} />
      )}
    </group>
  );
}
 
/* 📚 STUDY DESK & LAPTOP ASSET */
function Study3D({ wireframe }) {
  const matProps = wireframe 
    ? { color: "#06b6d4", wireframe: true, transparent: true, opacity: 0.8 } 
    : { roughness: 0.6 };
    
  return (
    <group scale={0.7} position={[0, -0.2, 0]}>
      {/* Desk Top Table */}
      <mesh position={[0, 0.7, -0.2]}>
        <boxGeometry args={[1.5, 0.04, 0.7]} />
        <meshStandardMaterial {...matProps} color={wireframe ? "#06b6d4" : "#78350f"} />
      </mesh>
      {/* Metal Legs */}
      <mesh position={[-0.7, 0.35, -0.5]}>
        <cylinderGeometry args={[0.02, 0.02, 0.7]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      <mesh position={[0.7, 0.35, -0.5]}>
        <cylinderGeometry args={[0.02, 0.02, 0.7]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      <mesh position={[-0.7, 0.35, 0.1]}>
        <cylinderGeometry args={[0.02, 0.02, 0.7]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      <mesh position={[0.7, 0.35, 0.1]}>
        <cylinderGeometry args={[0.02, 0.02, 0.7]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      {/* Laptop Base */}
      <mesh position={[0, 0.72, -0.15]}>
        <boxGeometry args={[0.3, 0.01, 0.22]} />
        <meshStandardMaterial color={wireframe ? "#06b6d4" : "#94a3b8"} metalness={0.7} />
      </mesh>
      {/* Laptop Screen */}
      <mesh position={[0, 0.82, -0.26]} rotation={[Math.PI / 6, 0, 0]}>
        <boxGeometry args={[0.3, 0.2, 0.01]} />
        <meshStandardMaterial color={wireframe ? "#06b6d4" : "#cbd5e1"} metalness={0.7} />
      </mesh>
    </group>
  );
}
 
/* 🪜 STEP STAIRCASE STACK */
function Stairs3D({ wireframe }) {
  const steps = 9;
  const stepHeight = 0.32;
  const stepWidth = 1.3;
  const stepDepth = 0.27;
  const matProps = wireframe 
    ? { color: "#06b6d4", wireframe: true, transparent: true, opacity: 0.8 } 
    : { roughness: 0.7 };
    
  return (
    <group scale={0.7} position={[0, -0.5, 0]}>
      {Array.from({ length: steps }).map((_, idx) => {
        const yPos = idx * stepHeight + stepHeight / 2;
        const zPos = -1.1 + idx * stepDepth;
        return (
          <mesh key={idx} position={[0, yPos, zPos]}>
            <boxGeometry args={[stepWidth, stepHeight, stepDepth]} />
            <meshStandardMaterial {...matProps} color={wireframe ? "#06b6d4" : "#7c2d12"} />
          </mesh>
        );
      })}
    </group>
  );
}
 
/* 🪵 SAFETY BALCONY RAILING */
function Railing3D({ width, depth, wireframe }) {
  const matProps = wireframe 
    ? { color: "#06b6d4", wireframe: true, transparent: true, opacity: 0.8 } 
    : { color: "#64748b" };
  const h = 0.95; // height
  const t = 0.04; // thickness
  return (
    <group position={[0, -0.15, 0]}>
      {/* Front Railing */}
      <mesh position={[0, h/2, depth/2 - t]}>
        <boxGeometry args={[width, h, t]} />
        <meshStandardMaterial {...matProps} opacity={wireframe ? 1 : 0.3} transparent={!wireframe} />
      </mesh>
      {/* Left Railing */}
      <mesh position={[-width/2 + t, h/2, 0]}>
        <boxGeometry args={[t, h, depth]} />
        <meshStandardMaterial {...matProps} opacity={wireframe ? 1 : 0.3} transparent={!wireframe} />
      </mesh>
      {/* Right Railing */}
      <mesh position={[width/2 - t, h/2, 0]}>
        <boxGeometry args={[t, h, depth]} />
        <meshStandardMaterial {...matProps} opacity={wireframe ? 1 : 0.3} transparent={!wireframe} />
      </mesh>
    </group>
  );
}
 
// Map room types to procedural objects
function renderRoomFurniture(type, roomWidth, roomDepth, wireframe) {
  switch (type) {
    case "living":
      return <Sofa3D wireframe={wireframe} />;
    case "bedroom":
      return <Bed3D wireframe={wireframe} />;
    case "kitchen":
      return <Kitchen3D wireframe={wireframe} />;
    case "bathroom":
      return <Bathroom3D wireframe={wireframe} />;
    case "parking":
      return <Car3D wireframe={wireframe} />;
    case "pooja":
      return <Pooja3D wireframe={wireframe} />;
    case "study":
      return <Study3D wireframe={wireframe} />;
    case "stairs":
      return <Stairs3D wireframe={wireframe} />;
    case "balcony":
      return <Railing3D width={roomWidth} depth={roomDepth} wireframe={wireframe} />;
    default:
      return null;
  }
}
 
// Individual 3D Room Renderer (composed of Floors, Walls, Furniture and point-lights)
function Room3D({ 
  room, 
  scaleFactor, 
  wallHeight, 
  wallOpacity, 
  viewMode, 
  isSelected, 
  onSelect,
  isDimmed,
  showFurniture
}) {
  const isWireframe = viewMode === "hologram";
  const explodedY = room.floorY; // Calculated dynamically in parent
  
  const roomW = room.w * scaleFactor;
  const roomD = room.h * scaleFactor;
  
  // Center calculations in centered grid units
  const roomX = (room.x + room.w / 2 - 6) * scaleFactor;
  const roomZ = (room.z + room.h / 2 - 6) * scaleFactor;
  
  // Custom Material Colors based on room type
  let floorColor = "#e2e8f0";
  if (isSelected) floorColor = "#22d3ee"; // Highlight selected room
  else if (isDimmed) floorColor = "#1e293b";
  else {
    switch (room.type) {
      case "living": floorColor = "#cbd5e1"; break;
      case "kitchen": floorColor = "#fed7aa"; break;
      case "bathroom": floorColor = "#f472b6"; break;
      case "bedroom": floorColor = "#c7d2fe"; break;
      case "parking": floorColor = "#475569"; break;
      case "pooja": floorColor = "#fef08a"; break;
      case "study": floorColor = "#bae6fd"; break;
      case "balcony": floorColor = "#a7f3d0"; break;
      case "stairs": floorColor = "#ddd6fe"; break;
    }
  }
 
  const floorMatProps = isWireframe
    ? { color: isSelected ? "#22d3ee" : "#0891b2", wireframe: true }
    : { roughness: 0.8, color: floorColor };
 
  const wallMatProps = isWireframe
    ? { color: isSelected ? "#22d3ee" : "#0891b2", wireframe: true }
    : { 
        color: isSelected ? "#22d3ee" : "#cbd5e1", 
        transparent: true, 
        opacity: isSelected ? 0.8 : wallOpacity,
        roughness: 0.9 
      };
 
  return (
    <group 
      position={[roomX, explodedY, roomZ]} 
      onClick={(e) => {
        e.stopPropagation();
        onSelect(room.id);
      }}
    >
      {/* 🟢 FLOOR SLAB */}
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[roomW, 0.05, roomD]} />
        <meshStandardMaterial {...floorMatProps} />
      </mesh>
 
      {/* 🟢 WALLS (Only render if not balcony or parking) */}
      {room.type !== "balcony" && room.type !== "parking" && (
        <>
          {/* North Wall */}
          <mesh position={[0, wallHeight / 2, -roomD / 2 + 0.05]}>
            <boxGeometry args={[roomW, wallHeight, 0.1]} />
            <meshStandardMaterial {...wallMatProps} />
          </mesh>
          {/* South Wall */}
          <mesh position={[0, wallHeight / 2, roomD / 2 - 0.05]}>
            <boxGeometry args={[roomW, wallHeight, 0.1]} />
            <meshStandardMaterial {...wallMatProps} />
          </mesh>
          {/* West Wall */}
          <mesh position={[-roomW / 2 + 0.05, wallHeight / 2, 0]}>
            <boxGeometry args={[0.1, wallHeight, roomD]} />
            <meshStandardMaterial {...wallMatProps} />
          </mesh>
          {/* East Wall */}
          <mesh position={[roomW / 2 - 0.05, wallHeight / 2, 0]}>
            <boxGeometry args={[0.1, wallHeight, roomD]} />
            <meshStandardMaterial {...wallMatProps} />
          </mesh>
        </>
      )}
 
      {/* 🟢 FURNITURE */}
      {showFurniture && !isDimmed && (
        <group position={[0, 0.05, 0]}>
          {renderRoomFurniture(room.type, roomW, roomD, isWireframe)}
        </group>
      )}
 
      {/* 🟢 FLOATING HTML LABEL */}
      {!isDimmed && (
        <Html position={[0, wallHeight + 0.3, 0]} center distanceFactor={10}>
          <div 
            style={{
              background: isSelected ? "rgba(6, 182, 212, 0.95)" : "rgba(15, 23, 42, 0.8)",
              color: isSelected ? "#000" : "#22d3ee",
              padding: "3px 8px",
              borderRadius: "5px",
              fontSize: "10px",
              fontWeight: "800",
              border: isSelected ? "1px solid #fff" : "1px solid rgba(34, 211, 238, 0.3)",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
              transition: "all 0.2s ease"
            }}
          >
            {room.name}
          </div>
        </Html>
      )}
    </group>
  );
}
 
export default function ThreeDView() {
  
 
  const saveProject = async () => {
  try {
    const stored = localStorage.getItem("houseData");
 
    const project = {
      name: data.houseType || "My 3D House",
      type: data.houseType,
      area: data.totalArea,
      floors: data.floorsCount,
      rooms: data.rooms,   // 🔥 IMPORTANT (REAL DATA)
      timestamp: new Date()
    };
 
    const res = await fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(project)
    });
 
    const result = await res.json();
 
    if (res.ok) {
      alert("Project Saved Successfully!");
      console.log(result);
    } else {
      alert("Save Failed");
    }
 
  } catch (err) {
    console.error(err);
    alert("Backend not connected");
  }
  const [costPerSqft, setCostPerSqft] = useState(1500); // default value
  
 
  const totalArea = data.rooms.reduce((sum, room) => sum + room.area, 0);
  const totalCost = totalArea * costPerSqft;
};
  // 🟢 READ DATA SAFELY
  const stored = localStorage.getItem("houseData");
  
  const data = stored
    ? JSON.parse(stored)
    : {
     
    
        floorsCount: 2,
        houseType: "Villa",
        totalArea: 1500,
        scale: 1,
        rooms: [
          { id: "hall_0", name: "Living Hall", type: "living", area: 300, floor: 0, x: 0, z: 0, w: 8, h: 6 },
          { id: "kitchen_0", name: "Kitchen", type: "kitchen", area: 150, floor: 0, x: 8, z: 0, w: 4, h: 4 },
          { id: "bath_0", name: "Bathroom 1", type: "bathroom", area: 80, floor: 0, x: 8, z: 4, w: 4, h: 2 },
          { id: "bed_1", name: "Bedroom 1", type: "bedroom", area: 240, floor: 1, x: 0, z: 0, w: 6, h: 6 },
          { id: "bed_2", name: "Bedroom 2", type: "bedroom", area: 200, floor: 1, x: 6, z: 0, w: 6, h: 6 },
          { id: "bath_1", name: "Bathroom 2", type: "bathroom", area: 80, floor: 1, x: 0, z: 6, w: 4, h: 3 },
          { id: "stairs_0", name: "Staircase", type: "stairs", area: 80, floor: 0, x: 4, z: 9, w: 4, h: 3 },
          { id: "stairs_1", name: "Staircase", type: "stairs", area: 80, floor: 1, x: 4, z: 9, w: 4, h: 3 }
        ]
      };
      console.log("3D DATA:", data);
console.log("FLOORS:", data.floorsCount);
console.log("ROOM FLOORS:", data.rooms.map(r => r.floor));
 
  // State Variables
  const [explodeValue, setExplodeValue] = useState(0);
  const [wallHeight, setWallHeight] = useState(2.2);
  const [wallOpacity, setWallOpacity] = useState(0.4);
  const [viewMode, setViewMode] = useState("realistic"); // realistic, hologram, dollhouse
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [focusFloor, setFocusFloor] = useState("all"); // all, 0, 1, 2
  const [timeOfDay, setTimeOfDay] = useState("day"); // day, night
  const [showFurniture, setShowFurniture] = useState(true);
 
  // Auto adjusting states based on view modes
  useEffect(() => {
    if (viewMode === "dollhouse") {
      setWallHeight(0.5);
      setWallOpacity(0.9);
    } else if (viewMode === "hologram") {
      setWallHeight(2.2);
      setWallOpacity(0.2);
    } else {
      setWallHeight(2.2);
      setWallOpacity(0.45);
    }
  }, [viewMode]);
 
  // Dimensions & scaling constants
  const baseScale = 1.5; // conversion multiplier
  const baseFloorHeight = 3.2; // vertical floor gap in meters
 
  // Process rooms adding vertical coordinates based on floor index & explode values
  const processedRooms = data.rooms.map((room) => {
    // Normal floor stacking + exploded spacing
    const floorY = room.floor * baseFloorHeight + room.floor * explodeValue;
    return {
      ...room,
      floorY
    };
  });
 
  const activeRoom = data.rooms.find(r => r.id === selectedRoomId);
 const effectiveFloorsCount =
  Math.max(...data.rooms.map(r => Number(r.floor) + 1));
 
  // 🟢 CAMERA FRAMING FIX: tall buildings (4+ floors) need the camera pulled
  // back and raised so the entire stack is visible by default, instead of
  // only being visible after manually rotating/panning. We compute this
  // once from the building's total height (independent of explodeValue so
  // the initial mount framing stays stable).
  const builtHeight = effectiveFloorsCount * baseFloorHeight;
  const camDistance = Math.max(14, builtHeight * 2.2);
  const camHeight = Math.max(10, builtHeight * 1.6);
  const orbitTargetY = builtHeight / 2;
  const orbitMaxDistance = Math.max(35, builtHeight * 5);
 
  return (
    <div className="threed-page">
      {/* 🟢 LEFT PANEL: PROJECT SUMMARY & ROOM SELECTION */}
      <div className="threed-panel">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-2 text-cyan-400">
          <Box size={20} />
          Project Blueprint
        </h2>
        <p className="text-gray-400 text-xs mb-4">Click rooms in list or 3D viewport to inspect structural contents.</p>
 
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs mb-5">
          <div className="flex justify-between">
            <span className="text-gray-400">Design Category:</span>
            <span className="font-bold text-white">{data.houseType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Gross Floor Area:</span>
            <span className="font-bold text-cyan-400">{data.totalArea} sq.ft</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Vertical Floors:</span>
            <span className="font-bold text-white">{data.floorsCount} ({data.floorsCount > 1 ? "Stacked" : "Single"})</span>
          </div>
        </div>
 
        <div className="panel-divider" />
 
        <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-1.5">
          <Layers size={14} className="text-cyan-500" />
          Floor Rooms Breakdown
        </h3>
        
        {/* Scrollable Room Selector Row */}
        <div className="flex-1 overflow-y-auto space-y-4">
         {Array.from({ length: Number(data.floorsCount) }).map((_, fIdx) => (
            <div key={fIdx} className="space-y-1.5">
              <h4 className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mt-2 pl-1">
                {fIdx === 0 ? "Ground Floor" : fIdx === 1 ? "First Floor" : "Second Floor"}
              </h4>
              {processedRooms
                .filter((r) => Number(r.floor) === fIdx)
                .map((room) => (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoomId(room.id === selectedRoomId ? null : room.id)}
                    className={`room-item-row ${selectedRoomId === room.id ? "selected" : ""}`}
                  >
                    <span className="text-xs text-white/90 truncate max-w-[170px]">{room.name}</span>
                    <span className="text-[10px] font-mono text-cyan-400">{room.area} SQFT</span>
                  </div>
                ))}
            </div>
          ))}
        </div>
 
        {/* Selected Room Metadata display */}
        {activeRoom && (
          <div className="mt-4 p-3.5 bg-cyan-950/20 border border-cyan-800/40 rounded-xl space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-cyan-400 uppercase tracking-wider text-[11px]">{activeRoom.name}</h4>
              <span className="px-2 py-0.5 bg-cyan-600 text-black text-[9px] font-black rounded uppercase">
                {activeRoom.type}
              </span>
            </div>
            <p className="text-slate-300 text-[11px]">
              Calculated size: <strong>{activeRoom.area} sqft</strong> (~{activeRoom.w}m x {activeRoom.h}m grid footprint). Fully simulated furniture details included.
            </p>
          </div>
        )}
      </div>
 
      {/* 3D RENDER STAGE CANVAS */}
      <div className="threed-container">
        {/* Floating Top Nav bar */}
        <div className="absolute top-6 left-6 z-10 flex gap-3">
          <Link 
            to="/planner" 
            className="flex items-center gap-2 px-4 py-2 bg-slate-900/90 hover:bg-slate-800 rounded-xl text-xs font-semibold text-slate-200 border border-slate-800 hover:text-white transition duration-200 text-decoration-none"
          >
            ← Back to 2D Blueprint
          </Link>
        </div>
 
        {/* Floating Instructions */}
        <div className="absolute bottom-6 left-6 z-10 bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2 text-[10px] text-gray-400 flex items-center gap-3">
          <span className="flex items-center gap-1.5"><Maximize2 size={12} className="text-cyan-400" /> Left click + Drag to rotate</span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
          <span>Right click + Drag to pan</span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
          <span>Scroll to zoom</span>
        </div>
 
        {/* Canvas viewport */}
        <Canvas camera={{ position: [camDistance, camHeight, camDistance], fov: 45 }}>
          {/* Light systems toggled dynamically */}
          {timeOfDay === "day" ? (
            <>
              <ambientLight intensity={0.65} />
              <directionalLight 
                position={[12, 18, 8]} 
                intensity={1.8} 
                castShadow 
                shadow-mapSize={[1024, 1024]}
              />
              <directionalLight position={[-10, 8, -10]} intensity={0.4} />
            </>
          ) : (
            <>
              <ambientLight intensity={0.15} />
              <directionalLight position={[10, 15, 10]} intensity={0.3} color="#93c5fd" />
              <directionalLight position={[-5, 5, -5]} intensity={0.1} color="#6366f1" />
            </>
          )}
 
          {/* Grid Reference Platform */}
          <gridHelper args={[30, 30, "#1e293b", "#0f172a"]} position={[0, -0.22, 0]} />
 
          {/* Stacked Floor Render Blocks */}
         {Array.from({ length: effectiveFloorsCount }).map((_, fIdx) => {
            const isFloorDimmed = focusFloor !== "all" && focusFloor !== fIdx;
            return (
              <group key={fIdx}>
                {processedRooms
                  .filter((r) => r.floor === fIdx)
                  .map((room) => (
                    <Room3D
                      key={room.id}
                      room={room}
                      scaleFactor={baseScale}
                      wallHeight={wallHeight}
                      wallOpacity={wallOpacity}
                      viewMode={viewMode}
                      isSelected={selectedRoomId === room.id}
                      onSelect={(id) => setSelectedRoomId(id)}
                      isDimmed={isFloorDimmed}
                      showFurniture={showFurniture}
                    />
                  ))}
              </group>
            );
          })}
 
          <OrbitControls 
            makeDefault 
            target={[0, orbitTargetY, 0]}
            minDistance={4} 
            maxDistance={orbitMaxDistance}
            maxPolarAngle={Math.PI / 2 - 0.05} // prevent going below grid
          />
        </Canvas>
      </div>
 
      {/* 🟢 RIGHT PANEL: VISUAL & CONTROL SETTINGS */}
      <div className="threed-right-panel">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-cyan-400">
          <Sliders size={20} />
          View Controls
        </h2>
 
        {/* View Mode selections */}
        <div className="mb-5">
          <label className="text-xs font-semibold text-gray-300 block mb-2">RENDER MODE</label>
          <div className="toggle-btn-group">
            <button 
              className={`toggle-btn mode-btn ${viewMode === "realistic" ? "active" : ""}`}
              onClick={() => setViewMode("realistic")}
            >
              <Sparkles size={13} />
              Realistic
            </button>
            <button 
              className={`toggle-btn mode-btn ${viewMode === "hologram" ? "active" : ""}`}
              onClick={() => setViewMode("hologram")}
            >
              <Compass size={13} />
              Hologram
            </button>
          </div>
          <button 
            className={`w-full toggle-btn mode-btn ${viewMode === "dollhouse" ? "active" : ""}`}
            onClick={() => setViewMode("dollhouse")}
          >
            <Home size={13} />
            Dollhouse View (Low Walls)
          </button>
          <div className="panel-divider" />
          <button
          
  onClick={saveProject}
  style={{
    width: "100%",
    padding: "10px",
    background: "#06b6d4",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px"
  }}
>
  Save Project
</button>
 
 
        </div>
 
        <div className="panel-divider" />
 
        {/* Exploded floor view slider */}
        {effectiveFloorsCount > 1 && (
          <div className="slider-group">
            <label>
              <span>Explode Floors</span>
              <span className="text-cyan-400 font-mono font-extrabold">{explodeValue.toFixed(1)}m</span>
            </label>
            <input
              type="range"
              min="0"
              max="6"
              step="0.1"
              value={explodeValue}
              onChange={(e) => setExplodeValue(parseFloat(e.target.value))}
            />
            <p className="text-[10px] text-slate-400 mt-1">Vertically separates floors to inspect internal structural layouts.</p>
          </div>
        )}
 
        {/* Wall height slider (disabled in dollhouse mode) */}
        <div className="slider-group">
          <label>
            <span>Wall Height Scale</span>
            <span className="text-cyan-400 font-mono font-extrabold">{wallHeight.toFixed(1)}m</span>
          </label>
          <input
            type="range"
            min="0.5"
            max="3.2"
            step="0.1"
            disabled={viewMode === "dollhouse"}
            value={wallHeight}
            onChange={(e) => setWallHeight(parseFloat(e.target.value))}
          />
        </div>
 
        {/* Wall Opacity slider (disabled in wireframe) */}
        <div className="slider-group">
          <label>
            <span>Wall Opacity</span>
            <span className="text-cyan-400 font-mono font-extrabold">{Math.round(wallOpacity * 100)}%</span>
          </label>
          <input
            type="range"
            min="0.0"
            max="1.0"
            step="0.05"
            disabled={viewMode === "hologram"}
            value={wallOpacity}
            onChange={(e) => setWallOpacity(parseFloat(e.target.value))}
          />
        </div>
 
        <div className="panel-divider" />
 
        {/* Floor focusing */}
        {data.floorsCount > 1 && (
          <div className="mb-5">
            <label className="text-xs font-semibold text-gray-300 block mb-2">FLOOR ISOLATION</label>
            <div className="flex gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800/80">
              <button
                className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                  focusFloor === "all" ? "bg-slate-850 text-cyan-400 border border-cyan-500/20" : "text-gray-400"
                }`}
                onClick={() => setFocusFloor("all")}
              >
                All
              </button>
              {Array.from({ length: data.floorsCount }).map((_, fIdx) => (
                <button
                  key={fIdx}
                  className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                    focusFloor === fIdx ? "bg-slate-850 text-cyan-400 border border-cyan-500/20" : "text-gray-400"
                  }`}
                  onClick={() => setFocusFloor(fIdx)}
                >
                  Floor {fIdx === 0 ? "G" : fIdx === 1 ? "1" : "2"}
                </button>
              ))}
            </div>
          </div>
        )}
 
        {/* Sun lighting toggles */}
        <div className="mb-5">
          <label className="text-xs font-semibold text-gray-300 block mb-2">SOLAR LIGHTING</label>
          <div className="toggle-btn-group">
            <button 
              className={`toggle-btn mode-btn ${timeOfDay === "day" ? "active" : ""}`}
              onClick={() => setTimeOfDay("day")}
            >
              <Sun size={13} />
              Daylight
            </button>
            <button 
              className={`toggle-btn mode-btn ${timeOfDay === "night" ? "active" : ""}`}
              onClick={() => setTimeOfDay("night")}
            >
              <Moon size={13} />
              Cozy Night
            </button>
          </div>
        </div>
 
        {/* Show/Hide Furniture */}
        <div className="flex items-center justify-between py-1 bg-slate-950/50 px-3 rounded-lg border border-slate-900">
          <span className="text-xs font-semibold text-gray-300">Simulate Furniture Layout</span>
          <button 
            onClick={() => setShowFurniture(!showFurniture)}
            className={`px-3 py-1 text-[10px] font-bold rounded-md cursor-pointer transition ${
              showFurniture ? "bg-cyan-600 text-black font-black" : "bg-slate-800 text-gray-400"
            }`}
            style={{ padding: "4px 10px", width: "auto" }}
          >
            {showFurniture ? "ENABLED" : "DISABLED"}
          </button>
        </div>
      </div>
      {/* 💰 TOTAL COST DISPLAY */}
<div className="mt-5 p-3 bg-slate-950 border border-cyan-800 rounded-xl">
  <h3 className="text-xs font-bold text-cyan-400 mb-2">
    Building Cost Estimate
  </h3>
 
  <div className="space-y-1 text-[11px] text-gray-300">
    <div className="flex justify-between">
      <span>Area</span>
      <span>{data.totalArea} sq.ft</span>
    </div>
 
    <div className="flex justify-between">
      <span>Rate per sq.ft</span>
      <span>₹1800</span>
    </div>
 
    <div className="border-t border-slate-800 my-2"></div>
 
    <div className="flex justify-between font-bold text-white">
      <span>Total Cost</span>
      <span className="text-cyan-400">
        ₹{data.totalArea * 1800}
      </span>
    </div>
  </div>
</div>
      
    </div>
  );
}