export type engineSettings = {
  lastFrameTime: number;
  accumulatedTime: number;
  framesCount: number;
  frameRating: number;
  rafId: NodeJS.Timeout | null;
  isRunning: boolean;
};
