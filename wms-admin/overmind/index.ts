import type { IContext } from 'overmind'
import { 
  createStateHook,
  createActionsHook,
  createEffectsHook,
  createReactionHook
} from 'overmind-react'
import { state } from './state'
import {actions} from './actions'
import {effects} from './effects'

export const onInitializeOvermind = async ({ state, effects }: any) => {
  const persisted = effects.storage.loadState();
  Object.assign(state, persisted);
};

export const config = {
  state,
  actions,
  effects,
  onInitializeOvermind
}

export type Context = IContext<typeof config>

export const useAppState = createStateHook<Context>()
export const useActions = createActionsHook<Context>()
export const useEffects = createEffectsHook<Context>()
export const useReaction = createReactionHook<Context>()