// @ts-nocheck

import { db } from "./firebase";
import { Person } from "../common/types";

const peopleCollectionRef = db.collection("people");

export const addPerson = async (netid: string, person: Person) => {
  const newDoc = peopleCollectionRef.doc(netid, person);
  return await newDoc.set(person);
};

export const getPeople = async () => {
  const snapshot = await db.collection("people").get();
  let people = {};
  snapshot.forEach((doc) => {
    people[doc.id] = doc.data() as Person;
  });
};

export const getPerson = async (netid: string) => {
  const doc = await peopleCollectionRef.doc(netid).get();
  if (doc.exists) {
    return doc.data();
  } else {
    return null;
  }
};

export const getCertainAge = async (age: number) => {
  const snapshot = await peopleCollectionRef.where("age", "==", age).get();
  let people = {}

  snapshot.forEach((doc) => {
    people[doc.id] = doc.data() as Person;
  })

  return people
};

export const updateAge = async (netid: string, age: number) => {
  return await peopleCollectionRef
    .doc(netid)
    .update({ age });
};

export const deletePerson = async (netid: string) => {
  return await peopleCollectionRef.doc(netid).delete();
};
