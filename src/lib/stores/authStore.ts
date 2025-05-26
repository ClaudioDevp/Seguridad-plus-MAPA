import {
  sendEmailVerification,
  signInWithEmailAndPassword,
  type Unsubscribe,
  type User,
  type UserCredential,
} from "firebase/auth";
import { create } from "zustand";
import { auth, functions } from "../services/firebase";
import { persist } from "zustand/middleware";
import { httpsCallable } from "firebase/functions";

interface AuthStore {
  user: User | null;
  syncSession: (callback?: () => void) => Unsubscribe;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  registerUser: (
    email: string,
    password: string,
    phone: string,
    muni_id: string
  ) => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      syncSession: (callback) => {
        return auth.onAuthStateChanged((user) => {
          set({ user });
          if (callback) callback();
        });
      },
      login: async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
      },
      logout: async () => await auth.signOut(),
      registerUser: async (email, password, phoneNumber, muniId) => {
        const createUser = httpsCallable(functions, "createUser");
        await createUser({
          email,
          password,
          phoneNumber,
          muniId,
        });
        const user = await get().login(email, password);
        await sendEmailVerification(user.user);
      },
    }),
    {
      name: "auth-store",
      partialize: (s) => ({ user: s.user }),
    }
  )
);
