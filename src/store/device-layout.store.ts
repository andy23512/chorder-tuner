import {
  withDevtools,
  withStorageSync,
} from '@angular-architects/ngrx-toolkit';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { DeviceLayoutState } from '../model/device-layout-state.model';

const INITIAL_DEVICE_LAYOUT_STATE: DeviceLayoutState = {
  deviceLayout: null,
};

export const deviceLayoutStore = signalStore(
  { providedIn: 'root' },
  withDevtools('deviceLayout'),
  withStorageSync({
    key: 'deviceLayout',
    parse(stateString: string) {
      return { ...INITIAL_DEVICE_LAYOUT_STATE, ...JSON.parse(stateString) };
    },
  }),
  withState(INITIAL_DEVICE_LAYOUT_STATE),
  withMethods((store) => ({
    set<K extends keyof DeviceLayoutState>(
      key: K,
      value: DeviceLayoutState[K],
    ) {
      patchState(store, (state) => ({
        ...state,
        [key]: value,
      }));
    },
  })),
);
