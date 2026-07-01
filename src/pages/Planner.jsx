import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bed,
  Tv,
  ChefHat,
  Bath,
  Car,
  BookOpen,
  Compass,
  Sparkles,
  HelpCircle,
  Eye,
  Layers,
  ArrowRight,
  Plus
} from "lucide-react";
 
import "../index.css";
 
// Procedural Layout Generator Engine
function generateHouseLayout(inputs) {
  const { area, type, floors, hallSize, bedrooms, bathrooms, requirements } = inputs;
 
  const areaNum = parseInt(area) || 1000;
 
  // Parse floorsCount correctly from "G+1 Floor", "G+2 Floor", etc.
  let floorsCount = 1;
 
  const match = floors.match(/g\+(\d+)/i);
 
  if (match) {
    floorsCount = parseInt(match[1]) + 1; // G+1 = 2 floors, G+2 = 3 floors
  } else if (floors.toLowerCase().includes("ground")) {
    floorsCount = 1;
  }
 
  const reqLower = requirements.toLowerCase();
  const rooms = [];
 
  const scale = Math.sqrt(areaNum / 1500);
 
  // ================= GROUND FLOOR (FLOOR 0) =================
  const hallBase = hallSize === "large" ? 0.34 : hallSize === "small" ? 0.20 : 0.27;
  const hallSqft = Math.round(areaNum * hallBase);
  rooms.push({
    id: "hall_0",
    name: "Living Hall",
    type: "living",
    area: hallSqft,
    floor: 0,
    x: 0, z: 0, w: 8, h: 6
  });
 
  const kitchenSqft = Math.round(areaNum * 0.12);
  rooms.push({
    id: "kitchen_0",
    name: "Kitchen",
    type: "kitchen",
    area: kitchenSqft,
    floor: 0,
    x: 8, z: 0, w: 4, h: 4
  });
 
  const bathSqft = Math.round(areaNum * 0.06);
  rooms.push({
    id: "bath_0",
    name: "Bathroom 1",
    type: "bathroom",
    area: bathSqft,
    floor: 0,
    x: 8, z: 4, w: 4, h: 2
  });
 
  const hasParking = reqLower.includes("parking") || reqLower.includes("car") || reqLower.includes("garage");
  if (hasParking) {
    const parkingSqft = Math.round(areaNum * 0.14);
    rooms.push({
      id: "parking_0",
      name: "Car Parking",
      type: "parking",
      area: parkingSqft,
      floor: 0,
      x: 0, z: 6, w: 4, h: 6
    });
  }
 
  const hasPooja = reqLower.includes("pooja") || reqLower.includes("temple");
  if (hasPooja) {
    const poojaSqft = Math.round(areaNum * 0.05);
    rooms.push({
      id: "pooja_0",
      name: "Pooja Room",
      type: "pooja",
      area: poojaSqft,
      floor: 0,
      x: 4, z: 6, w: 4, h: 3
    });
  }
 
  if (floorsCount > 1) {
    rooms.push({
      id: "stairs_0",
      name: "Staircase",
      type: "stairs",
      area: Math.round(areaNum * 0.04),
      floor: 0,
      x: 4, z: 9, w: 4, h: 3
    });
  }
 
  const bedSqft = Math.round(areaNum * 0.16);
  const bedCount = parseInt(bedrooms) || 1;
  const bathCount = parseInt(bathrooms) || 1;
 
  // ================= SINGLE FLOOR LAYOUT =================
  if (floorsCount === 1) {
    rooms.push({
      id: "bed_1",
      name: "Master Bedroom",
      type: "bedroom",
      area: bedSqft,
      floor: 0,
      x: 8, z: 6, w: 4, h: 6
    });
 
    if (bedCount >= 2 && !hasParking) {
      rooms.push({
        id: "bed_2",
        name: "Bedroom 2",
        type: "bedroom",
        area: Math.round(bedSqft * 0.85),
        floor: 0,
        x: 0, z: 6, w: 4, h: 6
      });
    }
  } else {
    // ================= FIRST FLOOR (FLOOR 1) =================
    if (bedCount >= 1) {
      rooms.push({
        id: "bed_1",
        name: "Master Bedroom",
        type: "bedroom",
        area: bedSqft,
        floor: 1,
        x: 0, z: 0, w: 6, h: 6
      });
    }
 
    if (bedCount >= 2) {
      rooms.push({
        id: "bed_2",
        name: "Bedroom 2",
        type: "bedroom",
        area: Math.round(bedSqft * 0.9),
        floor: 1,
        x: 6, z: 0, w: 6, h: 6
      });
    }
 
    if (bathCount >= 2) {
      rooms.push({
        id: "bath_1",
        name: "Bathroom 2",
        type: "bathroom",
        area: Math.round(bathSqft * 0.9),
        floor: 1,
        x: 0, z: 6, w: 4, h: 3
      });
    }
 
    const hasStudy = reqLower.includes("study") || reqLower.includes("office") || reqLower.includes("library");
    if (hasStudy) {
      rooms.push({
        id: "study_0",
        name: "Study Room",
        type: "study",
        area: Math.round(areaNum * 0.08),
        floor: 1,
        x: 4, z: 6, w: 4, h: 3
      });
    }
 
    const hasBalcony = reqLower.includes("balcony") || reqLower.includes("verandah");
    if (hasBalcony) {
      rooms.push({
        id: "balcony_0",
        name: "Balcony",
        type: "balcony",
        area: Math.round(areaNum * 0.07),
        floor: 1,
        x: 8, z: 6, w: 4, h: 6
      });
    }
 
    rooms.push({
      id: "stairs_1",
      name: "Staircase",
      type: "stairs",
      area: Math.round(areaNum * 0.04),
      floor: 1,
      x: 4, z: 9, w: 4, h: 3
    });
 
    rooms.push({
      id: "lobby_1",
      name: "Family Lounge",
      type: "living",
      area: Math.round(areaNum * 0.08),
      floor: 1,
      x: 0, z: 9, w: 4, h: 3
    });
 
    // ================= FLOOR 2 AND ABOVE (GENERIC LOOP) =================
    for (let f = 2; f < floorsCount; f++) {
      if (bedCount >= f + 1) {
        rooms.push({
          id: `bed_${f + 1}`,
          name: `Bedroom ${f + 1}`,
          type: "bedroom",
          area: Math.round(bedSqft * 0.85),
          floor: f,
          x: 0, z: 0, w: 6, h: 6
        });
      }
 
      if (bedCount >= f + 2) {
        rooms.push({
          id: `bed_${f + 2}`,
          name: `Bedroom ${f + 2}`,
          type: "bedroom",
          area: Math.round(bedSqft * 0.8),
          floor: f,
          x: 6, z: 0, w: 6, h: 6
        });
      }
 
      if (bathCount >= f + 1) {
        rooms.push({
          id: `bath_${f}`,
          name: `Bathroom ${f + 1}`,
          type: "bathroom",
          area: Math.round(bathSqft * 0.8),
          floor: f,
          x: 0, z: 6, w: 4, h: 3
        });
      }
 
      // Add staircase on every floor except the topmost
      if (f < floorsCount - 1) {
        rooms.push({
          id: `stairs_${f}`,
          name: "Staircase",
          type: "stairs",
          area: Math.round(areaNum * 0.04),
          floor: f,
          x: 4, z: 9, w: 4, h: 3
        });
      }
 
      // Add open terrace only on the topmost floor
      if (f === floorsCount - 1) {
        rooms.push({
          id: `terrace_${f}`,
          name: "Open Terrace",
          type: "balcony",
          area: Math.round(areaNum * 0.15),
          floor: f,
          x: 4, z: 6, w: 8, h: 6
        });
      }
    }
  }
 
  return {
    floorsCount,
    houseType: type,
    totalArea: areaNum,
    scale,
    rooms
  };
}
 
