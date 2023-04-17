import { db } from "./firebase";

const peopleCollectionRef = db.collection("people");
const michelleDocRef = db.collection("people").doc("myl39");

const createNew = async () => {
  await michelleDocRef.set({ age: 21 });
};

const addData = async () => {
  const newDoc = peopleCollectionRef.doc("dlw66");
  await newDoc.set({
    first: "Daniel",
    last: "Wei",
    age: 20,
    year: "Sophomore",
  });
};

const getPeople = async () => {
  const snapshot = await db.collection("people").get();
  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
};

const getMichelle = async () => {
  const doc = await db.collection("people").doc("myl39").get();
  console.log(doc.id, "=>", doc.data());
};

const getPerson = async (netid: string) => {
  const doc = await peopleCollectionRef.doc(netid).get();
  if (doc.exists) {
    console.log("Document data:", doc.data());
  } else {
    console.log("No such document");
  }
};

const getCertainAge = async (age: number) => {
  const snapshot = await peopleCollectionRef.where("age", "==", age).get();
  if (snapshot.empty) {
    console.log("No matching documents");
  } else {
    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  }
};

const getAge = async () => {
  const snapshot = await peopleCollectionRef
    .where("age", ">=", 20)
    .orderBy("age", "desc")
    .limit(3)
    .get();

  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
};

const updateAge = async () => {
  const res = await peopleCollectionRef
    .doc("myl39")
    .update({ age: 20, first: "Michelle" });
  console.log(res);
};

const deleteDoc = async (netid: string) => {
  const doc = await peopleCollectionRef.doc(netid).delete();
  console.log(doc);
};

// createNew();
// addData();
// getPeople();
// getPerson("dasdf");
// getCertainAge(20);
getAge();
// updateAge(); // doesn't exist? error
deleteDoc("myl39");
