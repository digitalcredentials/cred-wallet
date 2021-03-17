export const ANIMATION_START_VALUE = 0;
export const ANIMATION_END_VALUE = 2;

const SHAKE_AMPLITUDE = 25;
export const INTERPOLATED_SHAKE_VALUE = {
  INPUT_RANGE_SHAKE: [0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2],
  OUTPUT_RANGE_SHAKE: [
    0,
    SHAKE_AMPLITUDE,
    (-4 / 5) * SHAKE_AMPLITUDE,
    (3 / 5) * SHAKE_AMPLITUDE,
    (-1 / 2) * SHAKE_AMPLITUDE,
    (2 / 5) * SHAKE_AMPLITUDE,
    (-1 / 3) * SHAKE_AMPLITUDE,
    (1 / 4) * SHAKE_AMPLITUDE,
    (-1 / 6) * SHAKE_AMPLITUDE,
    (1 / 12) * SHAKE_AMPLITUDE,
    0,
  ],
};

export const SHAKE_DURATION = 700;
