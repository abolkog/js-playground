import CodeEditor from '../CodeEditor';
import Output from '../Output';
import Console from '../Console';

export const editorTab = [
  {
    id: 'editor',
    title: 'JS Code',
    iconName: 'fab fa-js-square',
    iconColor: '#FFE933',
    component: CodeEditor
  }
];

export const outputTab = [
  {
    id: 'result',
    title: 'Result',
    iconName: 'fa fa-laptop-code',
    component: Output,
    iconColor: '#89C0F4'
  }
];

export const consoleTab = [
  {
    id: 'console',
    title: 'Console',
    iconName: 'fa fa-terminal',
    iconWrap: true,
    component: Console
  }
];
