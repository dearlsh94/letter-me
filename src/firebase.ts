import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child, push } from 'firebase/database';
import type { CountSummary, LetterBox, Letter } from './types';

const FIREBASE_CONFIG = {
	apiKey: import.meta.env?.VITE_FB_API,
	authDomain: `${import.meta.env?.VITE_FB_ID}.firebaseapp.com`,
	projectId: `${import.meta.env?.VITE_FB_ID}`,
	storageBucket: `${import.meta.env?.VITE_FB_ID}.appspot.com`,
	messagingSenderId: `${import.meta.env?.VITE_FB_MESSAGE_SENDER_ID}`,
	appId: `${import.meta.env?.VITE_FB_APP_ID}`,
	measurementId: `${import.meta.env?.VITE_FB_MEASUREMENT_ID}`
};

// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIG);

export const getCount = async () => {
	const db = getDatabase();
	const dbRef = ref(getDatabase());

	try {
		const snapshot = await get(child(dbRef, `summary`));
		if (snapshot.exists()) {
			return snapshot.val();
		} else {
			const initInfo = {
				letterBoxCount: 0,
				letterCount: 0
			};

			await set(ref(db, 'summary/'), initInfo);
			return initInfo;
		}
	} catch (error) {}
};

export const addUserCount = async () => {
	const db = getDatabase();
	const countSummary = await getCount();
	const data = {
		...countSummary,
		letterBoxCount: countSummary.letterBoxCount + 1
	};

	set(ref(db, 'summary/'), data);
};

export const addNickNameCount = async () => {
	const db = getDatabase();
	const countSummary = await getCount();
	const data = {
		...countSummary,
		letterCount: countSummary.letterCount + 1
	};

	set(ref(db, 'summary/'), data);
};

export const addLink = async (salt: string, data: LetterBox) => {
	const db = getDatabase();
	const createData = {
		...data,
		createdDate: Date.now()
	};

	set(ref(db, 'links/' + salt), createData);
	set(ref(db, 'users/' + data.name), {
		salt: createData.salt,
		createdDate: createData.createdDate
	});
	await addUserCount();
};

export const sendLetter = (salt: string, data: Letter) => {
	const db = getDatabase();
	const createData = {
		...data,
		createdDate: Date.now()
	};

	push(ref(db, 'links/' + salt + '/letters/'), createData);
	addNickNameCount();
};

export const getPersonBySalt = async (
	salt: string
): Promise<LetterBox | null> => {
	const dbRef = ref(getDatabase());
	try {
		const snapshot = await get(child(dbRef, `links/${salt}`));
		if (snapshot.exists()) {
			const res = snapshot.val();

			const person: LetterBox = {
				...res
			};
			if (res.letters) {
				person.letters = Object.values(res.letters);
			} else {
				person.letters = [];
			}

			return person;
		} else {
			console.log('No data available');
			return null;
		}
	} catch (error: any) {
		console.error(error);
		return null;
	}
};

export const getLinkCount = async (): Promise<CountSummary> => {
	const dbRef = ref(getDatabase());
	try {
		const snapshot = await get(child(dbRef, `summary`));
		if (snapshot.exists()) {
			const res = snapshot.val();
			return res;
		} else {
			throw new Error('No data available');
		}
	} catch (error: any) {
		console.error(error);
		return {
			letterBoxCount: 0,
			letterCount: 0
		};
	}
};
