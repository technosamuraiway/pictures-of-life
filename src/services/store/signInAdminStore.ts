import { create } from 'zustand'

type LoginAdminState = {
  logged: boolean
  setLogged: (logged: boolean) => void
}

export const useSignInAdminStore = create<LoginAdminState>(set => ({
  logged: false,
  setLogged: (logged: boolean) =>
    set(() => {
      return { logged }
    }),
}))
