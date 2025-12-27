import {
  withDevtools,
  withStorageSync,
} from '@angular-architects/ngrx-toolkit';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { VisibilitySetting } from '../model/visibility-setting.model';

const INITIAL_VISIBILITY_SETTING: VisibilitySetting = {
  layoutThumb3Switch: true,
};

export const VisibilitySettingStore = signalStore(
  { providedIn: 'root' },
  withDevtools('visibilitySetting'),
  withStorageSync({
    key: 'chorderTunerVisibilitySetting',
    parse(stateString: string) {
      return { ...INITIAL_VISIBILITY_SETTING, ...JSON.parse(stateString) };
    },
  }),
  withState(INITIAL_VISIBILITY_SETTING),
  withMethods((store) => ({
    set(key: keyof VisibilitySetting, value: boolean) {
      patchState(store, (state) => ({
        ...state,
        [key]: value,
      }));
    },
  })),
);
