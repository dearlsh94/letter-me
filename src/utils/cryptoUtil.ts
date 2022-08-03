import CryptoJS from "crypto-js";
import { SCRET_KEY } from '../constants'

export const generateSalt = () => {
  return CryptoJS.lib.WordArray.random(128 / 8).toString();
}

export const encryptData = (data: any) => {
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SCRET_KEY).toString();
  // encrypted
  return encrypted.replace(/\//gi, '_slash')
}

export const decryptData = (encrypted: string) => {
  const bytes = CryptoJS.AES.decrypt(encrypted.replace(/_slash/gi, '/'), SCRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}