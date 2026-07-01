import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Requirement from "./pages/Requirement";
import Planner from "./pages/Planner";
import ThreeDView from "./pages/ThreeDView";
import ARVR from "./pages/ARVR";


function App(){

return(
<BrowserRouter>

<Routes>

<Route path="/" element={<Home/>}/>

<Route path="/login" element={<Login/>}/>

<Route path="/dashboard" element={<Dashboard/>}/>

<Route path="/requirement" element={<Requirement/>}/>

<Route path="/planner" element={<Planner/>}/>

<Route path="/3d" element={<ThreeDView/>}/>
<Route path="/arvr" element={<ARVR />} />

</Routes>

</BrowserRouter>
)

}

export default App;