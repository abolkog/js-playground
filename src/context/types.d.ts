type DisplayType = 'none' | 'block'; // FIXME: remove ?

type AppState = {
  code: string;
  codeSample: string;
  codeSampleName: string;
  result: unknown[];
  error: string;
  loading: boolean;
  display: DisplayType;
  historyOpen: boolean;
  sidebarOpen: boolean;
};

type Payload = {
  codeSample?: string;
  codeSampleName?: string;
};

type Action = {
  type: string;
  payload?: Payload | string;
};

type ActionBarChildItem = Pick<ActionBarItem, 'label' | 'payload'>;

type ActionBarItem = {
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  payload?: Action;
  children?: ActionBarChildItem[];
};
