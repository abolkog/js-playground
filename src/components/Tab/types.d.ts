interface Tab {
  id: string;
  title: string;
  iconName: string;
  component: ReactElement;
  iconColor?: string;
  iconWrap?: boolean;
}

interface TabProps {
  tab: Tab;
  extra?: object;
}
