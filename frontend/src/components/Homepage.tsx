import { useMemo, useEffect, useState } from "react";
import "./Homepage.css";
import Recipe from "./Recipe";
import { ChangeEvent } from "react";
import { RecipeForm } from "../types";
import { PlusSquareIcon, ArrowUp, X} from "lucide-react";

import Create from "./Create";
import {Link} from "react-router-dom";

import {useAuth} from "../auth/AuthUserProvider.tsx"
const { user } = useAuth() || {};

/*
type Props = {
    data:RecipeForm[];
};*/

//parameter: {data}:Props 

const Homepage =() => {

    const [search, setSearch] = useState("");
    const [update, setUpdate] = useState("");
    const [recipes, setRecipes] = useState<RecipeForm[]>([]);

/*
    const allRecipes=():RecipeForm[]=>{
        const recipes=fetch("/api/recipes/id")
        .then((res)=>res.json())
        
        return recipes;
    }*/
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch("/api/recipes/id",{method: "GET", body:JSON.stringify({"owner":1})});
                if (!response.ok) {
                    throw new Error("Failed to fetch recipes");
                }
                const fetchedRecipes: RecipeForm[] = await response.json();
                setRecipes(fetchedRecipes);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };

        fetchRecipes();
    }, []);
    
    const itemsToDisplay: RecipeForm[] = useMemo(() => {
        
        const items=recipes.filter(item => 
            
            item.name.trim().toLowerCase().includes(search.trim().toLowerCase())
        )
        return items; 
    }, [search, recipes]);
    

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      console.log("search changed");
      setSearch(event.currentTarget.value);
    }


    /*
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `https://medium.com/@bobjunior542/using-usenavigate-in-react-router-6-a-complete-guide-46f51403f430`; 
        navigate(path);
    }*/

    return (
        <div className='body'>
            <h1>Homepage</h1>
            
            <input data-testid='search' type='text' placeholder='Search' onChange={handleChange}/>

            <div className='Homepage'>
                {itemsToDisplay.map((item) => (
                    <div className='item' key={item.name} data-testid='item'>
                        <Recipe
                            name={item.name}
                            time={item.time}
                            ingredients={item.ingredients}
                            />
                    </div>
                ))}
            </div>
            
        

                
        </div>
    );
};

export default Homepage;

/*
<div className='row'>
                <Link to="/create" relative="path">
                    <button data-testid='create-new'>
                        <PlusSquareIcon size={64} /> 
                    </button>
               </Link>
            </div>

*/

