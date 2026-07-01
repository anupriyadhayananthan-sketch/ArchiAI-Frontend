import { Link } from "react-router-dom";
import { Bot, Box, Scan, LayoutDashboard } from "lucide-react";
import "../index.css";

function Home(){

return(
<div className="home">

<nav className="navbar">

<h1>🏗 ArchiAI</h1>

<div>
<Link to="/login">Login</Link>
<button>Get Started</button>
</div>

</nav>


<section className="hero">

<div className="hero-text">

<h1>
AI Architecture Platform
</h1>

<h2>
Design Smarter. Build Faster.
</h2>

<p>
Generate 2D floor plans, explore 3D models
and experience AR/VR architecture walkthroughs.
</p>


<Link to="/login">
<button className="primary">
Start Project
</button>
</Link>


</div>


<div className="hero-card">

<LayoutDashboard size={60}/>

<h3>
Smart Architecture Dashboard
</h3>

<p>
Manage projects, requirements and AI designs
in one place.
</p>


</div>


</section>


<section className="features">


<div className="feature-card">
<Bot size={40}/>
<h3>
AI Requirement Analyzer
</h3>
<p>
Convert client requirements into designs.
</p>
</div>


<div className="feature-card">
<Box size={40}/>
<h3>
3D Visualization
</h3>
<p>
View realistic building models.
</p>
</div>



<div className="feature-card">
<Scan size={40}/>
<h3>
AR / VR Walkthrough
</h3>
<p>
Experience spaces before construction.
</p>
</div>


</section>


</div>
)

}

export default Home;