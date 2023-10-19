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

export const getCountSummary = async (): Promise<CountSummary> => {
	const db = getDatabase();
	const dbRef = ref(getDatabase());

	try {
		const snapshot = await get(child(dbRef, `summary`));
		if (snapshot.exists()) {
			const res = snapshot.val();
			return res;
		} else {
			const initInfo = {
				letterBoxCount: 0,
				letterCount: 0
			};
			await set(ref(db, 'summary/'), initInfo);
			return initInfo;
		}
	} catch (error: any) {
		console.error(error);
		return {
			letterBoxCount: 0,
			letterCount: 0
		};
	}
};

const addLetterBoxCount = async () => {
	const db = getDatabase();
	const countSummary = await getCountSummary();
	const data = {
		...countSummary,
		letterBoxCount: countSummary.letterBoxCount + 1
	};

	set(ref(db, 'summary/'), data);
};

const addLetterCount = async () => {
	const db = getDatabase();
	const countSummary = await getCountSummary();
	const data = {
		...countSummary,
		letterCount: countSummary.letterCount + 1
	};

	set(ref(db, 'summary/'), data);
};

export const createLetterBox = async (key: string, data: LetterBox) => {
	const db = getDatabase();
	const createData = {
		...data,
		createdDate: Date.now()
	};

	set(ref(db, 'letter-box/' + key), {
		...data,
		createdDate: Date.now()
	});

	set(ref(db, `users/${data.name}`), {
		key: createData.key,
		createdDate: createData.createdDate
	});

	await addLetterBoxCount();
};

export const sendLetter = async (key: string, data: Letter) => {
	if (!key || !data.content) {
		return false;
	}

	const db = getDatabase();
	push(ref(db, `letter-box/${key}/letters/`), {
		...data,
		createdDate: Date.now()
	});

	await addLetterCount();
};

export const getLetterBoxByKey = async (
	key: string
): Promise<LetterBox | null> => {
	const dbRef = ref(getDatabase());
	try {
		const snapshot = await get(child(dbRef, `letter-box/${key}`));
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
