import {create} from 'zustand';

interface GlobalState {
  fcmToken: string;
  setFcmToken: (_fcmToken: string) => void;
}

export const useGlobalStore = create<GlobalState>(set => ({
  fcmToken: '',
  setFcmToken: (fcmToken: string) => set({fcmToken}),
}));
