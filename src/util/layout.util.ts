import {
  ALT_GRAPH_ACTION_CODE,
  FN_SHIFT_ACTION_CODES,
  NUM_SHIFT_ACTION_CODES,
  SHIFT_ACTION_CODES,
} from '../data/actions.const';
import {
  DeviceLayout,
  KeyCombination,
  Layer,
} from '../model/device-layout.model';
import { WSKCode } from '../model/key-code.model';
import {
  CharacterActionCode,
  CharacterKeyCodeMap,
  KeyBoardLayout,
  KeyboardLayoutKey,
} from '../model/keyboard-layout.model';
import { nonNullable } from './non-nullable.util';

export function convertKeyboardLayoutToCharacterKeyCodeMap(
  keyboardLayout: KeyBoardLayout | null,
): CharacterKeyCodeMap {
  if (!keyboardLayout) {
    return new Map();
  }
  return new Map(
    (
      Object.entries(keyboardLayout.layout) as [
        WSKCode,
        Partial<KeyboardLayoutKey>,
      ][]
    ).flatMap(([keyCode, keyboardLayoutKey]) =>
      keyboardLayoutKey
        ? (
            Object.entries(keyboardLayoutKey) as [
              keyof KeyboardLayoutKey,
              string,
            ][]
          ).map(
            ([modifier, character]) =>
              [
                character,
                {
                  keyCode,
                  shiftKey:
                    modifier === 'withShift' ||
                    modifier === 'withShiftAltGraph',
                  altGraphKey:
                    modifier === 'withAltGraph' ||
                    modifier === 'withShiftAltGraph',
                },
              ] as const,
          )
        : [],
    ),
  );
}

export function getNumShiftKeyPositionCodes(
  deviceLayout: DeviceLayout,
): number[] {
  const [primaryLayer, secondaryLayer] = deviceLayout;
  return primaryLayer
    .map((ac, index) => (NUM_SHIFT_ACTION_CODES.includes(ac) ? index : -1))
    .filter(
      (pos) =>
        pos !== -1 && NUM_SHIFT_ACTION_CODES.includes(secondaryLayer[pos]),
    );
}

export function getFnShiftKeyPositionCodes(
  deviceLayout: DeviceLayout,
): number[] {
  const [primaryLayer, , tertiaryLayer] = deviceLayout;
  return primaryLayer
    .map((ac, index) => (FN_SHIFT_ACTION_CODES.includes(ac) ? index : -1))
    .filter(
      (pos) => pos !== -1 && FN_SHIFT_ACTION_CODES.includes(tertiaryLayer[pos]),
    );
}

export function getModifierKeyPositionCodeMap(deviceLayout: DeviceLayout) {
  return {
    shift: SHIFT_ACTION_CODES.map((actionCode) =>
      getKeyCombinationsFromActionCodes(
        [{ actionCode, shiftKey: false, altGraphKey: false }],
        deviceLayout,
      )?.map((k) => k.characterKeyPositionCode),
    )
      .filter(nonNullable)
      .flat(),
    numShift: getNumShiftKeyPositionCodes(deviceLayout),
    fnShift: getFnShiftKeyPositionCodes(deviceLayout),
    altGraph: [ALT_GRAPH_ACTION_CODE]
      .map((actionCode) =>
        getKeyCombinationsFromActionCodes(
          [{ actionCode, shiftKey: false, altGraphKey: false }],
          deviceLayout,
        )?.map((k) => k.characterKeyPositionCode),
      )
      .filter(nonNullable)
      .flat(),
  };
}

export function getKeyCombinationsFromActionCodes(
  characterActionCodes: CharacterActionCode[],
  deviceLayout: DeviceLayout | null,
): KeyCombination[] | null {
  if (!deviceLayout) {
    return null;
  }
  return characterActionCodes
    .flatMap(({ actionCode, shiftKey, altGraphKey }) =>
      deviceLayout.map((layer, layerIndex) => {
        const positionCodesList = layer
          .map((ac, index) => (ac === actionCode ? index : -1))
          .filter((pos) => pos !== -1)
          .map((pos) => {
            let layer = Layer.Primary;
            if (layerIndex === 1) {
              layer = Layer.Secondary;
            } else if (layerIndex === 2) {
              layer = Layer.Tertiary;
            }
            return {
              characterKeyPositionCode: pos,
              layer,
              shiftKey,
              altGraphKey,
            };
          });
        if (positionCodesList.length === 0) {
          return null;
        }
        return positionCodesList;
      }),
    )
    .flat()
    .filter(nonNullable);
}

export function getHoldKeys(
  layer: Layer,
  shiftKey: boolean,
  altGraphKey: boolean,
) {
  const holdKeys: ('num-shift' | 'fn' | 'shift' | 'alt-gr')[] = [];
  switch (layer) {
    case Layer.Secondary:
      holdKeys.push('num-shift');
      break;
    case Layer.Tertiary:
      holdKeys.push('fn');
  }
  if (shiftKey) {
    holdKeys.push('shift');
  }
  if (altGraphKey) {
    holdKeys.push('alt-gr');
  }
  return holdKeys;
}
