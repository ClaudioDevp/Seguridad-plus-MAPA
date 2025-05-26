import { signInWithEmailAndPassword, type Unsubscribe, type User } from "firebase/auth"
import { create } from "zustand"
import { auth } from "../firebase"
import { persist } from "zustand/middleware"


interface AuthStore {
  user: User | null,
  syncSession: (callback?: ()=>void) => Unsubscribe,
  login: (email:string, password:string) => Promise<UserCredential>
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
  }
}), {
  name: "auth-store",
  partialize: (s) => ({user: s.user})
}
)
)