import type { IAction } from "overmind"
import { effects } from "./effects";

export const actions = {
  setUserState: ({ state }, username: string) => {
    state.user = { name: username, loggedIn: true }
    effects.storage.saveState(state);
  },
  setUserLogout: ({ state }) => {
    state.user = { name: '', loggedIn: false }
    effects.storage.saveState(state);
  }
} satisfies Record<string, IAction<any, any>>
