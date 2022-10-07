type Theme = 'vs-dark' | 'vs-light';
type DisplayType = 'none' | 'block';

interface AppState {
  code: string;
  codeSample: string;
  codeSampleName: string;
  result: unknown[];
  error: string;
  loading: boolean;
  theme: Theme;
  display: DisplayType;
  position: null;
  jsonView: string;
}

interface Action {
  type: string;
  payload?: unknown; // FIXME: String it ?
}