function getRoomIcon(type) {
  switch (type) {
    case "living": return <Tv className="w-5 h-5" />;
    case "bedroom": return <Bed className="w-5 h-5" />;
    case "kitchen": return <ChefHat className="w-5 h-5" />;
    case "bathroom": return <Bath className="w-5 h-5" />;
    case "parking": return <Car className="w-5 h-5" />;
    case "pooja": return <Compass className="w-5 h-5 animate-pulse text-amber-500" />;
    case "study": return <BookOpen className="w-5 h-5" />;
    case "stairs": return <Layers className="w-5 h-5 text-indigo-400" />;
    case "balcony": return <Sparkles className="w-5 h-5 text-cyan-400" />;
    default: return <HelpCircle className="w-5 h-5" />;
  }
}
 
function Planner() {
  const saveProject = async () => {
    const project = {
      name: "My House Project",
      type: "Home",
      area: 1200,
      floors: "G+1"
    };
    await fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project)
    });
    alert("Project Saved!");
  };
 
  const navigate = useNavigate();
 
  const [area, setArea] = useState("1500");
  const [type, setType] = useState("Villa");
  const [floors, setFloors] = useState("G+1 Floor");
  const [hallSize, setHallSize] = useState("medium");
  const [bedrooms, setBedrooms] = useState("3");
  const [bathrooms, setBathrooms] = useState("2");
  const [requirements, setRequirements] = useState("kitchen, pooja, parking, balcony, study");
 
  const [houseData, setHouseData] = useState(null);
  const [activeFloor, setActiveFloor] = useState(0);
  const [generated, setGenerated] = useState(false);
 
  useEffect(() => {
    const rawReq = localStorage.getItem("clientRequirement");
    if (rawReq) {
      const reqLower = rawReq.toLowerCase();
 
      const areaMatch = reqLower.match(/(\d{3,4})\s*(sqft|sq\.ft|sq\s*ft|square\s*feet|area|sq)/);
      if (areaMatch) {
        setArea(areaMatch[1]);
      } else {
        const generalNumber = reqLower.match(/\b(800|900|1000|1200|1500|1800|2000|2500|3000)\b/);
        if (generalNumber) setArea(generalNumber[0]);
      }
 
      if (reqLower.includes("apartment") || reqLower.includes("flat") || reqLower.includes("condo")) {
        setType("Apartment");
      } else {
        setType("Villa");
      }
 
      if (reqLower.includes("g+2") || reqLower.includes("three floor") || reqLower.includes("second floor")) {
        setFloors("G+2 Floor");
      } else if (reqLower.includes("g+1") || reqLower.includes("two floor") || reqLower.includes("first floor") || reqLower.includes("duplex")) {
        setFloors("G+1 Floor");
      } else {
        setFloors("Ground Floor");
      }
 
      const bedMatch = reqLower.match(/(\d+)\s*(bedroom|bed|bhk)/);
      if (bedMatch && ["1","2","3","4"].includes(bedMatch[1])) {
        setBedrooms(bedMatch[1]);
      }
 
      const bathMatch = reqLower.match(/(\d+)\s*(bathroom|bath|toilet|washroom)/);
      if (bathMatch && ["1","2","3"].includes(bathMatch[1])) {
        setBathrooms(bathMatch[1]);
      }
 
      const extras = ["kitchen"];
      if (reqLower.includes("pooja")) extras.push("pooja");
      if (reqLower.includes("parking") || reqLower.includes("car")) extras.push("parking");
      if (reqLower.includes("balcony")) extras.push("balcony");
      if (reqLower.includes("study") || reqLower.includes("office")) extras.push("study");
      setRequirements(extras.join(", "));
 
      const initialInputs = {
        area: areaMatch ? areaMatch[1] : "1500",
        type: reqLower.includes("apartment") ? "Apartment" : "Villa",
        floors: reqLower.includes("g+2") ? "G+2 Floor" : reqLower.includes("g+1") ? "G+1 Floor" : "Ground Floor",
        hallSize: reqLower.includes("large") ? "large" : reqLower.includes("small") ? "small" : "medium",
        bedrooms: bedMatch ? bedMatch[1] : "3",
        bathrooms: bathMatch ? bathMatch[1] : "2",
        requirements: extras.join(", ")
      };
 
      const res = generateHouseLayout(initialInputs);
      setHouseData(res);
      setGenerated(true);
      setActiveFloor(0);
      localStorage.setItem("houseData", JSON.stringify(res));
      localStorage.removeItem("clientRequirement");
    }
  }, []);
 
  function handleGenerate() {
    const inputs = { area, type, floors, hallSize, bedrooms, bathrooms, requirements };
    const res = generateHouseLayout(inputs);
    setHouseData(res);
    setGenerated(true);
    setActiveFloor(0);
    localStorage.setItem("houseData", JSON.stringify(res));
  }
 
  function open3D() {
    if (!generated || !houseData) {
      handleGenerate();
    }
    navigate("/3d");
  }
 
  const floorRooms = houseData?.rooms.filter(room => room.floor === activeFloor) || [];
 
  return (
    <div className="planner-app">
      {/* Navigation Sidebar */}
      <div className="planner-sidebar">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-8">🏗 ArchiAI</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/dashboard" className="nav-item">
            <p>📊 Dashboard</p>
          </Link>
          <Link to="/requirement" className="nav-item">
            <p>🤖 Requirement Analyzer</p>
          </Link>
          <Link to="/planner" className="nav-item active-link">
            <p>📐 2D Planner</p>
          </Link>
          <Link to="/3d" className="nav-item">
            <p>🏠 3D View</p>
          </Link>
        </nav>
      </div>
 
      <div className="planner-content">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">📐 AI Floor Plan Generator</h1>
            <p className="text-gray-400 mt-1">Configure options or write natural client requirements to build layouts.</p>
          </div>
          {generated && (
            <button
              onClick={open3D}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl transition duration-200 font-semibold shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              <Eye size={18} />
              Visualize in 3D
            </button>
          )}
        </div>
 
        <div className="planner-grid">
          {/* Requirement Panel */}
          <div className="requirement-card">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-cyan-400">
              <Sparkles size={18} />
              Design Parameters
            </h2>
 
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-300 block mb-1">Building Category</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option>Villa</option>
                  <option>Apartment</option>
                  <option>Office</option>
                  <option>Shopping Complex</option>
                  <option>Hospital</option>
                </select>
              </div>
 
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-gray-300 block mb-1">Area (sq.ft)</label>
                  <input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="Area sq.ft"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-300 block mb-1">Floors</label>
                  <select value={floors} onChange={(e) => setFloors(e.target.value)}>
                    <option value="Ground Floor">Ground Floor</option>
                    <option value="G+1 Floor">G+1 Floor</option>
                    <option value="G+2 Floor">G+2 Floor</option>
                    <option value="G+3 Floor">G+3 Floor</option>
                    <option value="G+4 Floor">G+4 Floor</option>
                    <option value="G+5 Floor">G+5 Floor</option>
                    <option value="G+6 Floor">G+6 Floor</option>
                    <option value="G+7 Floor">G+7 Floor</option>
                    <option value="G+8 Floor">G+8 Floor</option>
                    <option value="G+9 Floor">G+9 Floor</option>
                    <option value="G+10 Floor">G+10 Floor</option>
                    <option value="G+11 Floor">G+11 Floor</option>
                    <option value="G+12 Floor">G+12 Floor</option>
                  </select>
                </div>
              </div>
 
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">Hall Size</label>
                  <select value={hallSize} onChange={(e) => setHallSize(e.target.value)}>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">Bedrooms</label>
                  <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
                    {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Bed" : "Beds"}
                      </option>
                    ))}
                    <option value="101">100+ Beds</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">Bathrooms</label>
                  <select value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}>
                    {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num} Bath{num === 1 ? "" : "s"}
                      </option>
                    ))}
                    <option value="101">100+ Baths</option>
                  </select>
                </div>
              </div>
 
              <div>
                <label className="text-sm font-semibold text-gray-300 block mb-1">Add-ons (Comma Separated)</label>
                <textarea
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="kitchen, pooja, parking, balcony, study"
                />
              </div>
 
              <div className="pt-2 flex flex-col gap-2">
                <button onClick={handleGenerate} className="w-100 flex items-center justify-center gap-2">
                  <Sparkles size={16} />
                  Generate 2D Layout
                </button>
              </div>
            </div>
          </div>
 
          {/* Interactive 2D Blueprint Panel */}
          <div className="preview-card flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-100">📐 Blueprint Layout</h2>
 
              {generated && houseData && (
                <div className="flex gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
                  {Array.from({ length: houseData.floorsCount }).map((_, fIdx) => (
                    <button
                      key={fIdx}
                      onClick={() => setActiveFloor(fIdx)}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                        activeFloor === fIdx
                          ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/20"
                          : "text-gray-400 hover:text-white bg-transparent"
                      }`}
                      style={{ padding: "6px 12px", width: "auto", marginTop: 0 }}
                    >
                      {fIdx === 0 ? "Ground" : fIdx === 1 ? "1st Floor" : `${fIdx}${fIdx === 2 ? "nd" : fIdx === 3 ? "rd" : "th"} Floor`}
                    </button>
                  ))}
                </div>
              )}
            </div>
 
            {generated && houseData ? (
              <div className="flex-1 flex flex-col justify-between">
                <div className="relative w-full aspect-square max-w-[480px] mx-auto bg-slate-900 border-2 border-slate-700 rounded-xl overflow-hidden p-2 grid-pattern">
 
                  <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none opacity-20">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="border-r border-slate-500 w-full h-full col-span-1" />
                    ))}
                  </div>
 
                  {floorRooms.map((room) => {
                    const left = (room.x / 12) * 100;
                    const top = (room.z / 12) * 100;
                    const width = (room.w / 12) * 100;
                    const height = (room.h / 12) * 100;
 
                    return (
                      <div
                        key={room.id}
                        className={`absolute border-2 rounded-lg flex flex-col justify-between p-3 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg select-none blueprint-room-${room.type}`}
                        style={{
                          left: `${left}%`,
                          top: `${top}%`,
                          width: `${width}%`,
                          height: `${height}%`,
                          padding: "8px"
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-[11px] uppercase tracking-wider font-extrabold text-white/90 truncate">
                            {room.name}
                          </span>
                          <span className="opacity-80 scale-90 text-white">
                            {getRoomIcon(room.type)}
                          </span>
                        </div>
 
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] text-white/70 font-mono">
                            {room.area} SQFT
                          </span>
                          <span className="text-[8px] opacity-40 font-mono text-white">
                            {room.w}m x {room.h}m
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
 
                <div className="mt-4 p-3 bg-indigo-950/40 rounded-xl border border-indigo-900/50 text-xs text-indigo-200 flex items-center justify-between">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Layers size={14} className="text-indigo-400" />
                    Layout Stats ({floors}):
                  </span>
                  <div className="flex gap-4">
                    <span>Rooms: <strong>{houseData.rooms.length}</strong></span>
                    <span>Total Area: <strong>{houseData.totalArea} sq.ft</strong></span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-2xl p-8 text-center text-gray-500">
                <Compass className="w-12 h-12 text-slate-600 mb-3 animate-spin" style={{ animationDuration: '6s' }} />
                <h3 className="text-gray-300 font-bold text-lg">No Plan Generated Yet</h3>
                <p className="text-sm text-gray-400 max-w-sm mt-1 mb-4">Enter client requirements or click the generate button to calculate your custom architectural blueprint.</p>
                <button onClick={handleGenerate} className="px-4 py-2 text-xs font-semibold bg-slate-800 text-cyan-400 border border-cyan-500/30 rounded-xl hover:bg-slate-750">
                  Quick Generate Demo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Planner;
