const makeStandingFrames = (rootFrame = 0) => {
  return {
    duration: 400,
    frames: [
      {
        time: 0,
        frame: rootFrame,
      },
    ],
  };
};

const makeWalkingFrames = (rootFrame = 0) => {
  return {
    duration: 900,
    frames: [
      {
        time: 0,
        frame: rootFrame,
      },
      {
        time: 100,
        frame: rootFrame + 1,
      },
      {
        time: 200,
        frame: rootFrame + 2,
      },
      {
        time: 300,
        frame: rootFrame + 3,
      },
      {
        time: 400,
        frame: rootFrame + 4,
      },
      {
        time: 500,
        frame: rootFrame + 5,
      },
      {
        time: 600,
        frame: rootFrame + 6,
      },
      {
        time: 700,
        frame: rootFrame + 7,
      },
      {
        time: 800,
        frame: rootFrame + 8,
      },
    ],
  };
};

export const STAND_UP = makeStandingFrames(0);
export const STAND_LEFT = makeStandingFrames(9);
export const STAND_DOWN = makeStandingFrames(18);
export const STAND_RIGHT = makeStandingFrames(27);

export const WALK_UP = makeWalkingFrames(0);
export const WALK_LEFT = makeWalkingFrames(9);
export const WALK_DOWN = makeWalkingFrames(18);
export const WALK_RIGHT = makeWalkingFrames(27);
