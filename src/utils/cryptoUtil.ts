import CryptoJS from "crypto-js";

const SECRET_KEY = "letter-me-encrypt-key";

export const generateSalt = () => {
  return CryptoJS.lib.WordArray.random(128 / 8).toString();
};

export const encryptData = (data: any) => {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    SECRET_KEY
  ).toString();
  // encrypted
  return encrypted.replace(/\//gi, "_slash");
};

export const decryptData = (encrypted: string) => {
  const bytes = CryptoJS.AES.decrypt(
    encrypted.replace(/_slash/gi, "/"),
    SECRET_KEY
  );
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
