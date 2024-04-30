// @ts-nocheck

import { db } from "./firebase";
import { Recipe } from "../common/types";
//import {useAuth} from "../../frontend/src/auth/AuthUserProvider.tsx"
//const {user}=useAuth();

const recipesCollectionRef = db.collection("recipes");


export const addRecipe = async (name: string, recipe: Recipe) => {
  const newDoc = recipesCollectionRef.doc(name, recipe);
  return await newDoc.set(recipe);
};

export const getRecipes = async (id: number) => {
  //const snapshot = await db.collection("recipes").get();
  /*
  snapshot.forEach((doc) => {
    recipes[doc.id] = doc.data() as Recipe;
  });*/
  
  const taskQuery = query(
    collection(db, 'recipes'),
    where('owner', '==', id),
  );
  let recipes = {};
  
  
  taskQuery.forEach((doc) => {
    recipes[doc.id] = doc.data() as Recipe;
  });
};

export const getRecipe = async (name: string, id: number) => {
  const doc = await recipesCollectionRef.doc(name).get();
  if (doc.exists && doc.owner==id) {
    return doc.data();
  } else {
    return null;
  }
};

/*
export const getIngredients = async (age: number) => {
  //querysnapshot contains list of document references
  const snapshot = await recipesCollectionRef.where("age", "==", age).get();
  let recipes = {}

  snapshot.forEach((doc) => {
    recipes[doc.id] = doc.data() as Recipe;
  })

  return recipes
};

export const getOwnership = async (age: number) => {
  //querysnapshot contains list of document references
  const snapshot = await recipesCollectionRef.where("age", "==", age).get();
  let recipes = {}

  snapshot.forEach((doc) => {
    recipes[doc.id] = doc.data() as Recipe;
  })

  return recipes
};
*/

export const updateName = async (name: string, newName: string, id: number) => {
  /*return await recipesCollectionRef
    .doc(name)
    .update({ name: newName }); */
    //***I DONT THINK THIS ACTUALLY CHANGES THE DOC NAME--COME BACK */
    const res=await recipesCollectionRef.doc(name);
    if (doc.exists && doc.owner==id) {
      return doc.data();
    } else {
      return null;
    }

};

export const updateTime = async (name: string, time: number, id: number) => {
  return await recipesCollectionRef
    .doc(name)
    .update({ time }); //bc name of parameter same as key, don't have to write key name
};

export const updateIngredients = async (name: string, ingredients: string, id:number) => {
  return await recipesCollectionRef
    .doc(name)
    .update({ ingredients }); //bc name of parameter same as key, don't have to write key name
};

export const deleteRecipe = async (name: string, id:number) => {
  return await recipesCollectionRef.doc(name).delete();
};
