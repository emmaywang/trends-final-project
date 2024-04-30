import { useState, ChangeEvent } from "react";
import "./Homepage.css";

import { CheckCircle2Icon, ArrowUp } from "lucide-react";

import {useAuth} from "../auth/AuthUserProvider.tsx"
const { user } = useAuth() || {};
/*
type Props = {
    originalName:string;
}*/
const Update =() => {

    const [name, setName] = useState("");
    const [originalName,setOriginalName] = useState("");
    const [time, setTime] = useState(0);
    const [ingredients, setIngredients] = useState("");

    

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
      console.log("Name changed");
      setName(event.currentTarget.value);
    }

    const handleChangeOriginalName = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("Name changed");
        setOriginalName(event.currentTarget.value);
      }

    const handleChangeTime = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("Cooking time changed");
        setTime(event.currentTarget.valueAsNumber);
    }

    const handleChangeIngredients = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("Ingredients list changed");
        setIngredients(event.currentTarget.value);
    }

    //should try catch later
    const callUpdateName=()=>{
        //call update--put "/api/newname/:name"
        fetch("/api/newname/:"+originalName,{method: "PUT", body:JSON.stringify({"newName":name, "owner":1})});
    }


    const callUpdateTime=()=>{
        //call update--put "/api/time/:name"
        fetch("/api/time/:"+originalName,{method: "PUT", body:JSON.stringify({"time":time, "owner":1})});
    }

    const callUpdateIngredients=()=>{
        //call update--put "/api/ingredients/:name"
        //ingredients only contains a very long string rn
        fetch("/api/ingredients/:"+originalName,{method: "PUT", body:JSON.stringify({"ingredients":ingredients, "owner":1})});
    }

    return (
        <div className='body'>
            <h1>Update</h1>

                <input data-testid='name' type='text' placeholder='Enter original name' onChange={handleChangeOriginalName}/>
                
                
                <input data-testid='name' type='text' placeholder='Update name' onChange={handleChangeName}/>
                <button data-testid='update-button' onClick={callUpdateName}>
                    <ArrowUp size={20} />
                </button>

                <input data-testid='time' type='text' placeholder='Update cooking time' onChange={handleChangeTime}/>
                <button data-testid='update-button' onClick={callUpdateTime}>
                    <ArrowUp size={20} />
                </button>

                <input data-testid='ingredients' type='text' placeholder='Update ingredients list' onChange={handleChangeIngredients}/>
                <button data-testid='update-button' onClick={callUpdateIngredients}>
                    <ArrowUp size={20} />
                </button>

        
            
        </div>
    );
};
//***add a link to go back to homepage */

export default Update;

