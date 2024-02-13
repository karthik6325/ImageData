import React, {useState} from "react"
import "./login.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = ({ setLoginUser }) => {

    const history = useNavigate();

    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3001/api/v1/login', user);
          const token = response.data.token;
          document.cookie = `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`;
          setLoginUser(response.data.token);
          history("/");
        } catch (error) {
          toast.error("Invlid email id or password!")
          console.error(error);
        }
      };

    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={() => history("/register")}>Register</div>
        </div>
    )
}

export default Login