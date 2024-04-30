import express, { Express } from "express";

//import cors from "cors";
import { addRecipe, getRecipe, getRecipes, updateName, updateTime, updateIngredients, deleteRecipe } from "./server/recipe.controller";
import {addUser, getUser, getUsers, deleteUser} from "./server/people.controller";
import { Recipe, People } from "./common/types";

const app: Express = express();
const port = 8080;

//app.use(cors());
app.use(express.json());

//get a recipe by name, only if owned by current user
app.get("/api/recipe/:name", async (req, res) => {
  console.log("[GET] entering 'recipe/:name' endpoint");
  const name: string = req.params.name;
  const {owner}=req.body;
  try {
    const recipe = await getRecipe(name, owner); 
    if (recipe === null) {
      res
        .status(404)
        .send({
          error: `ERROR: recipe with name: ${name} not found in Firestore`,
        });
    } else {
      res.status(200).send({
        message: `SUCCESS retrieved recipe with name: ${name} from the recipes collection in Firestore`,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/recipe/:name endpoint: ${err}`,
    });
  }
});

//get all recipes from current user
app.get("/api/recipes", async (req, res) => {
  console.log("[GET] entering 'recipes' endpoint");
  //const uid: number=Number(req.params.id);
  try {
    const {owner}=req.body;
    const recipes = await getRecipes(owner);
    res.status(200).send({
      message: `SUCCESS retrieved ${recipes} from the recipes collection in Firestore`,
      data: recipes,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/recipes/id endpoint: ${err}`,
    });
  }
});

//add a new recipe
app.post("/api/recipe/:name", async (req, res) => {
  console.log("[POST] entering '/recipe/:name' endpoint");
  const name: string = req.params.name;
  const { time,ingredients, owner } = req.body;
  const recipe: Recipe = {
    name,
    time,
    ingredients,
    owner,
  };

  try {
    await addRecipe(name, recipe);
    res.status(200).send({
      message: `SUCCESS added recipe with name: ${name} to the recipes collection in Firestore`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/recipe/:name endpoint: ${err}`,
    });
  }
});



//update name
app.put("/api/newname/:name", async (req, res) => {
  console.log("[PUT] entering '/newname/:newname' endpoint");
  const name: string = req.params.name
  const {owner, newName}=req.body;
  

  try {
    await updateName(name, newName, owner);
    res.status(200).send({
      message: `SUCCESS updated recipe with name: ${name} to new name: ${newName} from the recipes collection in Firestore`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/recipe/:name endpoint: ${err}`,
    });
  }
});

//update time
app.put("/api/time/:name", async (req, res) => {
  console.log("[PUT] entering '/time/:time' endpoint");
  const name: string = req.params.name;
  const {owner, time}=req.body;
  

  try {
    await updateTime(name, time, owner);
    res.status(200).send({
      message: `SUCCESS updated recipe with name: ${name} to time: ${time} from the recipes collection in Firestore`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/recipe/:name endpoint: ${err}`,
    });
  }
});

//update ingredients
app.put("/api/ingredients/:name", async (req, res) => {
  console.log("[PUT] entering '/ingredients/:ingredients' endpoint");
  const name: string = req.params.name;
  const {owner, ingredients}=req.body;
  
  try {
    await updateIngredients(name, ingredients, owner);
    res.status(200).send({
      message: `SUCCESS updated recipe with name: ${name} to ingredients: ${ingredients} from the recipes collection in Firestore`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/recipe/:name endpoint: ${err}`,
    });
  }
});

//delete recipe by name
app.delete("/api/recipe/:name", async (req, res) => {
  console.log("[DELETE] entering '/recipe/:name' endpoint");
  const name: string = req.params.name;
  const {owner}=req.body;

  try {
    await deleteRecipe(name, owner);
    res.status(200).send({
      message: `SUCCESS deleted recipe with name: ${name} from the recipes collection in Firestore`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/recipe/:name endpoint: ${err}`,
    });
  }
});



//USER ROUTES
//add a new user
app.post("/api/users/:id", async (req, res) => {
  console.log("[POST] entering '/users/:id' endpoint");
  const id: number = Number(req.params.id);
  const { name,email } = req.body;
  const person: People = {
    name,
    email
  };

  try {
    
    await addUser(id, person);
    res.status(200).send({
      message: `SUCCESS added person with name: ${name} to the people collection in Firestore`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/users/:name endpoint: ${err}`,
    });
  }
});


//get user by name
app.get("/api/users/:id", async (req, res) => {
  console.log("[GET] entering 'users/:id' endpoint");
  const id: number = Number(req.params.id);
  try {
    const person = await getUser(id); 
    if (person === null) {
      res
        .status(404)
        .send({
          error: `ERROR: person with id: ${id} not found in Firestore`,
        });
    } else {
      res.status(200).send({
        message: `SUCCESS retrieved person with id: ${id} from the people collection in Firestore`,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/users/:id endpoint: ${err}`,
    });
  }
});



//delete user by name
app.delete("/api/users/:id", async (req, res) => {
  console.log("[DELETE] entering '/users/:id' endpoint");
  const id: number = Number(req.params.id);

  try {
    await deleteUser(id);
    res.status(200).send({
      message: `SUCCESS deleted user with id: ${id} from the users collection in Firestore`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/users/:id endpoint: ${err}`,
    });
  }
});


app.listen(port, () => {
  console.log(`SERVER listening on port ${port}`);
});

/*
app.get("/api/recipe/:name", async (req, res) => {
  console.log("[GET] entering 'recipe/:name' endpoint");
  const name: string = req.params.name;
  try {
    const recipe = await getRecipe(name); 
    if (recipe === null) {
      res
        .status(404)
        .send({
          error: `ERROR: recipe with name: ${name} not found in Firestore`,
        });
    } else {
      res.status(200).send({
        message: `SUCCESS retrieved recipe with name: ${name} from the recipes collection in Firestore`,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/recipe/:name endpoint: ${err}`,
    });
  }
});

app.post("/api/recipe/:name", async (req, res) => {
  console.log("[POST] entering '/recipe/:name' endpoint");
  const name: string = req.params.name;
  const { first, last, age, time } = req.body;
  const recipe: Recipe = {
    first,
    last,
    age,
    time,
  };

  try {
    await addRecipe(name, recipe);
    res.status(200).send({
      message: `SUCCESS added recipe with name: ${name} to the recipes collection in Firestore`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/recipes/id/:name endpoint: ${err}`,
    });
  }
});

app.get("/api/recipes/id", async (req, res) => {
  console.log("[GET] entering 'recipes' endpoint");

  try {
    const recipes = await getPeople();
    res.status(200).send({
      message: `SUCCESS retrieved ${recipes} from the recipes collection in Firestore`,
      data: recipes,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/recipes/id endpoint: ${err}`,
    });
  }
});

app.get("/api/age/:age", async (req, res) => {
  console.log("[GET] entering 'addRecipe' endpoint");
  const age: number = Number(req.params.age)

  try {
    const recipes = await getCertainAge(age);
    res.status(200).send({
      message: `SUCCESS retrieved all recipes with age: ${age} from the recipes collection in Firestore`,
      data: recipes,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/age/:age endpoint: ${err}`,
    });
  }
});

app.put("/api/age/:name", async (req, res) => {
  console.log("[PUT] entering '/age/:age' endpoint");
  const name: string = req.params.name
  const age: number = Number(req.body.age);

  try {
    await updateAge(name, age);
    res.status(200).send({
      message: `SUCCESS updated recipe with name: ${name} to age: ${age} from the recipes collection in Firestore`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/age/:name endpoint: ${err}`,
    });
  }
});

app.delete("/api/recipe/:name", async (req, res) => {
  console.log("[DELETE] entering '/recipe/:name' endpoint");
  const name: string = req.params.name;

  try {
    await deleteRecipe(name);
    res.status(200).send({
      message: `SUCCESS deleted recipe with name: ${name} from the recipes collection in Firestore`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/age/:name endpoint: ${err}`,
    });
  }
});

app.listen(port, () => {
  console.log(`SERVER listening on port ${port}`);
});
*/