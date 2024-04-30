import { useState } from "react";
import "./Homepage.css";

import { ChangeEvent } from "react";
//import { signInWithGoogle } from "../utils/firebase";
import {signIn} from "../auth/auth";



const Login =( ) => {

    const [username, setName] = useState("");
    const [password, setPassword] = useState("");

    

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
      console.log("Name changed");
      setName(event.currentTarget.value);
    }

    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("Password changed");
        setPassword(event.currentTarget.value);
      }

    
    

    return (
        <div className='body'>
            <h1>Login</h1>
           
            <input data-testid='username' type='text' placeholder='Enter username' onChange={handleChangeName}/>
            <input data-testid='password' type='text' placeholder='Enter password' onChange={handleChangePassword}/>
           
        <div className='row'>
            <button title="Log in" data-testid='login' onClick={signIn}>
            login
            </button>
        </div>
            
        </div>
    );
    
};

export default Login;

