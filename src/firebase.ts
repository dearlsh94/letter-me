import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, child, push } from "firebase/database";
import { FIREBASE_CONFIG } from './constants';
import type { IPersonData } from "./types";

// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIG);
const analytics = getAnalytics(app);

export const addLink = (salt: string, data: any) => {
  const db = getDatabase();
  const createData = {
    ...data,
    createdDate: Date.now()
  }
  console.log(createData);

  set(ref(db, 'links/' + salt), createData);
}

export const sendNickName = (salt: string, data: any) => {
  const db = getDatabase();
  const createData = {
    ...data,
    createdDate: Date.now()
  }
  console.log(createData);

  push(ref(db, 'links/' + salt + '/nickNames/'), createData);
}

export const getPersonBySalt = async (salt: string) => {
  const dbRef = ref(getDatabase());
  console.log(`links/${salt}`)
  try {
    const snapshot = await get(child(dbRef, `links/${salt}`))
    if (snapshot.exists()) {
      const res = snapshot.val()
      console.log(res);

      const person: IPersonData = {
        ...res
      }
      person.nickNames = Object.values(res.nickNames)
      
      return person;
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error: any) {
    console.error(error);
    return null;
  };
}