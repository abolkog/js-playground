/* eslint-disable no-template-curly-in-string */
export const LIBRARIES: Library[] = [
  {
    name: 'redux',
    version: '4.2.0',
    url: 'https://redux.js.org/',
    use: 'Redux',
  },
  {
    name: 'lodash',
    version: '4.17.21',
    url: 'http://lodash.com',
    use: '_',
  },
  {
    name: 'axios',
    version: '0.21.4',
    url: 'https://github.com/axios/axios',
    use: 'axios',
  },
  {
    name: 'luxon',
    version: '1.28.0',
    url: 'https://moment.github.io/luxon/docs',
    use: 'luxon',
  },
  {
    name: 'date-fns',
    version: '2.29.3',
    url: 'https://date-fns.org/',
    use: 'dfn',
  },
];

export const CODE_SAMPLES: CodeSample[] = [
  {
    id: 1,
    name: 'Redux Sample',
    codeSample:
      "// Redux example\n\nconst reducer = (state = { count: 0 }, action) => {\n\tswitch(action.type) {\n\t\tcase 'INCREMENT': return { ...state, count: state.count + action.payload };\n\t\tdefault: return state;\n\t}\n}\n\nconst store = Redux.createStore(reducer);\n\nconst incrementByTwoAction = {type: 'INCREMENT', payload: 2 };\n\nconsole.log(`Before Dispatching: ${store.getState().count}`)\n\nstore.dispatch(incrementByTwoAction);\n\nconsole.log(`After Dispatching:  ${store.getState().count}`)\n",
  },
  {
    id: 2,
    name: 'Axios',
    codeSample:
      '// axios example. Reference axios in the code as `axios`\n\nconst loadTVShowCast = async () => {\n\tconst tvShowId = 431; // FRIENDS TV Show\n\tconst url = `https://api.tvmaze.com/shows/${tvShowId}/cast`;\n\tconst { data } = await axios.get(url);\n\tconsole.log(data);\n}\n\nloadTVShowCast();',
  },
  {
    id: 3,
    name: 'lodash',
    codeSample:
      "// Lodash example. Reference lodash in the code as `_`\n\nconst  sample = _.chunk(['a', 'b', 'c', 'd'], 2);\nsample",
  },
  {
    id: 4,
    name: 'luxon',
    codeSample:
      "// Luxon code example. Reference Luxon in the code as `luxon` \n\nconst luxonDate = luxon.DateTime.now().setZone('America/New_York').minus({weeks:1}).endOf('day').toISO();\nluxonDate",
  },
  {
    id: 5,
    name: 'date-fns',
    codeSample:
      '// date-fns code example. Reference date-fns in the code as `dfn` \n\nconst value = dfn.formatDistance(dfn.subDays(new Date(), 3), new Date(), { addSuffix: true });\nvalue;',
  },
];

export const EDITOR_THEMES: EditorTheme[] = [
  {
    id: 1,
    value: 'vs-dark',
    icon: 'moon',
  },
  {
    id: 2,
    value: 'vs-light',
    icon: 'sun',
  },
];
