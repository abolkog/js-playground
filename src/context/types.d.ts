type DisplayType = 'none' | 'block'; // FIXME: remove ?

type AppState = {
  code: string;
  codeSample: string;
  codeSampleName: string;
  result: unknown[];
  error: string;
  loading: boolean;
  display: DisplayType;
  position: null;
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
