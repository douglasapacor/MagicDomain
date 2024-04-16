export type gameCore = {
  viewOpacity: number;
  fadeState: "in" | "out";
  fadeStateNeedsChanged: boolean;
  sceneCanBeLoaded: boolean;
  sceneNeedsToBeChanged: boolean;
  sceneToBeLoaded: string | null;
  sceneNeedsLoadClass: boolean;
  sceneNeedsToBeCleaned: boolean;
};

