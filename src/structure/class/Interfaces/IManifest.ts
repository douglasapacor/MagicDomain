export interface IManifest {
  version: string;
  paths: {
    root: string;
    artifacts: string;
    logs: string;
    maps: string;
    language: string;
    manifest: string;
  };
}

