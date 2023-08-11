import CryptoJS from "crypto-js";
import { SECRET_KEY } from "./url";

export const setItem = (name: string, val: any, secured: boolean) => {
    if (secured) {
        const encrypted = CryptoJS.AES.encrypt(val, SECRET_KEY).toString();
        localStorage.setItem(name, encrypted);
        return;
    }
    localStorage.setItem(name, JSON.stringify(val));
}

export const getItem = (name: string, secured: boolean) => {
    if (name && secured) {
        const encrypted = localStorage.getItem(name) || "";
        const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
    return JSON.parse(localStorage.getItem(name) || '""');
}

export const removeItem = (name: string) => {
    localStorage.removeItem(name);
}