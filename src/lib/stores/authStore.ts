import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, type Unsubscribe, type User, type UserCredential } from "firebase/auth"
import { create } from "zustand"
import { auth } from "../services/firebase"
import { persist } from "zustand/middleware"


interface AuthStore {
  user: User | null,
  syncSession: (callback?: ()=>void) => Unsubscribe,
  login: (email:string, password:string) => Promise<UserCredential>,
  logout: () => Promise<void>,
  registerWithEmailAndPassword: (email: string, password: string) => Promise<UserCredential>
}

export const useAuthStore = create<AuthStore>()(
  persist((set) => ({
  user: null,
  syncSession: (callback) => {
    return auth.onAuthStateChanged(user => {
      set({user})
      if (callback) callback()
    })
  },
  login: async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
  },
  logout: async () => await auth.signOut(),
  registerWithEmailAndPassword: async (email, password) => {
    const user = await createUserWithEmailAndPassword(auth, email, password)
    await sendEmailVerification(user.user)
    return user
  }
}), {
  name: "auth-store",
  partialize: (s) => ({user: s.user})
}
)
)