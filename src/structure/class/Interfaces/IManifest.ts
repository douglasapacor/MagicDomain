export interface IManifest {
  version: string;
  paths: {
    home: string;
    artifacts: string;
    logs: string;
    maps: string;
    language: string;
    manifest: string;
  };
}

