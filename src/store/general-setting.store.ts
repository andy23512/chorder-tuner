import {
  withDevtools,
  withStorageSync,
} from '@angular-architects/ngrx-toolkit';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { GeneralSetting } from '../model/general-setting.model';

const INITIAL_GENERAL_SETTING: GeneralSetting = {
  showWelcomeDialogWhenStart: true,
  autoConnectToDevice: false,
};

export const GeneralSettingStore = signalStore(
  { providedIn: 'root' },
  withDevtools('generalSetting'),
  withStorageSync({
    key: 'chorderTunerGeneralSetting',
    parse(stateString: string) {
      return { ...INITIAL_GENERAL_SETTING, ...JSON.parse(stateString) };
    },
  }),
  withState(INITIAL_GENERAL_SETTING),
  withMethods((store) => ({
    set<K extends keyof GeneralSetting>(key: K, value: GeneralSetting[K]) {
      patchState(store, (state) => ({
        ...state,
        [key]: value,
      }));
    },
  })),
);
