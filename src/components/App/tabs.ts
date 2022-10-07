import CodeEditor from 'components/CodeEditor';
import Console from 'components/Console';

export const editorTab: Tab = {
  id: 'editor',
  title: 'JS Code',
  iconName: 'fab fa-js-square',
  iconColor: '#FFE933',
  component: CodeEditor,
};

export const consoleTab: Tab = {
  id: 'console',
  title: 'Console',
  iconName: 'fa fa-terminal',
  iconWrap: true,
  component: Console,
};
