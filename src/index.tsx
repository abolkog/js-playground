import 'styles/App.css';
import ReactDOM from 'react-dom';
import App from 'components/App';
import 'helpers/global';
import { AppProvider } from 'context/AppContext';
import reportWebVitals from 'reportWebVitals';

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,

  document.getElementById('root')
);

reportWebVitals();
