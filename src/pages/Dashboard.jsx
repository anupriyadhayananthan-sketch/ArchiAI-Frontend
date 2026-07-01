import { 
  LayoutDashboard,
  FolderKanban,
  Box,
  ScanLine,
  Plus
} from "lucide-react";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import "../index.css";


function Dashboard(){

  const [projects, setProjects] = useState([]);


  useEffect(() => {

    fetch("http://localhost:5000/projects")
      .then((res)=>res.json())
      .then((data)=>{
        setProjects(data);
      })
      .catch((err)=>{
        console.log(err);
      });

  },[]);



return(

<div className="dashboard">



{/* Sidebar */}

<div className="sidebar">


<h2>🏗 ArchiAI</h2>


<Link to="/dashboard">
<p>📊 Dashboard</p>
</Link>


<Link to="/requirement">
<p>🤖 Requirement Analyzer</p>
</Link>


<Link to="/planner">
<p>📐 2D Planner</p>
</Link>


<Link to="/3d">
<p>🏠 3D View</p>
</Link>


<Link to="/arvr">
<p>🥽 AR / VR</p>
</Link>


</div>





{/* Main Dashboard */}


<div className="dash-main">



<div className="top">


<div>

<h1>
Good Morning Architect 👋
</h1>


<p>
Manage your AI architecture workspace
</p>


</div>


<button
onClick={() => {
  window.location.href="/planner";
}}
>

<Plus size={18}/>

New Project

</button>



</div>








<div className="cards">



<div className="dash-card">

<FolderKanban size={35}/>

<h3>
Projects
</h3>

<h1>
{projects.length}
</h1>


</div>





<div className="dash-card">

<LayoutDashboard size={35}/>

<h3>
2D Plans
</h3>

<h1>
25
</h1>


</div>





<div className="dash-card">

<Box size={35}/>

<h3>
3D Models
</h3>

<h1>
18
</h1>


</div>





<div className="dash-card">

<ScanLine size={35}/>

<h3>
AR / VR
</h3>

<h1>
10
</h1>


</div>



</div>










<div className="project-box">


<h2>
Recent Projects
</h2>



{
projects.length === 0 ? (

<p>
No projects yet
</p>

) : (

projects.map((p)=>(

<div key={p.id}>


<p>
🏠 {p.name}
</p>


<p>
Type: {p.type}
</p>


<p>
Area: {p.area} sq.ft
</p>


<p>
Floors: {p.floors}
</p>


<hr/>

</div>


))

)

}




</div>





</div>



</div>


)

}


export default Dashboard;