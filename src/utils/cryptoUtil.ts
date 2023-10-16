const CryptoJS = require('crypto-js');

export const generateSalt = () => {
	return CryptoJS.lib.WordArray.random(128 / 8).toString();
};

export const encryptData = (data: any) => {
	const encrypted = CryptoJS.AES.encrypt(
		JSON.stringify(data),
		import.meta.env?.VITE_ENCRYPT_KEY
	).toString();
	return encrypted.replace(/\//gi, '_slash');
};

export const decryptData = (encrypted: string) => {
	const bytes = CryptoJS.AES.decrypt(
		encrypted.replace(/_slash/gi, '/'),
		import.meta.env?.VITE_ENCRYPT_KEY
	);
	return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
