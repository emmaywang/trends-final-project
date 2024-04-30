import { useState } from "react";
import "./Homepage.css";
import Recipe from "./Recipe";
import { ChangeEvent } from "react";
import { RecipeForm } from "../types";
import { CheckCircle2Icon } from "lucide-react";

import {useAuth} from "../auth/AuthUserProvider.tsx"
//const { user } = useAuth();
//const user = useAuth().user;


const Create =( ) => {

    const [name, setName] = useState("");
    const [time, setTime] = useState(0);
    const [ingredients, setIngredients] = useState("");

    

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
      console.log("Name changed");
      setName(event.currentTarget.value);
    }

    const handleChangeTime = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("Cooking time changed");
        setTime(event.currentTarget.valueAsNumber);
    }

    const handleChangeIngredients = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("Ingredients list changed");
        //ingredients just has one very long string rn
        setIngredients(event.currentTarget.value);
    }

    const handleCreate = () => {
        console.log("create");
        fetch("/api/recipe/:"+name,{method: "POST", body:JSON.stringify({"name": name,
                                                                "ingredients":ingredients,
                                                                "time": time,
                                                                "owner":1})});
    }
    //"owner": user.uid

    return (
        <div className='body'>
            <h1>Create</h1>
            
            <input data-testid='name' type='text' placeholder='Enter name' onChange={handleChangeName}/>
            <input data-testid='time' type='text' placeholder='Enter cooking time' onChange={handleChangeTime}/>
            <input data-testid='ingredients' type='text' placeholder='Enter ingredients list' onChange={handleChangeIngredients}/>
        <div className='row'>
            <button data-testid='create-new' onClick={handleCreate}>
                <CheckCircle2Icon size={64} />
            </button>
        </div>
            
        </div>
    );
};
//***add a link to go back to homepage */

export default Create;

