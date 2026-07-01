import { useNavigate } from "react-router-dom";
import "../index.css";


function Login(){

const navigate = useNavigate();


function handleLogin(){

navigate("/dashboard");

}


return (

<div className="login-page">

<div className="login-box">

<h1>🏗 ArchiAI</h1>

<h2>Welcome Back</h2>

<p>Login to continue</p>


<input 
placeholder="Email"
/>


<input 
type="password"
placeholder="Password"
/>


<button onClick={handleLogin}>
Login
</button>


</div>

</div>

)

}

export default Login;