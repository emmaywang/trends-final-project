import {RecipeForm} from "../types";
import { PlusSquareIcon, ArrowUp, X} from "lucide-react";
import { useState, ChangeEvent } from "react";

import { useAuth } from "../auth/AuthUserProvider";
const { user } = useAuth();


const Recipe = (props: RecipeForm) => {
    const recipe=[props.name, props.time, props.ingredients];
    const [toDelete, setDelete] = useState("");

    

    const handleDelete = (event: ChangeEvent<HTMLInputElement>) => {
      console.log("Name changed");
      setDelete(event.currentTarget.value);
    }

    const callDelete=()=>{
        //call delete--"/api/recipe/:name"
        fetch("/api/recipe/:"+toDelete,{method: "DELETE", body:JSON.stringify({"owner":1})} );
    }
   
    
    return (
        <div className='row'>
            
            <h2 data-testid='pagenumber' className='pagenumber'>
                {recipe.map((item) => (
                    <div className='item' data-testid='item'>
                        {item},
                    </div>
                ))}
            </h2>
            <input data-testid='delete' type='text' placeholder='Enter name to delete' onChange={handleDelete}/>
            <button data-testid='delete-button' onClick={callDelete}>
                <X size={20} />
            </button>
           
            
        </div>
    );
};

//***ADD A BUTTON TO UPDATE */
//***AND A BUTTON TO DELETE--MOVE FROM HOMEPAGE */

export default Recipe;
