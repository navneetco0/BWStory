// lib/storage.ts
import { MMKV } from 'react-native-mmkv';

const mmkv = new MMKV();

export const zustandMMKVStorage = {
  getItem: (key: string): string | null => {
    return mmkv.getString(key) || null;
  },
  setItem: (key: string, value: string): void => {
    mmkv.set(key, value);
  },
  removeItem: (key: string): void => {
    mmkv.delete(key);
  },
};
