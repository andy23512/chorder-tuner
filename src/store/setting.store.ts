import {
  withDevtools,
  withStorageSync,
} from '@angular-architects/ngrx-toolkit';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Setting } from '../model/setting.model';

const INITIAL_SETTING: Setting = {
  showWelcomeDialogWhenStart: true,
  autoConnectToDevice: false,
};

export const SettingStore = signalStore(
  { providedIn: 'root' },
  withDevtools('setting'),
  withStorageSync({
    key: 'setting',
    parse(stateString: string) {
      return { ...INITIAL_SETTING, ...JSON.parse(stateString) };
    },
  }),
  withState(INITIAL_SETTING),
  withMethods((store) => ({
    set<K extends keyof Setting>(key: K, value: Setting[K]) {
      patchState(store, (state) => ({
        ...state,
        [key]: value,
      }));
    },
  })),
);
