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

const makeWalkingDownFrames = (rootFrame = 0) => {
  return {
    duration: 700,
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
    ],
  };
};

const makeWalkingUpFrames = (rootFrame = 0) => {
  return {
    duration: 800,
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

const makeWalkingFrames = (rootFrame = 0) => {
  return {
    duration: 700,
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
    ],
  };
};

export const STAND_DOWN = makeStandingFrames(27);
export const STAND_RIGHT = makeStandingFrames(40);
export const STAND_UP = makeStandingFrames(109);
export const STAND_LEFT = makeStandingFrames(66);

export const WALK_DOWN = makeWalkingDownFrames(131);

export const WALK_UP = makeWalkingUpFrames(109);

export const WALK_LEFT = makeWalkingFrames(120);
export const WALK_RIGHT = makeWalkingFrames(141);
