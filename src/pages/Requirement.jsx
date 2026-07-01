import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../index.css";


function Requirement(){

const navigate = useNavigate();

const [details,setDetails] = useState("");


function generateDesign(){

localStorage.setItem(
"clientRequirement",
details
);

navigate("/planner");

}


return(

<div className="requirement-page">


<h1>🤖 AI Requirement Analyzer</h1>

<p>
Enter client requirements
</p>


<div className="requirement-form">


<textarea

placeholder="Example: 
3 bedroom house with attached bathroom, pooja room, kitchen, modern hall"

value={details}

onChange={(e)=>setDetails(e.target.value)}

></textarea>



<button onClick={generateDesign}>

Generate Design ✨

</button>


</div>


</div>

)

}

export default Requirement;