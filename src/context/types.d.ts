type Theme = 'vs-dark' | 'vs-light';
type DisplayType = 'none' | 'block';

type AppState = {
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
  historyModalShown: boolean;
  sidebarOpen: boolean;
};

type Action = {
  type: string;
  payload?: unknown; // FIXME:
};

type Payload = {
  type: string;
  payload?: {
    codeSample?: string;
    codeSampleName?: string;
  };
};

type ActionBarChildItem = Pick<ActionBarItem, 'label' | 'payload'>;

type ActionBarItem = {
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  payload?: Payload;
  children?: ActionBarChildItem[];
};
