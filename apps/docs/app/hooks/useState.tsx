import { create } from "zustand";

type User = {
    id: string;
};

type State = {
    user?: User;
}

type Actions = {
    setUser(user: User): void;
}

export const useUserStore = create<State & Actions>((set) => ({
    user: undefined,
    setUser: (user: User) => set((state) => {
      return ({ ...state, user });
    }),
}));