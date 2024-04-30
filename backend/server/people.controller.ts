// @ts-nocheck

import { db } from "./firebase";
import { People } from "../common/types";

const peopleCollectionRef = db.collection("people");

export const addUser = async (id: number, person: People) => {
  const newDoc = peopleCollectionRef.doc(id, person);
  return await newDoc.set(person);
};

export const getUsers = async () => {
  const snapshot = await db.collection("people").get();
  let people = {};
  snapshot.forEach((doc) => {
    people[doc.id] = doc.data() as People;
  });
};

export const getUser = async (id: number) => {
  const doc = await peopleCollectionRef.doc(id).get();
  if (doc.exists) {
    return doc.data();
  } else {
    return null;
  }
};

export const updateName = async (id: number, newName: string) => {
  return await peopleCollectionRef
    .doc(id)
    .update({ name: newName }); 
    
};


export const deleteUser = async (id: number) => {
  return await peopleCollectionRef.doc(id).delete();
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


