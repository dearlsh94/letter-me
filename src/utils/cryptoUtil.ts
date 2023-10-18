import { AES } from 'crypto-es/lib/aes';
import { Utf8 } from 'crypto-es/lib/core';
import CryptoES from 'crypto-es';

export const generateSalt = () => {
	return CryptoES.lib.WordArray.create(new ArrayBuffer(8));
};

export const encryptData = (data: any) => {
	const encrypted = AES.encrypt(
		JSON.stringify(data),
		import.meta.env?.VITE_ENCRYPT_KEY
	).toString();
	return encrypted.replace(/\//gi, '_slash');
};

export const decryptData = (encrypted: string) => {
	const bytes = AES.decrypt(
		encrypted.replace(/_slash/gi, '/'),
		import.meta.env?.VITE_ENCRYPT_KEY
	);
	return JSON.parse(bytes.toString(Utf8));
};
