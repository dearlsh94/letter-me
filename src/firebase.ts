import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, child, push } from "firebase/database";
import { FIREBASE_CONFIG } from './constants';
import type { IInfoCount, IPersonData, INickName } from "./types";

// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIG);
const analytics = getAnalytics(app);

export const getCount = async () => {
  const db = getDatabase();
  const dbRef = ref(getDatabase());

  try {
    const snapshot = await get(child(dbRef, `infos`))
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      const initInfo = {
        userCount: 0,
        nickNameCount: 0
      }

      await set(ref(db, 'infos/'), initInfo)
      return initInfo
    }
  } catch (error) {

  }
}

export const addUserCount = async () => {
  const db = getDatabase();
  const infoCount = await getCount();
  const data = {
    ...infoCount,
    userCount: infoCount.userCount + 1,
  }

  set(ref(db, 'infos/'), data)
}

export const addNickNameCount = async () => {
  const db = getDatabase();
  const infoCount = await getCount();
  const data = {
    ...infoCount,
    nickNameCount: infoCount.nickNameCount + 1,
  }

  set(ref(db, 'infos/'), data)
}

export const addLink = (salt: string, data: IPersonData) => {
  const db = getDatabase();
  const createData = {
    ...data,
    createdDate: Date.now()
  }

  set(ref(db, 'links/' + salt), createData);
  set(ref(db, 'users/' + data.name), {
    salt: createData.salt,
    createData: createData.createdDate
  });
  addUserCount();
}

export const sendNickName = (salt: string, data: INickName) => {
  const db = getDatabase();
  const createData = {
    ...data,
    createdDate: Date.now()
  }

  push(ref(db, 'links/' + salt + '/nickNames/'), createData);
  addNickNameCount();
}

export const getPersonBySalt = async (salt: string): Promise<IPersonData | null> => {
  const dbRef = ref(getDatabase());
  try {
    const snapshot = await get(child(dbRef, `links/${salt}`))
    if (snapshot.exists()) {
      const res = snapshot.val()

      const person: IPersonData = {
        ...res
      }
      if (res.nickNames) {
        person.nickNames = Object.values(res.nickNames)
      } else {
        person.nickNames = []
      }

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

export const getLinkCount = async (): Promise<IInfoCount | null> => {
  const dbRef = ref(getDatabase());
  try {
    const snapshot = await get(child(dbRef, `infos`))
    if (snapshot.exists()) {
      const res = snapshot.val()

      return res;
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error: any) {
    console.error(error);
    return null;
  };
}